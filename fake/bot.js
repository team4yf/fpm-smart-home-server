const mqtt = require('mqtt');
const config = require('../config.json');
const { host, port, username, password } = config.mqttserver;
const client = mqtt.connect(`mqtt://${host}:${port}`, {
	username: username,
	password: password,
});
const sn = 'abcd';
client.subscribe([`$s2d/u3/p1/${sn}/trunon`, `$s2d/u3/p1/${sn}/trunoff`, `$s2d/u3/p1/${sn}/activeScene`, `$s2d/u3/p1/${sn}/deactiveScene`]);
client.on('message', (topic, payload) => {
    console.log('bot receive: ', topic, payload.toString());
})