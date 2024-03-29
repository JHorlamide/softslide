import { useEffect, useState } from "react";

/* Libraries */
import { useLocation } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import toast from "react-hot-toast";

/* Application Module */
import { authService, slideService } from "../services/restService";

export const useAuthHeader = () => {
  const location = useLocation();
  const [loadingPublish, setLoadingPublish] = useState(false);
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

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  const getLoginUrl = async () => {
    try {
      const response = await authService.getLoginUrl();
      const data = response.data;
      setLoginUrl(data.data);
    } catch (error: any) {
      console.log("GET LOGIN URL ERROR: ", error.message);
    }
  }

  const handlePublishDocument = async () => {
    setLoadingPublish(true);
    const slideData = JSON.parse(localStorage.getItem("slideData") as string);

    const payload = {
      slideId: slideData.slideId,
      textContent: localStorage.getItem("textContent"),
      chartContent: localStorage.getItem("chartContent")
    }

    try {
      const response = await slideService.publishDocument(payload);
      if (response.status === 201) {
        setLoadingPublish(false);
        const data = response.data;
        return toast.success(data.message);
      }

      console.log({ response });
    } catch (error: any) {
      setLoadingPublish(false);
      toast.error(`Error publishing Documents: ${error.message}`);
      console.log("Error publishing Documents: ", error);
    }
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
    localStorage.setItem("slideData", JSON.stringify({}));
    window.location.reload();
  }

  useEffect(() => {
    getLoginUrl();
  }, []);

  return {
    isOpen,
    isTokenExist,
    loadingPublish,
    logout,
    onClose,
    onOpen,
    onSubmit,
    handlePublishDocument,
  }
}