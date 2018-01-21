const db = require('../DAL/dbinsert');


exports.getAllUsers = (req, res) => {
  db.getUsersAll()
    //.then(result => res.render('index', { result }))
    .then(result => {
      console.log(result);
      res.render('index', { result, auth: req.session.userInfo });
    })
    .catch(err => res.send(err));
}

exports.getLogin = (req, res) => {
  console.log(req.session);
  res.render('login', { auth: req.session.userInfo });
}

exports.postLogin = async (req, res) => {
  console.log(req.body.auth);
  //req.session.userInfo = req.body.auth;

  try {
    var userInfo = await db.authUser(req.body.auth);
    if (userInfo.length === 0) {
      res.render('login', { auth: req.session.userInfo });
    }
    else {
      const { userID, username } = userInfo[0];
      const sessobj = { userID, username };
      req.session.userInfo = sessobj;
      res.redirect(`/user/${userID}`)
    }
  }
  catch(e) {
    res.render('login', { auth: req.session.userInfo });
  }
}

exports.getSet = (req, res) => {
  let { number } = req.params;
  db.getCardAll(number)
  .then(resp => {
    res.render('cardSet', { resp , number, auth: req.session.userInfo });
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
  console.log(session);
  console.log(session.userInfo)
  res.render('setsByUser', { sets, auth: req.session.userInfo });
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
