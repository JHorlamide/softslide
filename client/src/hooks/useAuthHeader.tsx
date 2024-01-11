import { useEffect, useState } from "react";

/* Libraries */
import { useLocation } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import toast from "react-hot-toast";

/* Application Module */
import { authService } from "../services/restService";

export const useAuthHeader = () => {
  const location = useLocation();
  const [loginUrl, setLoginUrl] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  const accessToken = new URLSearchParams(location.search).get('access_token');
  const refreshToken = new URLSearchParams(location.search).get('refresh_token');
  const isTokenExist = access_token && refresh_token ? true : false;

  if (accessToken && refreshToken) {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    window.close();
  }

  const getLoginUrl = async () => {
    const response = await authService.getLoginUrl();
    const data = response.data;
    setLoginUrl(data.data);
  }

  const handlePublishDocument = () => {

  }

  const onSubmit = async () => {
    if (loginUrl) {
      return window.open(loginUrl);
    }

    toast.error("Can't login you in. Please try again");
  };

  const logout = () => {
    localStorage.setItem("access_token", "");
    localStorage.setItem("refresh_token", "");
    localStorage.setItem("presentationId", "");
    localStorage.setItem("slideId", "");
    window.location.reload();
  }

  useEffect(() => {
    getLoginUrl();
  }, []);

  return {
    isTokenExist,
    logout,
    isOpen,
    onClose,
    onOpen,
    onSubmit,
    handlePublishDocument,
  }
}