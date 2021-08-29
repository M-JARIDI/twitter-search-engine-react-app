# twitter-search-engine

A simple React search engine app that displays information from the Twitter API.
See it live [twitter-search-engine](https://twitter-search-engine-react.herokuapp.com/)

## Getting started in local

1. Sign up over at [developer.twitter.com/en/apply-for-access](https://developer.twitter.com/en/apply-for-access) to get 4 keys :

- CONSUMER_KEY
- CONSUMER_SECRET
- ACCESS_TOKEN
- ACCESS_TOKEN_SECRET

2. Fork the project and clone it locally.
3. Create a file at the root of the project called `.env` with the following contents:

```sh
TWITTER_CONSUMER_KEY='your key'
TWITTER_CONSUMER_SECRET='your key'
TWITTER_ACCESS_TOKEN_KEY='your key'
TWITTER_ACCESS_TOKEN_SECRET='your key'
```

4. go to "/src/utlis/utils.js" and change the api url (line 4) to yours

> you can find the REST API used in this projetct at : [twitter-search-engine-backend-ts](https://github.com/M-JARIDI/twitter-search-engine-backend-ts).

---

### Exercise :

Build a react app that consume this API and has the following functionalities :

1. a page with an input where you can type your search + a search button (like google)
2. a page where it displays content related to the search, each search content is composed with a tweet content (basic info, image if any + text) and a link of the user who posted it (+ avatar)
3. each search is opened in a new tab, and we can navigate between tabs, and close tabs (so it should keep content related to each search)
4. when we click on the user link, it displays a closable popup window, with the user profile.
5. a feature to open the detail of a tweet, and in this page add two button one to see the prev tweet and the next tweet, based on the content list you got from the search

- The output is a react app + a readme which explains how to setup and launch it

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
