import Express from 'express';
import { TInstagramAuthConfig } from "../resources/instagramResource";
import InstagramService from "../services/instagramService";

const { INSTA_APP_SECRET, INSTA_APP_ID, HASHTAG, HASHTAG_FUNC_INTERVAL_SEC, TOKEN_DURATION_SEC } = process.env;

declare module 'express-session' {
  interface SessionData {
    accessToken: string;
    accessTokenValidUntil: Date;
  }
}

interface Controller {
  authorize(req: Express.Request, res: Express.Response): Promise<Express.Response<any>>;
  getInfo(req: Express.Request, res: Express.Response): Promise<Express.Response<any>>;
  findHashtag(req: Express.Request, res: Express.Response): Promise<void>;
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
      req.session.accessTokenValidUntil = new Date(now + (1000* TOKEN_DURATION_SEC));
      return res.status(200).json({ success: true });
    } catch (error: any) {
      return res.status(401).json({ success: false, message: error.message });
    }
  },
  async getInfo(req: Express.Request, res: Express.Response) {
    const { accessToken, accessTokenValidUntil } = req.session;
    let isConnected = false;

    if (!!accessToken && !!accessTokenValidUntil) {
      isConnected = InstagramService.accessTokenValidity(accessTokenValidUntil)
    }

    return res.status(200).json({ connected: isConnected });
  },
  async findHashtag(req: Express.Request, res: Express.Response) {
    const { accessToken } = req.session;
    let intervalId: NodeJS.Timer;

    if (!accessToken) {
      res.status(403);
      return;
    }

    res.writeHead(200, {
      Connection: "keep-alive",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    });

    const loopFunc = async () => {
      try {
        const hashtagFound = await InstagramService.isHashtagPostedByUser(HASHTAG, accessToken);

        res.write('data: ' + JSON.stringify({ success: hashtagFound }) + '\n\n');

        if (hashtagFound) {
          clearInterval(intervalId);
          res.end();
        }
      } catch (error: any) {
        res.write('data: ' + JSON.stringify({ error: error.message }));
      }
    };

    intervalId = setInterval(loopFunc, 1000 * HASHTAG_FUNC_INTERVAL_SEC);

    res.on('close', () => {
      clearInterval(intervalId);
      res.end();
    });
  },
}

export default Controller;
