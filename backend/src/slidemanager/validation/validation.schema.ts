import Joi from "joi"

export const createPresentationSchema = Joi.object({
  title: Joi.string().min(3).max(100).required()
});

export const createSlidSchema = Joi.object({
  presentationId: Joi.string().min(3).required()
});

export const getSlidesSchema = Joi.object({
  presentationId: Joi.string().required()
});

export const addCommentSchema = Joi.object({
  presentationId: Joi.string().required(),
  slideId: Joi.string().required(),
  comment: Joi.string().max(255).required()
});

export const addChartSchema = Joi.object({
  presentationId: Joi.string().max(100).required(),
  slideId: Joi.string().required(),
  spreadsheetId: Joi.string().required()
});

export const publishDocSchema = Joi.object({
  data: Joi.object({
    slideId: Joi.string().required(),
    textContent: Joi.array().items(
      Joi.object({
        x: Joi.number().required(),
        y: Joi.number().required(),
        width: Joi.number().required(),
        height: Joi.number().required(),
        text: Joi.string().required(),
      })
    ),

    chartContent: Joi.array().items(
      Joi.object({
        x: Joi.number().required(),
        y: Joi.number().required(),
        width: Joi.number().required(),
        height: Joi.number().required(),
        chartOptions: Joi.object().required(),
      })
    ),
  }).required(),
});


