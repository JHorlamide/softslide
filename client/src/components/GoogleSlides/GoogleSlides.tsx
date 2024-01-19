import React, { Fragment } from 'react';

/* Libraries */
import { Box, Text, } from '@chakra-ui/react'

/* Application Modules */
import { useTextContent } from '../../hooks/useTextContent';
import AddNewComponent from './AddNewComponent';
import TextComponent from './TextComponent';

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
    handleAddMetric,
    handleCompDataStorage,
    handleInputChange,
    handleDragChange,
    handleResizeChange,
  } = useTextContent();

  return (
    <Fragment>
      <AddNewComponent
        handleAddImage={handleAddImage}
        handleAddMetric={handleAddMetric}
        handleAddText={handleAddText}
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
        </Box>
      </Box>
    </Fragment>
  )
}

export default GoogleSlide;
