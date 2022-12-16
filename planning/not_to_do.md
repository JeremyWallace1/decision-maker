- if you're not going to demo it, don't build it (MVD = minimum viable demo)
- USER LOGIN: don't do it! just a waste of time

```js
// /login/2  (2 is that particular user, switch between users just by changing the number)
app.get('/login/:id', (req, res) => {
  // set the cookie (plain text or encrypted)
  // whatever they said they are, like user 2, just set the cookie
  req.session.user_id = req.params.id; // encrypted

  // or

  res.cookie('user_id', req.params.id); // plain text

  // redirect the user
  res.redirect('/');
});
```