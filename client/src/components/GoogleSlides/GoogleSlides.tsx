import React, { Fragment } from 'react';

/* Libraries */
import { Box, Text, } from '@chakra-ui/react'

/* Application Modules */
import { useTextContent } from '../../hooks/useTextContent';
import AddNewComponent from './AddNewComponent';
import TextComponent from './TextComponent';
import ChartComponent from './ChartComponent';
import { useChartContent } from '../../hooks/useChartContent';

type GoogleSlideProps = React.HTMLProps<HTMLIFrameElement> & {
  width: string;
  height: string;
  slideTitle?: string;
  borderRadius: string;
  ErrorComponent?: React.ReactNode | React.ElementType;
}

interface TextComponent {
  onInputChange: (value: string) => void
  rndPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
  }
}

const GoogleSlide: React.FC<GoogleSlideProps> = ({
  width,
  height,
  borderRadius,
  slideTitle,
}) => {
  const {
    textComponents,
    handleAddText,
    handleAddImage,
    handleCompDataStorage,
    handleInputChange,
    handleDragChange,
    handleResizeChange,
  } = useTextContent();

  const {
    chartComponents,
    handleAddChart,
    handleChartOptionChange,
    handleChartDragChange,
    handleChartResizeChange,
    handleChartDataStorage
  } = useChartContent();

  return (
    <Fragment>
      <AddNewComponent
        handleAddImage={handleAddImage}
        handleAddText={handleAddText}
        handleAddChart={handleAddChart}
      />

      <Box
        pt={3}
        color="white"
        width="full"
        {...slideTitle ? { bg: "blue.500", borderRadius: borderRadius } : ""}
      >
        {slideTitle ? (
          <Text
            mx={2}
            mt={-1}
            mb={1}
            px={6}
            border="1px"
            borderColor="white"
            borderRadius={8}
            textAlign="start"
            fontWeight="medium"
          >
            {slideTitle}
          </Text>
        ) : null}

        <Box bg="white" width={width} height={height}>
          {textComponents.map((comp, index) => (
            <TextComponent
              key={index}
              rndPosition={comp}
              onInputChange={(value) => handleInputChange(index, value)}
              onDragChange={(value) => handleDragChange(index, value)}
              onResizeChange={(value) => handleResizeChange(index, value)}
              onFocusChange={handleCompDataStorage}
            />
          ))}

          {chartComponents.map((chart, index) => (
            <ChartComponent
              key={index}
              rndPosition={chart}
              onDragChange={(value) => handleChartDragChange(index, value)}
              onResizeChange={(value) => handleChartResizeChange(index, value)}
              handleChartDataStorage={handleChartDataStorage}
              handleChartOptionChange={(chartOptions) => handleChartOptionChange(index, chartOptions)}
            />
          ))}
        </Box>
      </Box>
    </Fragment>
  )
}

export default GoogleSlide;
