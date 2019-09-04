'use strict';

const events = require('./events.js');

events.on('read', payload => log('read', payload));
events.on('altered', payload => log('altered', payload));
events.on('saved', payload => log('saved', payload));
events.on('error', payload => log('error', payload));

/**
 * console logs out all events with a timestamp
 * @param {*} event
 * @param {*} payload
 */
function log(event, payload) {
  let time = new Date();
  console.log('EVENT:', { event, time, payload });
}