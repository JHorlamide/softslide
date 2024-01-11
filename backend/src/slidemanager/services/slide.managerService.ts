/* Core */
import crypto from "crypto";

/* Libraries */
import { google, slides_v1, sheets_v4 } from "googleapis";

/* Application Modules */
import authService from "../../auth/service/auth.service";
import { ClientError, NotFoundError, ServerError } from "../../common/exceptions/api.error";

interface CreateComment {
  comment: string;
  slideId: string;
  presentationId: string;
}

interface CreateChartSlide {
  presentationId: string;
  spreadsheetId: string;
  slideId: string;
}

class SlideManagerService {
  private slideService: slides_v1.Slides;

  private sheetService: sheets_v4.Sheets;

  constructor() {
    const auth = authService.getAuth();
    this.sheetService = google.sheets({ version: "v4", auth });
    this.slideService = google.slides({ version: "v1", auth });
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

  public async createSlidPresentation(title: string): Promise<string> {
    const presentation = await this.slideService.presentations.create({
      requestBody: { title }
    });

    return presentation.data.presentationId as string;
  }

  public async createSlid(presentationId: string): Promise<string | null | undefined> {
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
                translateX: 100000,
                translateY: 100000,
                unit: 'EMU',
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

  private async getChartId(sheetId: string) {
    try {
      const sheet = await this.sheetService.spreadsheets.get({
        spreadsheetId: sheetId,
        ranges: ["Traffic Dashboard"]
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

  private generateUniqueID() {
    const length = 10;
    const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
    return randomBytes.toString('hex').slice(0, length);
  }
}

export default new SlideManagerService();
