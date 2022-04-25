import instagramResource, { TInstagramAuthConfig, TPostData } from "../resources/instagramResource";

interface InstagramServiceInterface {
  authorizeAccount(config: TInstagramAuthConfig, code: string): Promise<string>; 
  isHashtagPostedByUser(hashtag: string, accessToken: string): Promise<boolean>;
}

const InstagramService: InstagramServiceInterface = {
  async authorizeAccount(config: TInstagramAuthConfig, code: string) {
    return instagramResource.getAccessToken(config, code);
  },
  async isHashtagPostedByUser(hashtag: string, accessToken: string) {
    const posts: TPostData[] = await instagramResource.getUserRecentMedia(accessToken);
    return posts.some((post: TPostData) => post.caption.indexOf(hashtag.toLowerCase()));    
  },
}

export default InstagramService;
