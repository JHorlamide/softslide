import fs from "node:fs"

/* Libraries */
import { google, Auth } from "googleapis";

/* Application Modules */
import config from "../../config/app.config";
import { ServerError } from "../../common/exceptions/api.error";
import path from "node:path";

class AuthService {
  scope: string[];

  clientId: string;

  clientSecrete: string;

  redirectUrl: string;

  oAuth2Client: Auth.OAuth2Client;

  TOKEN_PATH: string;

  constructor() {
    this.scope = config.scope;
    this.clientId = config.clientId;
    this.clientSecrete = config.clientSecrete;
    this.redirectUrl = config.redirectUrl;
    this.oAuth2Client = new google.auth.OAuth2(this.clientId, this.clientSecrete, this.redirectUrl);
    this.TOKEN_PATH = path.join(process.cwd(), "./src/token_db.json")
  }

  public getAuthUrl() {
    const authUrl = this.oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: this.scope,
      include_granted_scopes: true
    });

    return authUrl;
  }

  /* Exchange the authorization code for access and refresh tokens */
  public async handleAuthenticationCallBack(code: any) {
    try {
      const { tokens } = await this.oAuth2Client.getToken(code);
      const { access_token, refresh_token } = tokens;

      this.oAuth2Client.setCredentials({
        refresh_token,
        access_token
      });

      return this.getClientRedirectURL(access_token, refresh_token);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  public async saveAuthCredential({ access_token, refresh_token }: { access_token: string, refresh_token: string }) {
    const payload = JSON.stringify({
      access_token,
      refresh_token
    });

    return await fs.writeFile(this.TOKEN_PATH, payload, { encoding: "utf-8" });
  }

  public getAuth() {
    return this.oAuth2Client;
  }

  private getClientRedirectURL(
    accessToken: string | null | undefined,
    refreshToken: string | null | undefined
  ) {
    return `${config.clientRedirectURL}?access_token=${accessToken}&refresh_token=${refreshToken}`;
  }
}

export default new AuthService();