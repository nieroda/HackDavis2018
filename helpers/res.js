const db = require('../DAL/dbinsert');


exports.getAllUsers = (req, res) => {
  db.getUsersAll()
    //.then(result => res.render('index', { result }))
    .then(result => {
      console.log(result);
      res.render('index', { result });
    })
    .catch(err => res.send(err));
}

exports.getLogin = (req, res) => {
  //req.session.username = 'foo';
  console.log(req.session);
  res.render('login');
}

exports.postLogin = async (req, res) => {
  console.log(req.body.auth);
  //req.session.userInfo = req.body.auth;

  try {
    var userInfo = await db.authUser(req.body.auth);
    console.log(userInfo)
    if (userInfo.length === 0) {
      console.log("invalid");
      res.render('login');
    }
    else {
      console.log(userInfo);
      const { userID, username } = userInfo[0];
      console.log(userID);
      console.log(username);
      const sessobj = { userID, username };
      console.log(sessobj);
      req.session.userInfo = sessobj;
      res.redirect(`/user/${userID}`)
    }

  }
  catch(e) {
    console.log("in catch");
    console.log(e);
  }
}

exports.getSet = (req, res) => {
  console.log(req);
  let { number } = req.params;
  db.getCardAll(number)
  .then(resp => {
    res.render('cardSet', { resp , number });
  }).catch(err => res.send(err));
}

exports.postSet = async (req, res) => {
  let data = req.body.fc;
  console.log(data);
  await db.insertUniversal(data, 'FlashCard')
  res.redirect(`/set/${req.params.number}`);
}

exports.deleteSet = async (req, res) => {
  try {
    await db.deleteFlashCard( req.body.fc );
    res.redirect(`/set/${req.params.number}`)
  } catch (e) {
    res.send(e);
  }
}

exports.getUser = async (req, res) => {
  const sets = await db.getSetsFromUser( req.params.id );
  console.log(sets);
  res.render('setsByUser', { sets });
}

exports.deleteFullSet = async (req, res) => {
  try {
    await db.deleteSet1( req.body.fc );
    await db.deleteSet2( req.body.fc );
    res.redirect(`/user/${req.params.id}`);
  } catch (e) {
    res.send(e);
  }
}

exports.addUserSet = async (req, res) => {
  await db.insertUniversal(req.body.fc, 'FlashCardSet')
  try {
    await db.insertUniversal(req.body.fc, 'FlashCardSet');
    res.redirect(`/user/${req.params.id}`);
  } catch (e) {
    res.send(e);
  }
}
