import { useAuthHeader } from '../../hooks/useAuthHeader';
import { Fragment, useState } from "react";
/* Libraries */
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button as ChakraButton
} from "@chakra-ui/react"
import { FaGoogleDrive } from "react-icons/fa";

/* Application Modules */
import Button from "../CustomBtn/Button"
import { IoIosArrowDown } from "react-icons/io";
import { MdInsertChartOutlined } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { useTextContent } from '../../hooks/useTextContent';

interface TextComponent {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface TestMe {
  x?: number;
  y?: number;
}

const AuthenticatedUserHeader: React.FC<TestMe> = () => {
  const { logout, handlePublishDocument } = useAuthHeader();
  const {
    textComponents,
    handleAddImage,
    handleAddMetric,
    handleAddText
  } = useTextContent();

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