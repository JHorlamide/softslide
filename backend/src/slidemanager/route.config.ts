/* Libraries */
import { Application } from "express";

/* Application Modules */
import config from "../config/app.config";
import slideController from "./controller/slide.manager.controller";
import slideMiddleware from "./middleware/slide.manager.middleware";
import { CommonRoutesConfig } from "../common/common.route.config";

const APP_PREFIX_PATH = config.prefix;

export class SlideManagerRoute extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "SlideManagerRoute");
  }

  configureRoutes(): Application {
    /***
    * @route  GET: /api/slides/:presentationId
    * @description   Get all slides.
    * @param {string} presentationId
    * @access Private.
    * ***/
    this.app.get(`${APP_PREFIX_PATH}/slides/:presentationId`, [
      slideMiddleware.validatePresentationIdExistInParam,
      slideController.getAllSlides
    ])

    /***
    * @route  POST: /api/slides/presentation
    * @description   Create new slide presentation.
    * @body {title: string} The title presentation.
    * @access Private.
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/slides/presentation`, [
      slideMiddleware.validateCreatePresentationReq,
      slideController.createSlidePresentation
    ]);

    /***
    * @route  POST: /api/slides
    * @description   Create new slide.
    * @body {presentationId: string} The presentationId of the slide to be created.
    * @access Private.
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/slides`, [
      slideMiddleware.validateCreateSlidReq,
      slideController.createSlide
    ]);

    /***
    * @route  POST: /api/slides/comment
    * @description   Add comments to a slid.
    * @body {
    *   comments: string, (The comment to be added to the slid.)
    *   presentationId: string, (The presentationId of slide.) 
    *   slidId: string, (The id of the slid to add the comment to.)
    * } 
    * @access Private.
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/slides/comment`, [
      slideMiddleware.validateCreateCommentReq,
      slideController.addCommentToSlide
    ]);

    this.app.post(`${APP_PREFIX_PATH}/slides/chart`, [
      slideMiddleware.validateAddChartReq,
      slideController.addMetricToSlide
    ]);

    return this.app;
  }
}