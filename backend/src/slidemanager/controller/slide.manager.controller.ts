/* Libraries */
import { Request, Response } from "express";

/* Application Modules */
import asyncHandler from "../../common/middleware/asynchandler.middleware";
import slideManagerService from "../services/slide.managerService";
import responseHandler from "../../common/response.handler";

class SlideManagerController {
  public getAllSlides = asyncHandler(async (req: Request, res: Response) => {
    const { presentationId } = req.params;
    const slides = await slideManagerService.listSlides(presentationId);
    responseHandler.successResponse("Slides fetches successfully", { slides }, res);
  });

  public createSlidePresentation = asyncHandler(async (req: Request, res: Response) => {
    const { title } = req.body;
    const response = await slideManagerService.createSlidePresentation(title);
    responseHandler.resourceCreated("Slide created successfully", { ...response, title }, res);
  });

  public createSlide = asyncHandler(async (req: Request, res: Response) => {
    const { presentationId } = req.body;
    const slideId = await slideManagerService.createSlide(presentationId);
    responseHandler.resourceCreated("Slide created successfully", { slideId }, res);
  });

  public addCommentToSlide = asyncHandler(async (req: Request, res: Response) => {
    const { presentationId, slideId, comment } = req.body;
    const response = await slideManagerService.addCommentToSlide({
      comment,
      slideId,
      presentationId,
    });

    responseHandler.resourceCreated("Commented added successfully", response, res);
  });

  public addMetricToSlide = asyncHandler(async (req: Request, res: Response) => {
    const { presentationId, slideId, spreadsheetId } = req.body;
    const response = await slideManagerService.addChartToSlide({
      slideId,
      presentationId,
      spreadsheetId
    });

    responseHandler.resourceCreated("Chart added successfully", { ...response }, res);
  });

  public publishDocToDrive = asyncHandler(async (req: Request, res: Response) => {
    const { data } = req.body;
    const response = await slideManagerService.publishDocToDrive(data);
    responseHandler.resourceCreated("Document published successfully", { response }, res);
  });
}

export default new SlideManagerController();
