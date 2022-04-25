import Express from 'express';
import { TInstagramAuthConfig } from "../resources/instagramResource";
import InstagramService from "../services/instagramService";

const { INSTA_APP_SECRET, INSTA_APP_ID } = process.env;

interface Controller {
  authorize(req: Express.Request, res: Express.Response): Promise<Express.Response<any>>;
  getInfo(req: Express.Request, res: Express.Response): Promise<Express.Response<any>>;
  findHashtag(req: Express.Request, res: Express.Response): Promise<Express.Response<any>>;
}

declare module 'express-session' {
  interface SessionData {
    accessToken: string;
  }
}

const Controller: Controller = {
  async authorize(req: Express.Request, res: Express.Response) {
    const config: TInstagramAuthConfig = {
      appId: INSTA_APP_ID,
      secret: INSTA_APP_SECRET,
      redirectUri: req.body.redirectUri,
    };
    try {
      const accessToken = await InstagramService.authorizeAccount(config, req.body.code);
      req.session.accessToken = accessToken;
      return res.status(200);
    } catch (error) {
      return res.status(401);
    }
  },
}

export default Controller;
