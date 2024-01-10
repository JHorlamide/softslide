import React from 'react';
import { Box, Text } from '@chakra-ui/react'

type GoogleSlideProps = React.HTMLProps<HTMLIFrameElement> & {
  width: string;
  height: string;
  borderRadius: string;
  slideTitle?: string;
  presentationId: string;
  position: number;
  ErrorComponent?: React.ReactNode | React.ElementType;
}

const GoogleSlide = ({
  width,
  height,
  borderRadius,
  slideTitle,
  presentationId,
  position,
  ErrorComponent
}: GoogleSlideProps) => {

  /**
   * Generates iframe compatible url to display the presentation
   * @param presentationId The Google Slides presentation key
   * @param position number to show the current slide
   */
  const constructUrl = (presentationId: string | null, position: number): string => {
    let baseUrl = 'https://docs.google.com/presentation/d/';
    baseUrl += `${presentationId}/embed?`;

    if (position) {
      baseUrl += `&slide=${position}&rm=minimal`;
    }

    return baseUrl;
  };

  const embedURL = constructUrl(presentationId, position);

  if (!presentationId && ErrorComponent) {
    return <>{ErrorComponent}</>;
  }

  return (
    <Box
      pt={3}
      color="white"
      {...slideTitle ? { bg: "blue.500", borderRadius: borderRadius } : ""}
    >
      <Box
        mx={2}
        mt={-1}
        mb={1}
        px={6}
        border="1px"
        borderColor="white"
        borderRadius={8}
        width="fit-content"
      >
        <Text textAlign="start" fontWeight="medium">{slideTitle}</Text>
      </Box>

      <iframe
        title="Google Slides"
        src={embedURL}
        width={width}
        height={height}
        allowFullScreen
      ></iframe>
    </Box>
  )
}

export default GoogleSlide