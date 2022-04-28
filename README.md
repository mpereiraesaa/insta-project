# Integrating Instagram Basic Display API, using React, Node.JS and Typescript.

This is a project that implements a client frontend that is using React and Typescript, and a Backend server running with Node.JS and using Typescript as well.

The project consists of a react application that allows the user to connect using his Instagram account, then we ask the user to post using a particular #hashtag and we run a monitor process that will retrieve the user posts using an interval until he posts the right #hashtag and then the process will finish.

We Server sent events an unidirectional channel that sends data from the backend to the client.

## Installation

Use NPM package manager to install all the dependencies across both subprojects (frontend and backend) in the root directory.

```bash
npm install
```

## Run

```python
npm start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)