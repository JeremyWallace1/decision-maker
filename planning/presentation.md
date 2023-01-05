### Which project you chose and why ***
* Option 4: Decision Maker
* - Liked the idea of a single-page app (SPA) that could start small and be expanded to add extra features if we wanted that would be challenging, but come across as a 'simple' app 

*** What each of you did, individually ***
# Jeremy
* - Initial project copy and added collaborator
* - Added planning directory
* - Adding index.html, logo.png, clearing out body, layout, main, nav css files as uses bootstrap for css via cdn import
* - Implemented bootstrap
* - Removed unnecessary scss files and corresponding css files
* - Added favicon
* - Created functions for adding and removing choices and limiting # of choices from 2 to 5 total
* - Add/Remove Changes buttons show or hide based on number of choices shown
* - Added error message area to index (later removed this as ended up not being necessary)
* - Added required to email, question, choices fields
* - Created challenges.md for planning and tracking purposes
* - Added redirectButton function for when 'create a poll' button is clicked when there is form data entered already to get confirmation from user
* - Get score data and push to views (if creator view)
* - SCSS using classes, ids, bootstrap overrides
* - Formatting of all views (responding to polls, creator view, new poll, etc.)
* - Implemented jQuery UI for sortable poll (drag and drop)
* - Screen Width breakpoints using combination of bootstrap and css (scss)
* - added Chart feature from chart-js 
* - Hiding image and description fields by default on creating a new poll with buttons to add those features if needed by creator
* - Added Font-Awesome CDN and some images for use in buttons
* - Added spinner and loading dynamic states to submit buttons w/ setTimeOut to simulate it taking a bit of time & give the user and indication that they pressed the button before moving to the next display & disable buttons so they can't be clicked multiple times
* - Added 'successfully submitted' new poll message (restricted it to only display on the page if it was a newly created poll using boolean)
* - Added 'you've submitted your choices in this poll' to viewPoll and added boolean so it displays if that IP has already responded to the poll.
* - Naming consistency (answer and option changed to choices everywhere)
* - JQuery touch-punch to allow mobile users to re-arrange choices by touch before submission

# Mark
* - DB queries, schema, seeds
* - DB query setup/implementation
* - Created get/post routes
* - Added: express-validator
* - Error catching
* - Rank scoring based on response submission order
* - Added axios for async API calls (later removed as unnecessary, then added back in)
* - Added cookie-parser (later removed as unnecessary)
* - Added function for fake IPs for dev mode
* - curl testing txt files
* - Parsing response post data
* - Insert to DB
* - Views Manager
* - shortUrl creation for responding to polls and for creator view
* - Check to make sure user hasn't already responded to a poll (prevent duplicate responses) based on IP
* - - Lots of IP finessing (dev, staging and production modes)
* - Limit results view to creator
* - SendInBlue email implementation
* - - send email on creation and responses
* - .ENV updates
* - implementation of images for questions and choices using conversion to base 64 and storing in DB
* - URL creation
* - Code cleanup and refactoring
* - Abstraction of code to different .js files for readability
* - Server implementation on azurewebsites.net

# Both
* - Defined User stories
* - BREAD: writing out the routes we'll need and remembering RESTful conventions
* - Defined stretch goals
* - Defined what NOT to do
* - Started Tech Stack file
* - Confirmed requirements 
* - ERD diagram for project
* - Wireframe diagram
* - Various trouble-shooting items (console.logging and 'be a rubber ducky for your partner')

*** Show us what you built (demo the app and show us the features) ***
* - https://the-decision-maker.azurewebsites.net

*** What challenges you had and how you overcame them ***
* - hosted on local machine so ip address will always be the same
* - - resolved by generating fake ip address and storing in cookie for that visitor
* - MailGun was no longer free, researched and found alternative: SendInBlue
* - Bootstrap was somewhat difficult to modify, so used a combination of Bootstrap and SCSS. Bootstrap mainly for breakpoints/columns. SCSS for colours, layout.
* - selection ranking: generated selections, allow movement of selections and also when submitting them assign a value based on position of submission, used sortable script for drag&drop of selections and submit button. Ranked based on order and decending point value based on # of items (if 5 items, valued 5, 4, 3, 2, 1) [Borda Count method].
* - show results flag: so it shows chart and results if using "view poll results" link, but not if using "share poll" link
* - successMessage flag: shows success message and links upon successful submission of a new poll
* - addchoices: created button/link and function to add additional choices up to 5 per poll (starts at a minimum of 2)
* - removechoices: created button/link and function to remove additional choices down to 2 minimum if some more options had been added
* - addDescription: used to add a description field to the question or answers, reused same mechanism to add an image attachment field as well
* - addImage: used to add an image to the question or choices
* - server setup: azurewebsites.net used (came with credits for 30 days usage). Got message from TELUS Senior Security consultant not to use ngrok as it's not allowed without proper authorization.
* - image Polls: added image uploading using base64 encoding and display to user (creator and other users) with file size limits and stored in table with poll. used encodeURIComponent() on data before passing it to database.
* - Modes: for IPs, if development, we pull from .env. If staging, it randomly generates a new IP each app refresh, and for production it gets the IP of the client/user.
* - Graph: results displayed in pie chart with labels as the answers to the questions and showing the borda count (totalled) for each answer based on all the responses received thus far. 

*** What you learned about project workflow ***
* - Definitely best to plan with wireframes and db schema and work towards the simplest implementation first with stretch goals if time allows
* - Merging is scary. Conflicts are scarier.
*** What you learned and/or what you’ll do differently in final projects
* - More planning on stretch goals. Can end up going in a different direction without consensus from all parties.