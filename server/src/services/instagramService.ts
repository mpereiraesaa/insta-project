import instagramResource, { TInstagramAuthConfig, TPostData } from "../resources/instagramResource";

interface InstagramServiceInterface {
  authorizeAccount(config: TInstagramAuthConfig, code: string): Promise<string>; 
  getUserName(code: string): Promise<string>; 
  isHashtagPostedByUser(hashtag: string, accessToken: string): Promise<boolean>;
  accessTokenValidity(validUntil: Date): boolean;
}

const InstagramService: InstagramServiceInterface = {
  async authorizeAccount(config: TInstagramAuthConfig, code: string) {
    return instagramResource.getAccessToken(config, code);
  },
  async isHashtagPostedByUser(hashtag: string, accessToken: string) {
    const posts: TPostData[] = await instagramResource.getUserRecentMedia(accessToken);
    return posts.some((post: TPostData) => post.caption.toLowerCase().indexOf(hashtag.toLowerCase()) >= 0);
  },
  async getUserName(accessToken: string) {
    const data: any = await instagramResource.getUserInfo(accessToken);
    return data.username;    
  },
  accessTokenValidity(validUntil: Date) {
    return new Date() < new Date(validUntil);
  },
}

export default InstagramService;
