# sass-common
This repository contains all the common `sass` mixins used across the new FC pages and the FC icon font.

## Requirements
* nodejs
* npm

## How to use
You can easily import this repository into your project using bower. Just amend `devDependencies` of your project's bower configuration file with:
```
"devDependencies": {
  "sass-common" : "git@github.com:FundingCircle/sass-common.git#1.0.0"
}
```
After that, run `bower install` and you are all set!

## Build
Source files are located in `src` and are built into the build directory. This is `dest` by default.

### Overriding the build path
You may want to override the build path, for example to develop styles on one of the other FundingCircle projects. Override the build path using the environment variable `BUILD_PATH`.  
e.g.
```shell
$ BUILD_PATH=/path/to/fca-frontend gulp build
```

## Releasing a new version
1. Bump the version number in both the bower.json and package.json
1. Run `gulp build`
1. Commit and push to a branch
1. After code review, merge to master and tag with the same version number as you have defined in the config files in step 1.
1. Enjoy!

## Licence
[MIT License](license.md)
