# Tiley

An alternative to the default Gravatar's that is quick and easy to use. Tiley creates consistent colored squares with initials that can be used for default avatars, they look like this:

![TM](https://tiley.herokuapp.com/avatar/123/TM.svg)
![JB](https://tiley.herokuapp.com/avatar/456/JB.svg)
![LR](https://tiley.herokuapp.com/avatar/789/LR.svg)
![FL](https://tiley.herokuapp.com/avatar/000/FL.svg)
![KT](https://tiley.herokuapp.com/avatar/999/KT.svg)

## How to use

We recommend running your own instance of Tiley, however there is an instance running on the Heroku free plan at https://tiley.herokuapp.com that you are welcome to use for low traffic applications. 

The best way to use Tiley is to pass the url as the default parameter when constructing a gravatar url - this means that you can show your users gravatar if it's available and then fallback to a tiley. It would look something like this (don't forget to URL encode):

`https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200?d=https%3A%2F%2Ftiley.herokuapp.com%2Favatar%2F205e460b479e2e5b48aec07710c08d50.svg%3Fs%3D200`


## Installation

You can run your own copy of tiley easily on Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/tommoor/tiley)


## Development

Tiley depends on imageMagick, on OSX you can install it using Homebrew:

```
brew install imagemagick
```

On Heroku it's already installed and on linux you should use your package manager of choice.

```
npm install
npm start
```

This will begin a process on port 3004 by default, so navigate to "http://localhost:3004" to access the tiley instance.
