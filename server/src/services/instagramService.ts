import { InstagramAPIConfig } from "../resources/instagramResource";

interface InstagramServiceInterface {
  authorizeAccount(config: InstagramAPIConfig, code: string): string; 
  findHashtagOnUserPosts(accessToken: string): boolean;
}
