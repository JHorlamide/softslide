import { useState } from 'react'

interface ChartComponent {
  x: number;
  y: number;
  width: number;
  height: number;
  chartOptions: Object;
}

export const useChartContent = () => {
  const [chartComponents, setChartComponents] = useState<ChartComponent[]>([]);

  const handleAddChart = () => {
    const defaultPosition = {
      x: 0,
      y: 0,
      width: 600,
      height: 100,
      chartOptions: {}
    }

    setChartComponents(prevState => ([...prevState, {
      ...defaultPosition,
      x: defaultPosition.x + 10,
      y: defaultPosition.y + 10
    }]));
  }

  const handleChartOptionChange = (index: number, chartOptions: Object) => {
    const updatedComponent = [...chartComponents];
    updatedComponent[index].chartOptions = chartOptions;
    setChartComponents(updatedComponent);
  }

  const handleChartDragChange = (index: number, cords: { x: number, y: number }) => {
    const updateComponent = [...chartComponents];
    updateComponent[index].x = cords.x;
    updateComponent[index].y = cords.y;
    setChartComponents(updateComponent);
  }

  const handleChartResizeChange = (index: number, cords: { width: number, height: number }) => {
    const updateComponent = [...chartComponents];
    updateComponent[index].width = cords.width;
    updateComponent[index].y = cords.height;
    setChartComponents(updateComponent);
  }

  const handleChartDataStorage = () => {
    localStorage.setItem("chartContent", JSON.stringify(chartComponents));
  }

  return {
    chartComponents,
    handleAddChart,
    handleChartDragChange,
    handleChartResizeChange,
    handleChartDataStorage,
    handleChartOptionChange
  }
}

