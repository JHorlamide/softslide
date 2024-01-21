/* Core */
import crypto from "crypto";
import fs from "fs";
import path from "path";

/* Libraries */
import { google, slides_v1, sheets_v4, drive_v3 } from "googleapis";
import pptx from "pptxgenjs";

/* Application Modules */
import authService from "../../auth/service/auth.service";
import { CreateChartSlide, CreateComment } from "../types/types";
import { ChartContent, ChartOptions, ChartSeriesItem, PublishDoc, TextContent } from "../../config/types";
import {
  ClientError,
  NotFoundError,
  ServerError
} from "../../common/exceptions/api.error";

class SlideManagerService {
  private slideService: slides_v1.Slides;

  private sheetService: sheets_v4.Sheets;

  private driveService: drive_v3.Drive;

  private PUBLISH_FILE_PATH: string;

  constructor() {
    const auth = authService.getAuth();
    this.sheetService = google.sheets({ version: "v4", auth });
    this.slideService = google.slides({ version: "v1", auth });
    this.driveService = google.drive({ version: "v3", auth });
    this.PUBLISH_FILE_PATH = path.join(process.cwd(), "/src/output.pptx");
  }

  public async listSlides(presentationId: string) {
    try {
      const response = await this.slideService.presentations.get({ presentationId });
      const slides = response.data.slides;

      if (!slides || slides.length === 0) {
        throw new NotFoundError("No slides found");
      }

      return slides[0].pageElements;
    } catch (error: any) {
      console.log({ error })
      throw new ServerError(error.message);
    }
  }

  public async createSlidePresentation(title: string): Promise<Object> {
    const presentation = await this.slideService.presentations.create({
      requestBody: { title }
    });

    const presentationId = presentation.data.presentationId as string;
    const slideId = await this.createSlide(presentationId);
    return { presentationId, slideId };
  }

  public async createSlide(presentationId: string): Promise<string | null | undefined> {
    const pageId = this.generateUniqueID();
    const requests = [
      {
        createSlide: {
          objectId: pageId,
          slideLayoutReference: {
            predefinedLayout: 'TITLE_AND_TWO_COLUMNS',
          },
        }
      }
    ];

    try {
      const response = await this.slideService.presentations.batchUpdate({
        presentationId,
        requestBody: { requests }
      });

      const replies = response.data.replies;
      if (replies?.length === 0) {
        throw new ClientError("Requested entity was not found.");
      }

      return replies && replies[0].createSlide?.objectId;
    } catch (error: any) {
      if (error.message === "Requested entity was not found.") {
        throw new ClientError(error.message);
      }
      throw new ServerError(error.message);
    }
  }

  public async addCommentToSlide({ comment, presentationId, slideId }: CreateComment) {
    const elementId = this.generateUniqueID();

    const requests = [
      {
        createShape: {
          objectId: elementId,
          shapeType: 'TEXT_BOX',
          elementProperties: {
            pageObjectId: slideId,
            size: {
              width: { magnitude: 700, unit: "PT" },
              height: { magnitude: 40, unit: "PT" },
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 0,
              translateY: 360,
              unit: 'PT',
            },
          },
        },
      },

      /* Insert text into the box, using the supplied element ID. */
      {
        insertText: {
          objectId: elementId,
          insertionIndex: 0,
          text: comment,
        },
      },
    ];

    try {
      const createTextboxWithTextResponse = await this.slideService.presentations.batchUpdate({
        presentationId,
        requestBody: { requests }
      });

      const createCommentRes = createTextboxWithTextResponse.data.replies

      if (createCommentRes?.length === 0) {
        throw new ClientError("Requested entity was not found.");
      }

      return createCommentRes && createCommentRes[0].createShape
    } catch (error: any) {
      if (error.message === "Requested entity was not found.") {
        throw new ClientError(error.message);
      };

      throw new ServerError(error.message);
    }
  }

  public async addChartToSlide({ presentationId, slideId, spreadsheetId }: CreateChartSlide) {
    const presentationChartId = this.generateUniqueID();

    try {
      const chartId = await this.getChartId(spreadsheetId);

      const emu4M = {
        magnitude: 4000000,
        unit: 'EMU',
      };

      const requests = [
        {
          createSheetsChart: {
            objectId: presentationChartId,
            spreadsheetId: spreadsheetId,
            chartId: chartId,
            linkingMode: 'LINKED',
            elementProperties: {
              pageObjectId: slideId,
              size: {
                height: emu4M,
                width: emu4M,
              },
              transform: {
                scaleX: 2,
                scaleY: 1.5,
                translateX: 0,
                translateY: 5,
                unit: 'PT',
              },
            },
          },
        },
      ];

      const response = await this.slideService.presentations.batchUpdate({
        presentationId,
        requestBody: { requests }
      });

      return response.data;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  public async publishDocToDrive(data: PublishDoc) {
    const { textContent, chartContent, slideId } = data;
    const presentation = new pptx();
    
    try {
      if (textContent && textContent.length > 0) {
        this.addTextToPresentationSlide(presentation, textContent);
      }

      if (chartContent && chartContent.length > 0) {
        this.addChartToPresentationSlide(presentation, chartContent);
      }

      const res = await presentation.writeFile({ fileName: this.PUBLISH_FILE_PATH });
      const fileId = await this.uploadFileFromDrive(slideId);
      return { fileId, res };
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  private addTextToPresentationSlide(presentation: pptx, textContent: TextContent) {
    textContent.map((content, index) => {
      const slide = presentation.addSlide();
      slide.addText(content.text, {
        x: parseInt(`0.${index}`),
        y: parseInt(`0.${index}`),
        w: "100%",
        h: "100%",
        fontSize: 36,
        align: "left",
        fill: { color: 'D3E3F3' },
        color: 'FFFFFF',
        isTextBox: true,
        valign: "top"
      });
    });
  }

  private addChartToPresentationSlide(presentation: pptx, chartContent: ChartContent) {
    chartContent.map((content) => {
      const slide = presentation.addSlide();
      const chartOptions = this.extractChartSeries(content.chartOptions);
      slide.addChart(presentation.ChartType.bar, chartOptions, {
        x: 0.5,
        y: 0.5,
        w: "90%",
        h: "90%",
      });
    });
  }

  private extractChartSeries(chartOptions: ChartOptions): ChartSeriesItem[] {
    return chartOptions.series.reduce((result, option) => {
      const existingEntry = result.find((entry) => entry.name === option.name);

      if (existingEntry) {
        existingEntry.labels.push(option.stack);
        existingEntry.values.push(...option.data);
      } else {
        result.push({
          name: option.name,
          labels: [option.stack],
          values: [...option.data],
        });
      }

      return result;
    }, [] as ChartSeriesItem[]);
  }

  private async uploadFileFromDrive(slideId: string) {
    const fileMetadata = {
      name: this.PUBLISH_FILE_PATH,
      MimeTypeArray: ["fileMetadata"]
    };

    const media = {
      fileId: slideId,
      mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      body: fs.createReadStream(this.PUBLISH_FILE_PATH),
    };

    try {
      const file = await this.driveService.files.create({
        requestBody: fileMetadata,
        media: media,
      });

      return file.data.id;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  private async getChartId(spreadsheetId: string) {
    try {
      const sheetRanges = await this.getSpreadSheetRange(spreadsheetId, 1);
      const sheet = await this.sheetService.spreadsheets.get({
        spreadsheetId,
        ranges: [sheetRanges]
      });

      if (!sheet.data?.sheets?.length) {
        throw new ClientError("No sheet found");
      }

      const charts = sheet.data.sheets[0]?.charts;
      if (!charts || !charts[0]?.chartId) {
        throw new ClientError("No chart found");
      }

      return charts[0].chartId;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  private async getSpreadSheetRange(spreadsheetId: string, range: number) {
    try {
      const sheet = await this.sheetService.spreadsheets.get({
        spreadsheetId
      });

      if (!sheet.data?.sheets?.length) {
        throw new ClientError("No sheet found");
      }

      return sheet.data?.sheets[range].properties?.title as string;
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  private generateUniqueID() {
    const length = 10;
    const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
    return randomBytes.toString('hex').slice(0, length);
  }
}

export default new SlideManagerService();
