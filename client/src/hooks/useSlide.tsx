import React, { useState } from "react";

/* Libraries */
import { PickerCallback } from "react-google-drive-picker/dist/typeDefs";
import useDrivePicker from "react-google-drive-picker";
import toast from "react-hot-toast";

/* Application Modules */
import { CLIENT_ID, DEVELOPER_KEY } from "../config/AppConfig";
import { slideService } from "../services/restService";

interface UseSlidProps {
  docType?: "slide" | "sheet"
}

export const useSlide = ({ docType }: UseSlidProps) => {
  const [openPicker] = useDrivePicker();
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem("access_token");
  const presentationId = localStorage.getItem("presentationId") as string;

  const callBackFun = (data: PickerCallback) => {
    if (data.action === 'cancel') {
      toast.error("Googled drive closed");
    }

    const selectedDocId = data.docs[0].id;
    if (docType === "slide") {
      localStorage.setItem("presentationId", selectedDocId);
      window.location.reload();
    } else {
      localStorage.setItem("selected_doc_id", selectedDocId);
    }
  }

  const handleOpenPicker = () => {
    openPicker({
      clientId: CLIENT_ID,
      developerKey: DEVELOPER_KEY,
      viewId: "DOCS",
      token: accessToken as string,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => callBackFun(data)
    })
  }

  const createNewGoogleSlide = async (title: string) => {
    try {
      setLoading(true);
      const response = await slideService.createPresentation({ title });

      if (response.status === 201) {
        setLoading(false);
        const { data } = response.data;
        localStorage.setItem("presentationId", data.presentationId);
        localStorage.setItem("slideTitle", data.title);
      } else {
        console.log({ response })
        toast.error("Error creating slide");
      }
    } catch (error: any) {
      setLoading(false);

      if (error.response && error.response.data) {
        const { message } = error.response.data;
        toast.error(message);
      } else {
        toast.error(error.message);
      }
    }
  }

  return {
    loading,
    accessToken,
    presentationId,
    handleOpenPicker,
    createNewGoogleSlide,
  }
}