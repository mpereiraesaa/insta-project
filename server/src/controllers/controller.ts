import Express from 'express';
import { TInstagramAuthConfig } from "../resources/instagramResource";
import InstagramService from "../services/instagramService";

const { INSTA_APP_SECRET, INSTA_APP_ID, HASHTAG, HASHTAG_FUNC_INTERVAL_SEC, TOKEN_DURATION_SEC } = process.env;

interface Controller {
  authorize(req: Express.Request, res: Express.Response): Promise<Express.Response<any>>;
  getInfo(req: Express.Request, res: Express.Response): Promise<Express.Response<any>>;
  findHashtag(req: Express.Request, res: Express.Response): Promise<void>;
}

declare module 'express-session' {
  interface SessionData {
    accessToken: string;
    accessTokenValidUntil: Date;
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
      const now = new Date().getTime();
      req.session.accessToken = accessToken;
      req.session.accessTokenValidUntil = new Date(now + (1000*parseInt(TOKEN_DURATION_SEC, 10)));
      return res.status(200);
    } catch (error) {
      return res.status(401);
    }
  },
  async getInfo(req: Express.Request, res: Express.Response) {
    const isValid = new Date() < req.session.accessTokenValidUntil;
    return res.status(200).json({ isConnected: !!req.session.accessToken && isValid });
  },
  async findHashtag(req: Express.Request, res: Express.Response) {
    res.writeHead(200, {
      Connection: "keep-alive",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    });

    setInterval(async () => {
      const hashtagFound = await InstagramService.isHashtagPostedByUser(HASHTAG, req.session.accessToken);
      res.write('data: ' + JSON.stringify({ success: hashtagFound }) + '\n\n');
    }, 1000 * parseInt(HASHTAG_FUNC_INTERVAL_SEC, 10));
  },
}

export default Controller;
