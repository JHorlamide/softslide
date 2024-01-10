import Joi from "joi"

export const createPresentationSchema = Joi.object({
  title: Joi.string().min(3).max(255).required()
});

export const createSlidSchema = Joi.object({
  presentationId: Joi.string().min(3).max(255).required()
});

export const getSlidesSchema = Joi.object({
  presentationId: Joi.string().required()
});

export const addCommentSchema = Joi.object({
  presentationId: Joi.string().max(100).required(),
  slideId: Joi.string(),
  comment: Joi.string().max(255).required()
})

