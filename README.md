# FPM-Smart-Home-Server

It's a backend server for *Xiaowei* which is the smart service cloud system of qcloud. Here is the url [https://xiaowei.qcloud.com/](https://xiaowei.qcloud.com/).

![The Tech Network](./snaps/topu.png)


## Functions

- Discovery
  ```
  这些消息类型用于发现该技能适配器可用的设备和功能.

  示例语句： “小微，发现我的智能家居设备” 目的：发现与最终用户的设备云帐户相关的设备。 DiscoverAppliancesRequest从Smart Home Skill API发送到技能适配器，目的是发现与客户的设备云帐户相关的设备。如果没有设备可以发现，或者您的设备云遇到错误，则技能适配器应返回一个空的DiscoverAppliancesResponse，而不是错误消息。
  ```

- TurnOn
  - Topic: `$s2d/u3/p1/trunon`
  - Payload: `deviceId`

  ```
  示例语句： “小微，打开空调” 目的：请求打开指定的设备。
  ```

- TurnOff
  - Topic: `$s2d/u3/p1/trunoff`
  - Payload: `deviceId`

  ```
  示例语句： “小微，关闭空调” 目的：请求关闭指定的设备。
  ```

- ActiveScene
  - Topic: `$s2d/u3/p1/activeScene`
  - Payload: `sceneId`

  ```
  示例语句： “小微，开启回家模式” 目的：激活回家场景。
  ```

- DeactiveScene
  - Topic: `$s2d/u3/p1/deactiveScene`
  - Payload: `sceneId`

  ```
  示例语句： “小微，关闭回家模式” 目的：关闭回家场景。
  ```

## Feedback Topics

- `$d2s/u3/p1/update`

- `$d2s/u3/p1/offline`


## Support Mqtt

Use the `FPM-IOT-CLOUD-MQTT` .


## Manual Links

- 1. Smart Home Skill API

  See [https://xiaowei.qcloud.com/wiki#APIDesc_smart_home_skill_api](https://xiaowei.qcloud.com/wiki#APIDesc_smart_home_skill_api)