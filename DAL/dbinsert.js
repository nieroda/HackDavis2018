const sql = require('mysql'),
      db = require('./dbconnection');

const connection = sql.createConnection(db.config);

exports.insertUniversal = (data, item) => {
  return new Promise((resolve, reject) => {
    let myquery = `insert into ${item} set ?`;
    connection.query(myquery, data, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

exports.getUsersAll = () => {
  return new Promise((resolve, reject) => {
    let myquery = `select * from Users`;
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

exports.getFlashCardAll = () => {
  return new Promise((resolve, reject) => {
    let myquery = 'select * from FlashCard';
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

exports.getFlashCardSetAll = () => {
  return new Promise((resolve, reject) => {
    let myquery = 'select * from FlashCardSet';
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

exports.getFlashCardSetByUser = userID => {
  return new Promise((resolve, reject) => {
    let myquery = `select * from FlashCardSet where userID=${connection.escape(userID)}`;
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    })
  });
}

exports.getFlashCardSet = FlashCardSetID => {
  return new Promise((resolve, reject) => {
    let myquery = `select * from FlashCardSet left join FlashCard on FlashCard.FlashCardSetID = FlashCardSet.FlashCardSetID where FlashCard.FlashCardSetID=${connection.escape(FlashCardSetID)}`;
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

exports.getCardAll = cardID => {
  return new Promise((resolve, reject) => {
    let myquery = `select * from FlashCard where FlashCardSetID=${connection.escape(cardID)}`;
    connection.query(myquery, (err, result) => {
      console.log(result);
      err ? reject(err) : resolve(result);
    });
  });
}

exports.deleteFlashCard = ({ FlashCardSetID, question, answer }) => {
  return new Promise((resolve, reject) => {
    let myquery = `delete from FlashCard where FlashCardSetID=${connection.escape(FlashCardSetID)} and question=${connection.escape(question)} and answer=${connection.escape(answer)}`;
    connection.query(myquery, (err, result) => {
      err ? reject() : resolve();
    });
  });
}

exports.getSetsFromUser = user => {
  return new Promise((resolve, reject) => {
    let myquery = `select * from FlashCardSet left join Users on Users.userID = FlashCardSet.userID where Users.userID=${connection.escape(user)}`;
    connection.query(myquery, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

exports.deleteSet1 = ({ SetName, FlashCardSetID }) => {
  return new Promise((resolve, reject) => {
    let myquery = `delete from FlashCardSet where FlashCardSetID=${connection.escape(FlashCardSetID)} and SetName=${connection.escape(SetName)}`;
    connection.query(myquery, (err) => {
        err ? reject() : resolve();
    });
  });
}

exports.deleteSet2 = ({ FlashCardSetID }) => {
  return new Promise((resolve, reject) => {
    let myquery = `delete from FlashCard where FlashCardSetID=${connection.escape(FlashCardSetID)}`;
    connection.query(myquery, (err) => {
        err ? reject() : resolve();
    });
  });
}
