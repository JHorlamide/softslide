import { env } from "./EnvironmentConfig";

export const APP_NAME = 'Slide Manager';
export const BASE_URL = env?.BASE_URL as string;
export const CLIENT_ID = env?.CLIENT_ID as string;
export const DEVELOPER_KEY = env?.DEVELOPER_KEY as string;
export const AUTH_ENTRY = "/app/slides/:presentationId";
export const HOME_ENTRY = "/";

