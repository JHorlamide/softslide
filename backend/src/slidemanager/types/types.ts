export interface CreateComment {
  comment: string;
  slideId: string;
  presentationId: string;
}

export interface CreateChartSlide {
  presentationId: string;
  spreadsheetId: string;
  slideId: string;
}