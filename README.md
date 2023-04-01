# Tryyon Server
This is the server for Tryyon, an application built with Node.js and MongoDB.

# Installation
Clone the repository: git clone https://github.com/username/tryyon-server.git

Install dependencies: npm install

# Usage
## Development

To start the server in development mode, run the following command:

```npm run start:dev```

This will start the server with nodemon

To compile typescript code in into js with watch mode use following command 

```npm run build:watch```

## Production
To build the server for production, run the following commands:

```npm run build```

This will compile the TypeScript code into JavaScript and output it to the build directory.

Then start the server with:

```npm start```

# Scripts
```clean: Remove the coverage, build, and tmp directories
lint: Run ESLint to lint the TypeScript code
test: Run Jest to test the code and generate a coverage report
prettier: Run Prettier to format the code
test:watch: Run Jest in watch mode
start:dev: Start the server in development mode with nodemon and ts-node-dev
build: Compile the TypeScript code into JavaScript and output it to the build directory
start: Start the server in production mode```

# License
This project is licensed under the ISC License.
