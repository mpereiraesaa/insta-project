
interface IConfig {
  BASE_URL: string;
  CLIENT_ID: string;
  REDIRECT_URI: string;
}

const CONFIG: IConfig = {
  BASE_URL: 'http://localhost:8000/api/',
  CLIENT_ID: "1164288784402075",
  REDIRECT_URI: "https://localhost:3000/intro"
};

export default CONFIG;
