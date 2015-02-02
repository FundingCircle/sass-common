# sass-common
This repository contains all the common sass mixins used across the new FC pages and the FC icon font.
## How to use
You can easily import this repository into your project using bower. Just amend `devDependencies` of your project's bower configuration file with:
```
"devDependencies": {
  "sass-common" : "git@github.com:FundingCircle/sass-common.git#1.0.0"
}
```
After that, run `bower install` and you are all set!
## Releasing a new version
1. Bump the version number in both the bower.json and package.json
1. Run `gulp build`
1. Commit and push to a branch
1. After code review, merge to master and tag with the same version number as you have defined in the config files in step 1.
1. Enjoy!
