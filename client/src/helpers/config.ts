
interface IConfig {
  BASE_URL: string;
  CLIENT_ID: string;
  REDIRECT_URI: string;
  DEFAULT_HEADERS: any;
}

const CONFIG: IConfig = {
  BASE_URL: 'http://localhost:8000/api/',
  CLIENT_ID: "1164288784402075",
  REDIRECT_URI: "https://localhost:3000/intro",
  DEFAULT_HEADERS: { 'Content-Type': 'application/json' },
};

export default CONFIG;
