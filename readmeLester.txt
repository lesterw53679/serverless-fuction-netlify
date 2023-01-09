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

git remote add origin https://github.com/lesterw53679/serverless-fuction-netlify.git
git branch -M main
git push -u origin main