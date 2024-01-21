/* Libraries */
import { Box } from "@chakra-ui/react";

/* Application Modules */
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import Slides from "../Slides";
import CreateSlide from "./components/CreateSlide";
import { useSlide } from "../../hooks/useSlide";

const Home = () => {
  const {
    accessToken,
    presentationId,
    loading,
    handleOpenPicker,
    createGooglePresentationSlide
  } = useSlide({ docType: "slide" });

  return (
    <Box width="full">
      <HeaderNav />

      {accessToken && presentationId ? (<Slides />) : (
        <CreateSlide
          loading={loading}
          handleOpenPicker={handleOpenPicker}
          createGooglePresentationSlide={createGooglePresentationSlide}
        />
      )}
    </Box>
  )
}

export default Home