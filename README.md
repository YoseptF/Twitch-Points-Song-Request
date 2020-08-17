# Twitch Points Song Request

## Use your channel points with your community!!!

![header](https://i.imgur.com/ZjIJRab.png)

---

With this app you can use your native [twitch points](https://help.twitch.tv/s/article/channel-points-guide?language=en_US) to let your community add songs to a common list.
![list song](https://i.imgur.com/lOFbkgf.png)

---

# Try it out!!

You want to try it out without any installation? YOU CAN! Just check out the [live version](https://twitch-points-suite.netlify.app/).

If you need some help setting the app the first time you can go [here](https://twitch-points-suite.netlify.app/guide) or just read the following instructions

![guide](https://i.imgur.com/44i8R9g.png)

# Development Setup

This project uses [Yarn 1.22.4](https://classic.yarnpkg.com/en/), and have not been tested with npm, it should work, but I can't say for sure.

Steps: 
- Clone this repo:
```
$ git clone git@github.com:YoseptF/Twitch-Points-Song-Request.git
```
- Move to the lastest branch:
```
$ git checkout [branch name]
```
- Install the dependencies:
```
$ yarn
```
- Run the developer server:
```
$ yarn dev
```

You are gonna need some api keys to populate your .env, you can get them here:

- [Firebase API](https://firebase.google.com/)
- [Twitch Api](https://dev.twitch.tv/)
- Salt is a random string which crypto-js uses to encrypt the folders' name on firebase so that no one can just access any folder

Finally, this project is meant to be deployed on [Netlify](https://app.netlify.com), so your gonna need an account if you want to deploy it to production.

# Build with

- [Hugo](https://gohugo.io)
- [Webpack](https://webpack.js.org/)
- [Netlify](https://app.netlify.com)
- [FontAwesome](https://fontawesome.com/)
- Icons made by <a href="https://www.flaticon.com/authors/flat-icons" title="Flat Icons">Flat Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
- Code from myself [Joseph Flores](https://github.com/YoseptF?tab=repositories)
