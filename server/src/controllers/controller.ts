const { INSTA_APP_SECRET, INSTA_APP_ID } = process.env;

interface Controller {
  authorize(req: Request, res: Response): Promise<void>;
  getInfo(req: Request, res: Response): Promise<void>;
  findHashtag(req: Request, res: Response): Promise<void>;
}
