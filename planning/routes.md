### BREAD ###
* Once you know the resources that you'll have, write out the routes that you'll need to perform BREAD operations on those resources
* Remember RESTful conventions (they make it much easier)


Browse    GET   /polls          --- creator landing page to create new poll        
Read      GET   /polls/:id      --- creator views poll results & links for sharing
Edit      --    --
Add       POST  /polls          --- creator submits new poll
Delete    --    --    

Browse    --    --              
Read      GET   /responses/:id  --- users view poll and can submit 
Edit      --    --
Add       POST  /responses      --- users responds to a poll
Delete    --    --


### STRETCH ###
* change to put/patch/delete
* edit with no responses so far...
* view other polls created by that email address (on browse GET /polls)
* picture polls!
* poll options change to bar w/ weighting
* copy button
* email link(s) button
* you have already replied to this on <date>
* responsive to screen sizes
* works on mobile... (jquery UI draggable)
* pretty logo