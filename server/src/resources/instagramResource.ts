import * as fetch from "node-fetch";

export type InstagramAPIConfig = {
  secret: string;
  appId: string;
}

interface InstagramResourceInterface {
  getAccessToken(config: InstagramAPIConfig, authCode: string): string; 
  getUserRecentMedia(accessToken: string): any[];
}
