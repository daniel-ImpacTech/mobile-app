#!/usr/bin/env bash

# break on first error
set -e
current="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ -z "$1" ]; then
    appContainer=$current/../..
else
    appContainer="$1";
fi

if [ ! -d $appContainer/.se_app_assets ]; then
    mkdir $appContainer/.se_app_assets

    ln -s $current/js $appContainer/.se_app_assets/js
    ln -s $current/css $appContainer/.se_app_assets/css
    ln -s $current/templates $appContainer/.se_app_assets/templates
fi

cp $current/gulpfile.js $appContainer/.se_app_assets/
cp $current/package.json $appContainer/.se_app_assets/

cd $appContainer/.se_app_assets
sudo npm install
gulp

rm -rf $current/minified
mv minified $current/
cd -