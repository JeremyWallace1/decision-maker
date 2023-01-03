### CHALLENGES ###
1. hosted on local machine so ip address will always be the same
  - resolved by generating fake ip address and storing in cookie for that visitor
2. mail program: mailgun unavailable (now paid) so used sendinblue
3. bootstrap: great to start with, but very hard to customize. Ended up using the col-system from it for formatting and a few other things but mainly sass
4. selection ranking: generated selections, allow movement of selections and also when submitting them assign a value based on position of submission, used sortable script for drag&drop of selections and submit button. Ranked based on order and decending point value based on # of items (if 5 items, valued 5, 4, 3, 2, 1) [Borda Count method].
5. show results flag: so it shows chart and results if using "view poll results" link, but not if using "share poll" link
6. successMessage flag: shows success message and links upon successful submission of a new poll
7. addOptions: created mechanism to add additional options/answers up to 5 per poll (starts at a minimum of 2)
8. removeOptions: created mechanism to remove additional options/answers down to 2 minimum if some more options had been added
9. addDescription: used to add a description field to the question or answers, reused same mechanism to add an image attachment field as well
10. 