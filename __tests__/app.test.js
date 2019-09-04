'use strict';

const app = require('../app.js')

describe('Model Routes', () => {


  it('can save a file', () => {
    const filepath = './test-content.txt';
    return app.saveFile(filepath, 'THIS IS TEST CONTENT')
      .then(() => {
        return app.getFile(filepath)
          .then(result => {
            expect(result).toEqual('THIS IS TEST CONTENT');
          })
      })
  });

  it('can get a file', () => {
    const filepath = './test-content.txt';
    return app.getFile(filepath)
      .then(result => {
        expect(result).toEqual('THIS IS TEST CONTENT');
      })
  });

  it('can uppercase file', () => {
    const content = 'this is a test';
    expect(app.upperCaseFile(content)).toEqual('THIS IS A TEST');
  });

  it('can lowercase file', () => {
    const content = 'THIS IS A TEST';
    expect(app.lowerCaseFile(content)).toEqual('this is a test');
  });

});
