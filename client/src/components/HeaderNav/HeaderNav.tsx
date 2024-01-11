/* Libraries */
import { Box, Flex, useDisclosure } from "@chakra-ui/react"
import { FcGoogle } from "react-icons/fc";
import { FaGoogleDrive } from "react-icons/fa";

/* Application Modules */
import Button from "../CustomBtn/Button"
import { useAuthHeader } from "../../hooks/useAuthHeader";
import DynamicContentModal from "../DynamicContentModel/DynamicContentModal";
import { Fragment } from "react";
import { useSlide } from "../../hooks/useSlide";

interface SignedHeaderProps {
  logout: () => void;
  presentationId: string | null;
  openAddContentModal: () => void;
  handlePastDocument: () => void;
  handlePublishDocument: () => void;
}

const SignedHeader: React.FC<SignedHeaderProps> = ({
  presentationId,
  logout,
  openAddContentModal,
  handlePastDocument,
  handlePublishDocument
}) => {
  return (
    <Flex gap={4} alignItems="center">
      {presentationId && (
        <Button
          color="black"
          bg="white"
          width="auto"
          type="submit"
          border="1px"
          borderColor="blackAlpha.500"
          _hover={{ bg: "white.200" }}
          onClick={openAddContentModal}
        >
          Add Dynamic Content
        </Button>
      )}

      <Button
        color="black"
        bg="white"
        width="auto"
        type="submit"
        border="1px"
        borderColor="blackAlpha.500"
        _hover={{ bg: "white.200" }}
        leftIcon={<FaGoogleDrive />}
        onClick={handlePastDocument}
      >
        Past documents
      </Button>

      <Button
        color="white"
        bg="black"
        width="auto"
        type="submit"
        border="1px"
        borderColor="blackAlpha.500"
        _hover={{ bg: "white.200" }}
        onClick={handlePublishDocument}
      >
        Publish now
      </Button>

      <Button
        color="black"
        bg="white"
        width="auto"
        type="submit"
        border="1px"
        borderColor="blackAlpha.500"
        _hover={{ bg: "white.200" }}
        onClick={logout}
      >
        Logout
      </Button>
    </Flex>
  )
}

const SignInHeader = ({ submit }: { submit: () => void }) => {
  return (
    <Button
      color="black"
      bg="white"
      width="auto"
      type="submit"
      border="1px"
      borderColor="blackAlpha.500"
      _hover={{ bg: "white.200" }}
      leftIcon={<FcGoogle />}
      onClick={submit}
    >
      Sign In
    </Button>
  )
}

const HeaderNav = () => {
  const presentationId = localStorage.getItem("presentationId");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleOpenPicker } = useSlide({ docType: "sheet" });
  const {
    isTokenExist,
    logout,
    onSubmit,
    handlePublishDocument
  } = useAuthHeader();

  return (
    <Fragment>
      <DynamicContentModal isOpen={isOpen} onClose={onClose} />

      <Box
        py={3}
        px={8}
        width="full"
        bg="gray.200"
        display="flex"
        justifyContent="flex-end"
      >
        {isTokenExist ? (
          <SignedHeader
            presentationId={presentationId}
            logout={logout}
            openAddContentModal={() => onOpen()}
            handlePastDocument={handleOpenPicker}
            handlePublishDocument={handlePublishDocument}
          />
        ) : (
          <SignInHeader submit={onSubmit} />
        )}
      </Box >
    </Fragment>
  )
}

export default HeaderNav