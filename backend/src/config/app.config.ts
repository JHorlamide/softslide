
import dotenv from 'dotenv';
dotenv.config();

const config = {
  allowedOrigin: process.env.ALLOWED_ORIGIN_URL as string,
  prefix: "/api",
  TOKEN_PATH: "src/token_db/token.json",
  port: process.env.PORT,
  client_email: process.env.CLIENT_EMAIL,
  privateKey: process.env.DEVELOPER_KYE,
  node_env: process.env.NODE_ENV as string,
  clientId: process.env.CLIENT_ID as string,
  clientSecrete: process.env.CLIENT_SECRET as string,
  redirectUrl: process.env.REDIRECT_URI as string,
  clientRedirectURL: `${process.env.ALLOWED_ORIGIN_URL}`,
  scope: [
    "https://www.googleapis.com/auth/presentations.readonly",
    "https://www.googleapis.com/auth/presentations",
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/drive.file"
  ]
}

export default config;
