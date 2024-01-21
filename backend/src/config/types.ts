interface TextContentItem {
  height: number;
  text: string;
  width: number;
  x: number;
  y: number;
};

interface ChartSeries {
  name: string;
  data: number[];
  stack: string;
};

interface PowerPointChartSeries {
  name: string;
  labels: string[];
  values: number[];
}

export interface ChartOptions {
  accessibility: {
    enabled: boolean;
  };

  chart: {
    type: string;
  };

  plotOptions: {
    column: {
      stacking: string;
    };
  };

  title: {
    text: string;
    align: string;
  };

  tooltip: {
    format: string;
  };

  xAxis: {
    categories: string[];
  };

  yAxis: {
    allowDecimals: boolean;
    min: number;
    title: {
      text: string;
    };
  };

  series: ChartSeries[];
  chartSeries: PowerPointChartSeries[]
};

export interface ChartContentItem {
  x: number;
  y: number;
  height: number;
  width: number;
  chartOptions: ChartOptions;
};

export type TextContent = TextContentItem[];

export type ChartContent = ChartContentItem[];

export interface PublishDoc {
  slideId: string;
  textContent: TextContent;
  chartContent: ChartContent;
}

/* Output Types */
export interface ChartSeriesItem {
  name: string;
  labels: string[];
  values: number[];
}