### Which project you chose and why ***
* Option 4: Decision Maker
* - Liked the idea of a single-page app (SPA) that could start small and be expanded to add extra features if we wanted that would be challenging, but come across as a 'simple' app 

*** What each of you did, individually ***
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
* - implementation of images for questions and choices using conversion to base 64 and storing in DB

# Both
* - Defined User stories
* - BREAD: writing out the routes we'll need and remembering RESTful conventions
* - Defined stretch goals
* - Defined what NOT to do
* - ERD diagram for project
* - Wireframe diagram
* - Pair programmed multiple front and back-end issues to resolution

*** Show us what you built (demo the app and show us the features) ***
* - https://the-decision-maker.azurewebsites.net

*** What challenges you had and how you overcame them ***
* - PROBLEM: hosted on local machine so ip address will always be the same
* - - SOLUTION: dev/staging/production modes w/ ips in env file, random ips and actual ip respectively
* - PROBLEM: MailGun was no longer free
* - - SOLUTION: researched and found alternative: SendInBlue
* - PROBLEM: Layout consistency.
* - - SOLUTION: Bootstrap was somewhat difficult to modify, so used a combination of Bootstrap and SCSS. 
* - PROBLEM: selection ranking.
* - - SOLUTION: generated selections, allow movement of selections and also when submitting them assign a value based on position of submission, 
* - - - Ranked based on order and decending point value based on # of items (if 5 items, valued 5, 4, 3, 2, 1) [Borda Count method].
* - PROBLEM: show results.
* - - SOLUTION: Used a boolean so it shows chart and results if using "view poll results" link, but not if using "share poll" link
* - PROBLEM: successMessage
* - - SOLUTION: Submission of a new poll goes to a successMessage with links to poll and results and confirmation an email will be sent.
* - PROBLEM: allow 2 to 5 choices for a poll
* - - SOLUTION: created button and function to add additional choices up to 5 per poll (starts at a minimum of 2). Also added removeChoices button if user changes mind.
* - PROBLEM: screen space can be very cluttered.
* - - SOLUTION: made add image and add description optional and as links. If user wants to use it they can click links to enable them for the question or each choice.
* - PROBLEM: Not allowed to use NGROK (Got message from TELUS Senior Security consultant not to use ngrok as it's not allowed without proper authorization.)
* - - SOLUTION: azurewebsites.net used (came with credits for 30 days usage). 
* - PROBLEM: storing images
* - - SOLUTION: added image uploading using base64 encoding stored in table with poll.
* - PROBLEM: Needed easy-to-read way of presenting poll results.
* - - SOLUTION: Implemented dynamic pie chart w/ labels from chart.js

*** What you learned about project workflow ***
* - Definitely best to plan with wireframes and db schema and work towards the simplest implementation first with stretch goals if time allows
* - Merging is scary. Conflicts are scarier.

*** What you learned and/or what you’ll do differently in final projects ***
* - More planning on stretch goals. Can end up going in a different direction without consensus from all parties.