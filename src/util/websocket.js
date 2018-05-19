import * as deepstream from 'deepstream.io-client-js';

let client;

export default {
  initialize() {
    client = deepstream('ws://wth.aleksandar-babic.com/ws');
    client.login();
  },
  getClient() {
    return client;
  },
  subscribe(event, onEvent) {
    client.event.subscribe(event, data => {
      onEvent(data);
    });
  }
};
