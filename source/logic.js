const logic = async message => {
    const { header, payload } = message;
    const { name, namespace } = header;
    console.log(name, payload)
    switch( name ){
        case 'ActivationSceneRequest':
            // 打开场景
            // TODO: send request to mqtt server
            return {
                "header": {
                    "messageId": "9422676d-2356-4aa7-aa88-c642f12bfcd6",
                    "name": "ActivationSceneConfirmation",
                    "namespace": "SmartHome.Control",
                    "payloadVersion": "1"
                },
                "payload": {}
            }
        case 'DeactivateSceneRequest':
            // 关闭场景
            return {
                "header": {
                    "messageId": "9422676d-2356-4aa7-aa88-c642f12bfcd6",
                    "name": "DeactivateSceneConfirmation",
                    "namespace": "SmartHome.Control",
                    "payloadVersion": "1"
                },
                "payload": {}
            }
        case 'DiscoverAppliancesRequest':
            // 发现设备
            return {
                "header": {
                    "messageId": "9ed9747d-caee-429e-b7ce-9104c82550ea",
                    "name": "DiscoverAppliancesResponse",
                    "namespace": "SmartHome.Discovery",
                    "payloadVersion": "1"
                },
                "payload": {
                    "discoveredAppliances": [],
                    "supportScenes": [
                        {
                            "actions": [
                                "ActivationScene",
                                "DeactivateScene"
                            ],
                            "sceneId": "1",
                            "sceneName": "回家",
                            "icon": "iconUrl"
                        },
                        {
                            "actions": [
                                "ActivationScene",
                                "DeactivateScene"
                            ],
                            "sceneId": "2",
                            "sceneName": "吃饭",
                            "icon": "iconUrl"
                        }
                    ]
                }
            }
    }
    return {}
}

exports.logic = logic;