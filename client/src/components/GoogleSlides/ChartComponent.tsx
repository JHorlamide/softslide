import { useEffect, useState } from "react";

/* Library */
import { DraggableData, Rnd } from "react-rnd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { chartOptions } from "./chartOption";
import { Box } from "@chakra-ui/react";

interface ChartComponentProps {
  rndPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
  },
  handleChartDataStorage: () => void;
  onDragChange: (value: { x: number, y: number }) => void;
  onResizeChange: (value: { width: number, height: number }) => void;
  handleChartOptionChange: (chartOptions: any) => void;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  rndPosition,
  onDragChange,
  onResizeChange,
  handleChartDataStorage,
  handleChartOptionChange
}) => {
  const [layout, setLayout] = useState({
    width: 0,
    height: 0
  });

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleDragStop = (d: DraggableData) => {
    const cords = { x: d.x, y: d.y }
    setPosition(cords);
    onDragChange(cords);
    handleChartDataStorage();
  }

  const handleResizeChange = (ref: HTMLElement) => {
    const layout = {
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
    }

    setLayout(layout);
    onResizeChange(layout);
    handleChartDataStorage();
  }

  useEffect(() => {
    handleChartOptionChange(chartOptions);
  }, []);

  return (
    <Rnd
      default={{ ...rndPosition }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => handleDragStop(d)}
      onResizeStop={(e, direction, ref, delta, position) => handleResizeChange(ref)}
    >
      <Box
        bg="gray.100"
        px={2}
        py={2}
        border={3}
        borderRadius={10}
      >
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      </Box>
    </Rnd>
  )
}

export default ChartComponent;
