const mqtt = require('mqtt');
const config = require('../config.json');
const { host, port, username, password } = config.mqttserver;
const client = mqtt.connect(`mqtt://${host}:${port}`, {
	username: username,
	password: password,
});
const sn = 'y0z0h0c0z0n0';
// setInterval( () => {
// 	client.publish(`$s2d/u3/p1/${sn}/activeScene`, `FOO BaR`, { qos: 1, retain: true});
// }, 15 * 1000)

client.subscribe([
	`$s2d/u3/p1/${sn}/all`,
	`$s2d/u3/p1/${sn}/turnon`,
	`$s2d/u3/p1/${sn}/turnoff`,
	`$s2d/u3/p1/${sn}/activeScene`,
	`$s2d/u3/p1/${sn}/deactiveScene`,
	`$s2d/u3/p1/update`]);
client.on('message', (topic, payload) => {
    console.log('bot receive: ', topic, payload.toString());
})