# MEAN stack project
This project will contains both front end and backend projects.

# Deploying to Heroku
First we need to create account in heroku
Then we need to type command in terminal which is
heroku login
which will open in browser to login
After login we need to create an application in heroku
heroku create {app-name}
After creating application in heroku we need to push code to heroku git
heroku git:remote -a {app-name}

# To run Final application
We need to build application(frontend) which will create a publid folder in backend folder.
To build applicaiton we can use 
ng build
To watch changes and build automatically
ng build --watch

Then to start application from backend we need to open backend folder in terminal
then type command 
npm run start
And to see in browser, the url is
http://localhost:4000 as server starts at 4000 port

# Push Changes to Heroku
After git commit
git subtree push --prefix backend heroku master

# About
This is a To Do application which can be used to create, edit, and delete to do item.