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

type TInstagramError = {
  error_type?: string,
  code?: string,
  error_message?: string,
}

interface TInstagramTokenResponse extends TInstagramError {
  access_token: string,
  user_id: number,
}

export type TPostData = {
  caption: string,
  id: number,
}

interface TInstagramMedia extends TInstagramError {
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
      
      if (!!response.error_type) {
        throw new Error(response.error_message);
      }

      accessToken = response.access_token;
    } catch (e: any) {
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

      if (!!response.error_type) {
        throw new Error(response.error_message);
      }

      results = response.data;
    } catch (e: any) {
      throw new Error(`instagramResource.getUserRecentMedia: ${e.message}`);
    }
    return results;
  }
}

export default instagramResource;
