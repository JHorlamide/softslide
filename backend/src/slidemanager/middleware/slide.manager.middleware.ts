import { NextFunction, Request, Response } from "express";
import { reqBodyValidator, reqParamValidator } from "../../common/middleware/request.validation.middleware";
import {
  getSlidesSchema,
  createSlidSchema,
  addCommentSchema,
  addChartSchema,
  createPresentationSchema,
  publishDocSchema
} from "../validation/validation.schema";

class SlideManagerMiddleware {
  public validateCreatePresentationReq = reqBodyValidator(createPresentationSchema);
  public validateCreateSlidReq = reqBodyValidator(createSlidSchema);
  public validateCreateCommentReq = reqBodyValidator(addCommentSchema);
  public validateAddChartReq = reqBodyValidator(addChartSchema)
  public validatePresentationIdExistInParam = reqParamValidator(getSlidesSchema);
  public validatePublishDocReq(req: Request, res: Response, next: NextFunction) {
    const { data } = req.body;
    req.body = {
      data: {
        slideId: data.slideId,
        textContent: JSON.parse(data.textContent),
        chartContent: JSON.parse(data.chartContent)
      }
    }

    reqBodyValidator(publishDocSchema);
    next();
  }
}

export default new SlideManagerMiddleware();
