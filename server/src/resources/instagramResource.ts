import api from '../helpers/api';

export type TInstagramAuthConfig = {
  secret: string;
  appId: string;
  redirectUri: string;
}

interface InstagramResourceInterface {
  getAccessToken(config: TInstagramAuthConfig, authCode: string): Promise<string>; 
  getUserRecentMedia(accessToken: string): Promise<any[]>;
}

type TInstagramTokenResponse = {
  access_token: string,
  user_id: number,
}

export type TPostData = {
  caption: string,
  id: number,
}

type TInstagramMedia = {
  data: TPostData[],
}

const instagramResource: InstagramResourceInterface = {
  async getAccessToken(config: TInstagramAuthConfig, authCode: string) {
    let accessToken: string = '';
    try {
      const url = 'https://api.instagram.com/oauth/access_token';
      const payload = new URLSearchParams();
      payload.append('client_id', config.appId);
      payload.append('client_secret', config.secret);
      payload.append('grant_type', 'authorization_code');
      payload.append('code', authCode);
      payload.append('redirect_uri', config.redirectUri);
      const response: TInstagramTokenResponse = await api.post<URLSearchParams, TInstagramTokenResponse>(url, payload);
      accessToken = response.access_token;
    } catch (e) {
        throw new Error(`instagramResource.getAccessToken: ${e.message}`);
    }
    return accessToken;
  },
  async getUserRecentMedia(accessToken: string) {
    let results: any[] = [];
    try {
      const fields = 'caption';
      const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}`;
      const response: TInstagramMedia = await api.get<TInstagramMedia>(url);
      results = response.data;
    } catch (e) {
        console.log("instagramResource.getUserRecentMedia: ", e.message);
    }
    return results;
  }
}

export default instagramResource;
