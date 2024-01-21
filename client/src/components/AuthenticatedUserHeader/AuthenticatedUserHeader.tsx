import { useAuthHeader } from '../../hooks/useAuthHeader';
import { Fragment } from "react";

/* Libraries */
import { Flex } from "@chakra-ui/react"
import { FaGoogleDrive } from "react-icons/fa";

/* Application Modules */
import Button from "../CustomBtn/Button"

const AuthenticatedUserHeader = () => {
  const { logout, handlePublishDocument, loadingPublish } = useAuthHeader();

  const handlePastDocument = () => { };

  return (
    <Fragment>
      <Flex gap={4} alignItems="center">
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
          isLoading={loadingPublish}
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
    </Fragment>
  )
}

export default AuthenticatedUserHeader