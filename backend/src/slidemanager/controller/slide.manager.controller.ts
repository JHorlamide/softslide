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
    const presentationId = await slideManagerService.createSlidPresentation(title);
    responseHandler.resourceCreated("Slide created successfully", { presentationId }, res);
  });

  public createSlide = asyncHandler(async (req: Request, res: Response) => {
    const { presentationId } = req.body;
    const slideId = await slideManagerService.createSlid(presentationId);
    responseHandler.resourceCreated("Slide created successfully", { slideId }, res);
  });

  public addCommentToSlide = asyncHandler(async (req: Request, res: Response) => {
    const { presentationId, slideId, comment } = req.body;
    const response = await slideManagerService.addCommentToSlide({ comment, presentationId, slideId });
    responseHandler.resourceCreated("Commented added successfully", response, res);
  })
}

export default new SlideManagerController();
