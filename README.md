## DebugPlugin

DebugPlugin 是一个基于[vconsole](https://github.com/Tencent/vConsole)的 webpack 插件。用户可以根据当前的环境，决定是否添加 vconsole。

## Usage

### 安装

```
npm install -D debugtool-webpack-plugin
```

### 使用

将插件添加到 webpack 的配置文件中：

```
var DebugPlugin = require('debugtool-webpack-plugin');

module.exports = {
  plugins: [
    new DebugPlugin({
      enable: true
    })
  ]
}
```

### 参数

DebugPlugin 接收一个对象参数 options,例如 `new DebugPlugin({enable:true})`，目前 options 只有一个配置项：

- `enable`。默认是 false，表示是否需要在项目中启用 vconsole。
