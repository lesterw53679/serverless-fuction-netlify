rmdir /S .git
//the above command removes recursvilly all folders in .git
// then initialize the repo
git init
//then install all dependencies
npm install

//to run the project (see script in package.json)
npm run netlify

// note: to install the netlify cli globally 
npm install -g netlify-cli


//first thing we need to do is setup a .yml file for netlify (see toml file)
//then create a folder for our functions

http://localhost:8888/.netlify/functions/1-hello


under settings:  javascript suggest turn off

create a repository in github then look for the commands

in terminal:
git add .
git commit -m "initial deploy"
git remote add origin https://github.com/lesterw53679/serverless-fuction-netlify.git
git branch -M main
git push -u origin main

Air table:
https://airtable.com/account

once you get setup, add a workspace and then a database and then under that build a products table
add the products to the table uploading images etc, and descriptions

Now, go to your account and generate an API key, we will store that later
api key: keyhDE50pIP2DmXkG
base key

go to help and then API documentation
https://airtable.com/appn0pGxE3P0pG2pO/api/docs
The ID of this base is appn0pGxE3P0pG2pO

google search for npm package
https://www.npmjs.com/package/airtable-node


Smilga says that you could use their javascript SDK but there is a lot of work with pagination etc.
that package is npm install airtable

much better to use the node package for airtable

npm i airtable-node --save

here is the trick

on lesson 3 we construct a query parameter to refer to the product table, its sitting there with some data in it but
its like a template we use it.

//NOW before we push the changes to github go ahead and set the variables in netlify
//go to airtable platform
// go to domain settings
// go to build and deploy and scroll down to the variables section


