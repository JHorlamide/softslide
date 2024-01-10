import axios from "axios";
import { BASE_URL } from "../config/AppConfig";
import { CreatePresentation } from "./types";

const restApiAgent = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const getRequestConfig: any = () => {
  return {
    headers: {},
    params: {}
  };
};

export const authService = {
  getLoginUrl: () => {
    const config = getRequestConfig();
    return restApiAgent.get("/auth/google", config);
  }
}

export const slideService = {
  getAllSlides: (presentationId: string) => {
    const config = getRequestConfig();
    return restApiAgent.get(`/slides/${presentationId}`, config);
  },

  createPresentation: (payload: CreatePresentation) => {
    const config = getRequestConfig();
    return restApiAgent.post("/slides/presentation", payload, config);
  }
}