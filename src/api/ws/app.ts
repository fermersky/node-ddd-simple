import { WebSocketServer } from 'ws';

import httpApp from '@api/http/app';

const ws = new WebSocketServer({ server: httpApp.server });

ws.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});
