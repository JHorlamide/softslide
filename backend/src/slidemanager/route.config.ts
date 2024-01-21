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
    * @access Private.
    * @param {string} presentationId
    * ***/
    this.app.get(`${APP_PREFIX_PATH}/slides/:presentationId`, [
      slideMiddleware.validatePresentationIdExistInParam,
      slideController.getAllSlides
    ])

    /***
    * @route  POST: /api/slides/presentation
    * @description   Create new slide presentation.
    * @access Private.
    * @body {title: string} The title presentation.
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/slides/presentation`, [
      slideMiddleware.validateCreatePresentationReq,
      slideController.createSlidePresentation
    ]);

    /***
    * @route  POST: /api/slides
    * @description   Create new slide.
    * @access Private.
    * @body {presentationId: string} The presentationId of the slide to be created.
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/slides`, [
      slideMiddleware.validateCreateSlidReq,
      slideController.createSlide
    ]);

    /***
    * @route  POST: /api/slides/comment
    * @description   Add comments to a slid.
    * @access Private.
    * @body {
    *   comments: string, (The comment to be added to the slid.)
    *   presentationId: string, (The presentationId of slide.) 
    *   slidId: string, (The id of the slid to add the comment to.)
    * } 
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/slides/comment`, [
      slideMiddleware.validateCreateCommentReq,
      slideController.addCommentToSlide
    ]);

    /***
    * @route  POST: /api/slides/chart
    * @description Add chart to a slid.
    * @access Private.
    * @body {
    *   presentationId: string, (The presentationId of the slid.)
    *   slideId: string, (The slidId of slide.) 
    *   spreadsheetId: string, (The spreadsheet ID to get the chart from.)
    * } 
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/slides/chart`, [
      slideMiddleware.validateAddChartReq,
      slideController.addMetricToSlide
    ]);

    /***
    * @route  POST: /api/slides/publish
    * @description Publish doc to google drive.
    * @access Private.
    * @body {
    *   textContent: [object], (The textContent of the published slide.)
    *   chartContent: [object], (The chartContent of the published slide.) 
    * } 
    * ***/
    this.app.post(`${APP_PREFIX_PATH}/slides/publish`, [
      slideMiddleware.validatePublishDocReq,
      slideController.publishDocToDrive
    ]);

    return this.app;
  }
}