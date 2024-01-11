import fs from "node:fs/promises"
import fs2 from "fs";

/* Libraries */
import { google, Auth } from "googleapis";

/* Application Modules */
import config from "../../config/app.config";
import { ServerError } from "../../common/exceptions/api.error";
import path from "node:path";

interface Token {
  access_token: string | null | undefined;
  refresh_token: string | null | undefined;
}

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
    this.TOKEN_PATH = path.join(process.cwd(), "/src/token_db.json")
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
  public async handleAuthenticationCallBack(code: string) {
    try {
      const { tokens } = await this.oAuth2Client.getToken(code);
      const { access_token, refresh_token } = tokens;

      this.oAuth2Client.setCredentials({
        refresh_token,
        access_token
      });

      await this.saveAuthCredential({ access_token, refresh_token });
      return this.getClientRedirectURL(access_token, refresh_token);
    } catch (error: any) {
      throw new ServerError(error.message);
    }
  }

  public async saveAuthCredential({ access_token, refresh_token }: Token) {
    const payload = JSON.stringify({
      access_token,
      refresh_token
    });

    return await fs.writeFile(this.TOKEN_PATH, payload);
  }

  public getAuth() {
    const fileContent = fs2.readFileSync(this.TOKEN_PATH, { encoding: "utf-8" });
    const credential = JSON.parse(fileContent)

    this.oAuth2Client.setCredentials({
      access_token: credential.access_token,
      refresh_token: credential.refresh_token
    })

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