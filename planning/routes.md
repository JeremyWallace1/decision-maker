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
* DONE: picture polls! (add picture to description or clickable url)
* DONE: (done as pie chart) poll options change to bar w/ weighting
* DONE: copy button (copies to clipboard)
* DONE: email link(s) button
* you have already replied to this on <date>
* responsive to screen sizes
* works on mobile... (jquery UI draggable)
* DONE: pretty logo (not sure how pretty it is lol)
* data security: use object getters and private keys to hide properties that we don't want users to see if they console.log(window) in the browser console (or we could encrypt the data that is meant to be private)