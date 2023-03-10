### Which project you chose and why ***
* - For our midterm project we chose option 4: Decision Maker
* - This is a web app that helps groups of friends to vote on a preferred choice (using ranked voting), for example: "What movie should we see next Friday?"
* - We chose the app because we knew we had more time than normal for this project and felt we could expand it to add extra features if we wanted that would be challenging to develop but simple to use. 
* - Also, it was different enough from what we've done in bootcamp thus far while still being able to use the skills we've developed.

*** Show us what you built (demo the app and show us the features) ***
* - https://the-decision-maker.azurewebsites.net
* - http://localhost:8080/

*** What each of you did, individually ***
* Each of us decided to work on things that we felt we wanted more practice on. For Jeremy it was CSS, layout, etc. and for Mark it was routing, promises and async functionality. While Jeremy primarily worked on front-end and Mark on back-end we crossed over often as needed, especially when pair-programming challenges together.

# Both
* - Defined User stories
* - BREAD: writing out the routes we'll need and remembering RESTful conventions
* - Defined stretch goals
* - Defined what NOT to do
* - ERD diagram for project
* - Wireframe diagram
* - Pair programmed multiple front and back-end issues to resolution

# Jeremy
* - Adding index.html, logo.png, favicon, html for all views
* - Implemented bootstrap & css & font-awesome for dynamic content (buttons, widths)
* - Created functions for adding and removing choices, descriptions and images 
* - Get score data and push to views (if creator view)
* - Implemented jQuery UI, chart-js and jQuery touch-punch for sortable poll (drag and drop) and chart view of results

# Mark
* - DB queries, schema, seeds, setup, server implementation, rank scoring on submission order
* - Created get/post routes
* - Dev/staging/production modes for IP capturing (prevent duplicate submissions)
* - Views Manager
* - SendInBlue email implementation (on creation of poll and response to poll)
* - Implementation of images for questions and choices using conversion to base 64 and storing in DB

*** What challenges you had and how you overcame them ***
* - PROBLEM: connecting the app to the azure postgres database because of firewall issues
* - - SOLUTION: Used Azure Service Connector to connect to Postgres backing service and use Azure environment variables to create a connection string for remote access.

* - PROBLEM: storing images
* - - SOLUTION: added image uploading using base64 encoding stored in table with poll. For modularity and puts most of the image processing work on the client.

* - PROBLEM: Needed easy-to-read way of presenting poll results.
* - - SOLUTION: Implemented dynamic pie chart w/ labels from chart.js

* - PROBLEM: hosted on local machine so ip address will always be the same
* - - SOLUTION: dev/staging/production modes w/ ips in env file, random ips and actual ip respectively

* - PROBLEM: Layout consistency.
* - - SOLUTION: Bootstrap was somewhat difficult to modify, so used a combination of Bootstrap and SCSS. 

* - PROBLEM: selection ranking.
* - - SOLUTION: allow user to drag and drop to specify their rank preference and on submission assign a score based on the order received in the post body (borda count method)

* - PROBLEM: Not allowed to use NGROK (Got message from TELUS Senior Security consultant not to use ngrok as it's not allowed without proper authorization.)
* - - SOLUTION: azurewebsites.net used (came with credits for 30 days usage). 

* - PROBLEM: screen space can be very cluttered.
* - - SOLUTION: Only show a question and two choices initially and user can add more choices as well as images and descriptions to the form with buttons.

* - PROBLEM: GitHub gets scanned for API Keys and they get disabled
* - - SOLUTION: added API keys to .env file so they're not uploaded to GitHub and generated a new key.

* - PROBLEM: SPA app behaviour wouldn't accept more than one route
* - - SOLUTION: used query string parameters for accessing polls and sharing results and wrote own middleware for all of that.

* - PROBLEM: environment variables access for getting IP addresses
* - - SOLUTION: wrote a route (e.g. routes/env) that would allow us to get IP addresses from ENV file for the client side for current environment (dev, staging, production).

* - PROBLEM: Delay in querying data on hosting with server and db in different regions
* - - SOLUTION: Had to make sure that server and db were in same region to improve performance.

* - PROBLEM: Limited vertical screen space on mobile
* - - SOLUTION: Prioritized which content was important to show on mobile and shifting the layout accordingly to allow all five (max # of choices) show on one screen.

* - PROBLEM: show results if accessing with results link and not if sharing link
* - - SOLUTION: Used a boolean so it shows chart and results if using "view poll results" link, but not if using "share poll" link.

* - PROBLEM: successMessage
* - - SOLUTION: Submission of a new poll goes to a successMessage with links to poll and results and confirmation an email will be sent.

* - PROBLEM: allow 2 to 5 choices for a poll
* - - SOLUTION: created button and function to add additional choices up to 5 per poll (starts at a minimum of 2). Also added removeChoices button if user changes mind.

* - PROBLEM: MailGun was no longer free
* - - SOLUTION: researched and found alternative: SendInBlue

*** What you learned about project workflow ***
* - Definitely best to plan with wireframes and db schema and work towards the simplest implementation first with stretch goals if time allows while trying to stay true to the original structure of the project.
* - Merging is scary. Conflicts are scarier.

*** What you learned and/or what you???ll do differently in final projects ***
* - More planning on stretch goals. Can end up going in a different direction without consensus from all parties.
* - Adding new features in a branch should be done in as concise manner as possible to reduce exposure to merge conflicts.
* - - I.e. branch often for big features!