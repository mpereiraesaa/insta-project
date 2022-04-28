# Integrating Instagram Basic Display API, using React, Node.JS and Typescript.

This is a project that implements a client frontend that is using React and Typescript, and a Backend server running with Node.JS and using Typescript as well.

The project consists of a react application that allows the user to connect using his Instagram account, then we ask the user to post using a particular #hashtag and we run a monitor process that will retrieve the user posts using an interval until he posts the right #hashtag and then the process will finish.

We use Server sent events which is a server push technology using a unidirectional channel that sends data from the backend to the client.

## Installation

Use NPM package manager to install all the dependencies across both subprojects (frontend and backend) in the root directory.

```bash
npm install
```

## Run

```python
npm start
```

This will trigger first the backend (build and then run) and then the frontend client will load which is running in dev mode by default.

We are running everything with SSL using some self-signed certificates, your web browser will obviously give you a warning about it, just ignore it and continue, the reason for this is that we need to use HTTPS domains when working with Instagram Basic Display API redirection handler.

## Default hashtag

We save the hashtag in environment files in both subprojects, .env file for the server and a .env.development for the frontend project, right now default hashtag is **#satori** but this can be modified easily by just modifying it's value in the two environment files. 

## Test IG account

You can use the following account **test_nfts** with password **satori.art**

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
