/* Libraries */
import { Flex, VStack } from "@chakra-ui/react";
import toast from "react-hot-toast";

/* Application Modules */
import GoogleSlide from "../components/GoogleSlides/GoogleSlides";
import { useEffect, useState } from "react";
import { slideService } from "../services/restService";


const Slides = () => {
  const [slides, setSlides] = useState<any[]>([]);
  const presentationId = localStorage.getItem("presentationId") as string;
  const slideTitle = localStorage.getItem("slideTitle") as string;

  const fetchSlides = async () => {
    try {
      const response = await slideService.getAllSlides(presentationId);
      const data = response.data;
      setSlides(data.data.slides);
    } catch (error: any) {
      console.log(error)
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchSlides();
  }, [presentationId]);

  return (
    <Flex gap={2} width="full" height="92vh" bg="blue.50">
      <Flex gap={1} width="80%" height="full" px={2} py={2}>
        <Flex
          px={2}
          py={2}
          gap={4}
          flexDirection="column"
          overflowY="auto"
          height="full"
          width="20%"
        >
          <GoogleSlide
            key={1}
            width="230"
            height="130"
            borderRadius="5px"
          />
        </Flex>

        <Flex
          p={2}
          gap={4}
          flexDirection="column"
          overflowY="auto"
          width="full"
        >
          <GoogleSlide
            key={1}
            height="500"
            width="full"
            borderRadius="10px"
            slideTitle={slideTitle}
          />
        </Flex>
      </Flex>

      <VStack
        py={2}
        bg="white"
        overflowY="auto"
        height="full"
        width="20%"
        boxShadow="md"
      >
      </VStack>
    </Flex>
  )
}

export default Slides