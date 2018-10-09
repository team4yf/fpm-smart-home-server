const Fpm = require('yf-fpm-server').Fpm;
const { logic } = require('./logic');
const fpm = new Fpm();

const biz = fpm.createBiz('0.0.1');

const router = fpm.createRouter();

router.post('/', async (ctx, next) =>{
    let postData = ctx.request.body
    console.log(postData);
    
    try{
      const rsp = await logic(postData);
      ctx.body = rsp
    }catch(e){
        console.error(e);
        ctx.body = { error: 'ops'}
    }
});

fpm.bindRouter(router)

const { MQTT_HOST, MQTT_PORT, MQTT_USERNAME, MQTT_PASSWORD } = process.env;

const mqttserverOption = fpm.getConfig('mqttserver', { host: 'localhost', port: 1883, username: 'admin', password: '123123123'})
const { host, port, username, password } = Object.assign(mqttserverOption, { 
    host: MQTT_HOST || mqttserverOption.host, 
    port: MQTT_PORT || mqttserverOption.port,
    username: MQTT_USERNAME || mqttserverOption.username,
    password: MQTT_PASSWORD || mqttserverOption.password });

const client = mqtt.connect(`mqtt://${host}:${port}`, { username, password });

client.subscribe(['$d2s/u1/p1/nb', '$d2s/u1/p1/tcp']);

fpm.run().then( () => {
    console.log('ok~')
});