const assert = require('assert'),
      db     = require('../DAL/dbinsert');

describe('tests for flashcardset id = 1', () => {

  it('successfully makes a request', async () => {
    try {
      const users = await db.getUsersAll();
      assert.ok(users);
    } catch (e) {
      assert.ok(false);
    }
  })
})
