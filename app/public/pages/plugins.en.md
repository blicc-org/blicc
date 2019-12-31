## Plugin development

### What is required?

You need to have the following dependencies installed to be able to follow this guide.

* [Git version 2 or higher](https://git-scm.com/downloads)
* [Node version 12 or higher](https://nodejs.org/en/download/)
* [Yarn version 1.19 or higher](https://yarnpkg.com/lang/en/docs/install/#mac-stable)

### How to setup the project?

First of all you need to clone the plugin boilerplate repository from github.

```sh
git clone https://github.com/blicc-org/plugins.git
```

Install all your node module dependencies.

```sh
yarn 
```

Create a `.env` file inside the root directory of your project and set the environment variables like the following. If you do not have a blicc developer account yet, you need to request one [here](mailto:help@blicc.org?subject=[DevAccount]%20Request).

```sh
DEVELOPER_MAIL='your@email.com'
DEVELOPER_PASSWORD='your_password'
SERVER='https://api.blicc.org'
```

### How to develop the plugin?

You will find the following simple plugin example in `/src/bundle/plugin/Plugin.js`. 

```js
export function Plugin(
  data = [],
  onDataUpdate = () => {},
  settings = {},
  setSettings = () => {}
) {
  return '<h1>Plugin example</h1>'
}
```

To start the development server, just run this.

```
yarn start
```

Now you can go to [http://localhost:6006/](http://localhost:6006/) and view your plugin. The boilerplate uses `storybook` to display the plugins in the browser. You can now edit your plugin and watch the browser respond to it.

### How to deploy the plugin?

To deploy a plugin you just need to run the following command.

```sh
yarn deploy
```

Go to [blicc.org](https://blicc.org) and use your new plugin!
