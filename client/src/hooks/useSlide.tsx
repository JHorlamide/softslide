import { useState } from "react";
import useDrivePicker from "react-google-drive-picker";
import { PickerCallback } from "react-google-drive-picker/dist/typeDefs";
import toast from "react-hot-toast";
import { CLIENT_ID, DEVELOPER_KEY } from "../config/AppConfig";
import { slideService } from "../services/restService";

export const useSlide = () => {
  const [openPicker] = useDrivePicker();
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem("access_token");
  const presentationId = localStorage.getItem("presentationId") as string;

  const extractSlidesKey = (slidesUrl: string): string | null => {
    const regex: RegExp = new RegExp(`(((https|http):\/\/|)docs\.google\.com\/presentation\/d\/)(.+?(?=(\/.+|\/|$)))`);
    const match = regex.exec(slidesUrl);
    return match ? match[4] : null;
  };

  const callBackFun = (data: PickerCallback) => {
    if (data.action === 'cancel') {
      toast.error("Googled drive closed");
    }

    console.log({ data })

    const embedURL = data.docs[0].embedUrl;
    const presentationId = extractSlidesKey(embedURL) as string;
    localStorage.setItem("presentationId", presentationId)
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

  const createNewGoogleSlide = async () => {
    /** Using hardcoded presentation title here because
     * the use does not specify how collection the new
     * presentation title
     */
    const NEW_SLIDE_TITLE = "NEW PRESENTATION SLIDE";
    try {
      setLoading(true);
      const response = await slideService.createPresentation({ title: NEW_SLIDE_TITLE });
      if (response.status === 201) {
        setLoading(false);
        const { data } = response.data;
        localStorage.setItem("presentationId", data.presentationId);
      } else {
        toast.error("Error creating slide");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
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