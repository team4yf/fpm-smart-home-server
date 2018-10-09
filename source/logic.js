const logic = async message => {
    const { header, payload } = message;
    const { name, namespace } = header;
    console.log(name, payload)
    switch( name ){
        case 'TurnOnRequest':
            // 打开设备
            // TODO: ...
            return {
                "header": {
                    "messageId": "9422676d-2356-4aa7-aa88-c642f12bfcd6",
                    "name": "TurnOnConfirmation",
                    "namespace": "SmartHome.Control",
                    "payloadVersion": "1"
                },
                "payload": {}
            }
        case 'TurnOffRequest':
            // 关闭设备
            // TODO:...
            return  {
                "header": {
                    "messageId": "9422676d-2356-4aa7-aa88-c642f12bfcd6",
                    "name": "TurnOffConfirmation",
                    "namespace": "SmartHome.Control",
                    "payloadVersion": "1"
                },
                "payload": {}
            }
        case 'ActivationSceneRequest':
            // 打开场景
            // TODO: send request to mqtt server
            // “开启回家模式”
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
            // “发现我的智能家居设备”
            return {
                "header": {
                    "messageId": "9ed9747d-caee-429e-b7ce-9104c82550ea",
                    "name": "DiscoverAppliancesResponse",
                    "namespace": "SmartHome.Discovery",
                    "payloadVersion": "1"
                },
                "payload": {
                    "discoveredAppliances": [
                        {
                            "actions": [
                                "TurnOn",
                                "TurnOff"
                            ],
                            "additionalApplianceDetails": {},
                            "applianceId": "1",
                            "friendlyDescription": "descriptionThatIsShownToCustomer",
                            "friendlyName": "空调",
                            "manufacturerName": "yourManufacturerName",
                            "modelName": "空调",
                            "version": "1"
                        }
                    ],
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