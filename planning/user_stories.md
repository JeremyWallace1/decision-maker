# User Stories
* A user story describes how users will interact with your application
* They have the form: As a ___, I want to _, because ____.
eg. As a user, I want to be able to save posts, because I want to review them later.
* User stories can also be negated: As a __, I shouldn't be able to _, because ___.
* eg. As a user, I shouldn't be able to edit other users posts, because I don't own those posts.

# User Stories
* As a poll creator, I want to be able to create a poll that I can share with my friends, because I want to make group decision making easier.
* As a poll creator, I want to be able to share a poll that I created with my friends, because I want them to be able to specify their preference(s).
* As a poll creator, I want to be able to view the results of the polls I've created, because I want to be able to use the results to inform a decision.
* As a poll creator, I want to be notified when someone responds to a poll via an email with the admin link and results link, because I want to know the results as they are received.
* As a poll creator, I shouldn't be permitted to modify the poll after it's been created because that would be unfair to the poll users that have already responded.
* As a poll creator, I should be allowed to respond to the poll I created because my preference(s) are as important as my friends.

* As a poll user, when I receive a poll from a friend in email with a submission link, I want to be able to open the poll to see the questions and make a decision, because...
* As a poll user, I want to be able to rank the responses in the poll in the order I choose to specify my preference(s), because...
* As a poll user, I shouldn't be able to view the results of the poll unless the poll creator has shared that link with me, because we don't want to influence the outcome of the poll.
* As a poll user, I should only be permitted to respond one time to each poll, because each users response needs to be weighted equally.
* As a poll user, I should only be permitted to see the poll that was shared with me, for the privacy of the poll creator and other users is important.

**** STRETCH ****
- send the result_link to friends
- do you want to allow others to be able to view the results?
  - after specific date/time or anytime?
* As a poll creator, I want to be able to set an end date/time OR max submissions before poll closes, because...
* authentication/password, etc.
* randomize poll

### TABLE NAMES ###
- polls
  - links
- 
- users
  - creators
  - friends
- responses
  - ip log