# Tiley [![CircleCI](https://circleci.com/gh/outline/tiley.svg?style=svg)](https://circleci.com/gh/outline/tiley)

An alternative to the default Gravatar's that is quick and easy to use. Tiley creates consistent colored squares with initials that can be used for default avatars, they look like this:

![TM](https://tiley.herokuapp.com/avatar/123/TM.png)
![JB](https://tiley.herokuapp.com/avatar/456/JB.png)
![LR](https://tiley.herokuapp.com/avatar/789/LR.png)
![FL](https://tiley.herokuapp.com/avatar/000/FL.png)
![KT](https://tiley.herokuapp.com/avatar/999/KT.png)
![KT](https://tiley.herokuapp.com/avatar/073/VB.png)


## How to use

### Basic Request

Tiley images may be requested just like a normal image, using an IMG tag. To ensure that tiley always returns the same color for a user you must pass a unique identifier - we recommend a hash of the users email address or a database id. The second parameter is the users initials which must be 1 or 2 letters:

`https://tiley.herokuapp.com/avatar/HASH/INITIALS.FORMAT`

For example:

https://tiley.herokuapp.com/avatar/205e460b479e2e5b48aec07710c08d50/TM.svg

File formats available are `png`, `svg` and `jpg`. We recommend using `svg` if possible.

#### Size

By default, images are presented at 100px by 100px if no size parameter is supplied. You may request a specific image size by using the s= parameter and passing a single pixel dimension (since the images are square):

https://tiley.herokuapp.com/avatar/205e460b479e2e5b48aec07710c08d50/TM.png?s=500

#### Color
 By default, image background colors are dynamically generated using the unique identifier. You may request a specific background color by using the c= parameter and passing a hex value without the "#" symbol:
 https://tiley.herokuapp.com/avatar/205e460b479e2e5b48aec07710c08d50/JK.png?c=DADB0D


## Hosting

We recommend running your own instance of Tiley, ~however there is an instance running on the Heroku free plan at https://tiley.herokuapp.com that you are welcome to use for low traffic applications~. This instance will be shut down soon due to Heroku free plans ending.

The best way to use Tiley is to pass the url as the default parameter when constructing a [gravatar url](https://en.gravatar.com/site/implement/images/) - this means that you can show your users gravatar if it's available and then fallback to a tiley. It would look something like this (don't forget to URL encode):

https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200&d=https%3A%2F%2Ftiley.herokuapp.com%2Favatar%2F205e460b479e2e5b48aec07710c08d50/TM.svg%3Fs%3D200


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
yarn install
yarn start
```

This will begin a process on port 3004 by default, so navigate to "http://localhost:3004" to access the tiley instance.
