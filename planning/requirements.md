# Project Description
## Goal
 - Build a web app from start to finish using the tech and approaches learned to date
 - Turn requirements into a working product
 - Practice architecting an app in terms of UI/UX, Routes/API and Database
 - Manage a multi-developer project with git
 - Simulate the working world where you do not always get to completely cherry pick your team, stack or product features
 - Practice demoing an app to help prepare for the final project and employer interviews

# Stack Requirements
## Your projects must use:
 - ES6 for server-side (NodeJS) code
 - NodeJS
 - Express
 - RESTful routes

## One or more CSS or UI "framework"s:
 - jQuery
 - A CSS preprocessor such as SASS, Stylus, or PostCSS for styling -- or CSS Custom properties and no CSS preprocessor
 - PostgreSQL and pg (with promises) for DBMS
 - git for version control

## Optional Requirements
 - SPA (Single-Page Application) Behaviour
 - Hosting, such as heroku, netlify, github pages, AWS, or Azure

# Option 4: Decision Maker
* - A web app that helps groups of friends to vote on a preferred choice (using ranked voting), for example: "What movie should we see next Friday?".

## Requirements:
 - a user can create a poll with multiple choices
 - each choice can have a title and optional description
 - the creator must enter an email
 - when a poll is finished being created, the user is given two links: an administrative link (which lets them access the results) and a submission link (which the user sends to their friends)
 - the links are also sent to the creator via email (using mailgun)
 - when a user visits the submission link, they enter their name if required and see a list of the choices for that poll
 - the user can rank the choices (by drag and drop, or some other method) and then submits the poll
 - each time a submission is received, the creator is notified with an email (which includes the administrative link and a link to the results)
 - the results are ranked using the Borda Count method: https://en.wikipedia.org/wiki/Borda_count
 - note: this app does not follow the typical user authentication process: voters don't need to register or log in and the only way to access the polls or see the results is via links