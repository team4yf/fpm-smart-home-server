const mqtt = require('mqtt');
const uuidv4 = require('uuid/v4');

const builder = fpm => {

    const { MQTT_HOST, MQTT_PORT, MQTT_USERNAME, MQTT_PASSWORD } = process.env;

    const mqttserverOption = fpm.getConfig('mqttserver', { host: 'localhost', port: 1883, username: 'admin', password: '123123123'})
    const { host, port, username, password } = Object.assign(mqttserverOption, {
        host: MQTT_HOST || mqttserverOption.host,
        port: MQTT_PORT || mqttserverOption.port,
        username: MQTT_USERNAME || mqttserverOption.username,
        password: MQTT_PASSWORD || mqttserverOption.password });

    const client = mqtt.connect(`mqtt://${host}:${port}`, { username, password });

    let SN_FUNCTIONS = {
        abcd: {
            discoveredAppliances: [
                {
                    "actions": [
                        "TurnOn",
                        "TurnOff"
                    ],
                    "applianceId": "a1",
                    "friendlyName": "空调",
                    "modelName": "空调",
                    "version": "1"
                }
            ],
            supportScenes: [
                {
                    "actions": [
                        "ActivationScene",
                        "DeactivateScene"
                    ],
                    "sceneId": "s1",
                    "sceneName": "回家",
                },
                {
                    "actions": [
                        "ActivationScene",
                        "DeactivateScene"
                    ],
                    "sceneId": "s2",
                    "sceneName": "吃饭",
                    "icon": "iconUrl"
                }
            ],
        }
    };

    client.subscribe(['$d2s/u3/p1/update', '$d2s/u3/p1/offline']);
    client.on('message', (topic, payload) => {
        try{
            const data = JSON.parse(payload.toString());
            switch(topic){
                case '$d2s/u3/p1/update':
                    SN_FUNCTIONS = Object.assign(SN_FUNCTIONS, data);
                    break;
            }
        }catch(e){
            console.error(e);
        }
    })



    return async message => {
        const { header, payload } = message;
        const { name, namespace } = header;
        // accessToken: 'abcd-144115211875729586-1539218448527'
        const { accessToken } = payload;
        // sn = abcd
        const sn = accessToken.split('-')[0];
        console.log(name, payload, sn)
        switch( name ){
            case 'TurnOnRequest':
                // 打开设备
                client.publish(`$s2d/u3/p1/${sn}/turnon`, `${ payload.appliance.applianceId }`, { qos: 1, retain: true});
                client.publish(`$s2d/u3/p1/${sn}/all`, JSON.stringify({ event: 'turnon', data: payload.appliance.applianceId}), { qos: 1, retain: true});
                return {
                    "header": {
                        "messageId": uuidv4(),
                        "name": "TurnOnConfirmation",
                        "namespace": "SmartHome.Control",
                        "payloadVersion": "1"
                    },
                    "payload": {}
                }
            case 'TurnOffRequest':
                // 关闭设备
                client.publish(`$s2d/u3/p1/${sn}/turnoff`, `${ payload.appliance.applianceId }`, { qos: 1, retain: true});
                client.publish(`$s2d/u3/p1/${sn}/all`, JSON.stringify({ event: 'turnoff', data: payload.appliance.applianceId}), { qos: 1, retain: true});
                return  {
                    "header": {
                        "messageId": uuidv4(),
                        "name": "TurnOffConfirmation",
                        "namespace": "SmartHome.Control",
                        "payloadVersion": "1"
                    },
                    "payload": {}
                }
            case 'ActivationSceneRequest':
                // 打开场景
                client.publish(`$s2d/u3/p1/${sn}/activeScene`, `${ payload.sceneId }`, { qos: 1, retain: true});
                client.publish(`$s2d/u3/p1/${sn}/all`, JSON.stringify({ event: 'activeScene', data: payload.sceneId}), { qos: 1, retain: true});
                // “开启回家模式”
                return {
                    "header": {
                        "messageId": uuidv4(),
                        "name": "ActivationSceneConfirmation",
                        "namespace": "SmartHome.Control",
                        "payloadVersion": "1"
                    },
                    "payload": {}
                }
            case 'DeactivateSceneRequest':
                // 关闭场景
                client.publish(`$s2d/u3/p1/${sn}/deactiveScene`, `${ payload.sceneId }`, { qos: 1, retain: true});
                client.publish(`$s2d/u3/p1/${sn}/all`, JSON.stringify({ event: 'deactiveScene', data: payload.sceneId}), { qos: 1, retain: true});
                return {
                    "header": {
                        "messageId": uuidv4(),
                        "name": "DeactivateSceneConfirmation",
                        "namespace": "SmartHome.Control",
                        "payloadVersion": "1"
                    },
                    "payload": {}
                }
            case 'DiscoverAppliancesRequest':
                // 发现设备
                client.publish(`$s2d/u3/p1/${sn}/refresh`, `1`, { qos: 1, retain: true});
                client.publish(`$s2d/u3/p1/${sn}/all`, JSON.stringify({ event: 'refresh', data: 1}), { qos: 1, retain: true});
                return {
                    "header": {
                        "messageId": uuidv4(),
                        "name": "DiscoverAppliancesResponse",
                        "namespace": "SmartHome.Discovery",
                        "payloadVersion": "1"
                    },
                    "payload": SN_FUNCTIONS[sn] || {},
                }
        }
        return {}
    }
}


exports.builder = builder;