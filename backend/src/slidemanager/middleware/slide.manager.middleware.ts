import { reqBodyValidator, reqParamValidator } from "../../common/middleware/request.validation.middleware";
import {
  getSlidesSchema,
  createSlidSchema,
  addCommentSchema,
  createPresentationSchema
} from "../validation/validation.schema";

class SlideManagerMiddleware {
  public validateCreatePresentationReq = reqBodyValidator(createPresentationSchema);
  public validateCreateSlidReq = reqBodyValidator(createSlidSchema);
  public validateCreateCommentReq = reqBodyValidator(addCommentSchema)
  public validatePresentationIdExistInParam = reqParamValidator(getSlidesSchema);
}

export default new SlideManagerMiddleware();
