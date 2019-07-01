---
layout: post
title: Webpack入门第四天
categories: webpack
tags: 
- ProvidePlugin
- 请求转发
- imports-loader
- 全局变量
- 单页面应用路由访问
- Vue cli3.0
- library
- Server Worker
date: 2019-7-1
---

## ProvidePlugin

在一个库文件使用另外一个库，可以配置：

```js
//webpack.common.js
const webpack = require('webpack')
module.exports={
    plugins:[new webapck.ProvidePlugin({
        $ : 'jquery',
        _ : 'lodash',
        _join : ['lodash','join'] //表示lodash里面的join方法
    })]
}
```

上述代码等价于你在一个库文件使用了`$`变量符，webpack就悄悄地帮你引入了该指定的库

```js
//third.js（配置前需要设置）
import $ from 'jquery'
$('body').css('background','red')

//third.js（配置后直接使用） 
$('body')css('background','green')
```

<br><br>

## imports-loader

因为每个模块（js文件）里面`this`指向为该模块本身而不是window，此时需要修改this的指向则需要引入imports-loader插件

**安装**：npm install imports-loaer -D

**配置**

```js
//webpack.common.js
module.exports={
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_module/,
                use:[{
                    loader: 'babel-loader'
                },{
                    loader: 'imports-loader?this=>window' //关键
                }]
            }
        ]
    }
}
```

当需要引入多个Loader 则需要用 use ，引入一个Loader直接 loader: 'loadername'

<br><br>

## 全局变量

```js
//webpack.comon.js
const merge = require('webapck-merge')
const prodConfig  = require('./webpack.prodConfig.js')
const devConfig = require('./webpack.devConfig.js')

const commonConfig = {...}
module.exports = (env) =>[
	if(env && env.production){
        return merge(commonConfig, prodConfig);
    }else{
        return merge(commonConfig, devConfig)
    }
]
```

```js
//package.json
{
    "script":{
        "dev-build": "webpack --config ./build/webpack.common.js",
        "dev": "webpack-dev-server --config ./build/webpack.common.js",
        "build": "webpack --env.production --config ./build/webpack.common.js"
    }
}
```

全局变量可以自由实现

<br><br>

## 封装工具库(library)

**配置**

```js
//webpack.config.js
const path = require('path')

module.exports = {
    mode: 'production',
    entry : './src/index.js',
    externals: 'lodash',
    output : {
        path : path.resolve(__dirname, 'dist'),
        filename : 'library.js',
        library: 'library', //挂载一个名为library的全局变量(可以是别的名字)
        libraryTarget: 'umd', //不管以何种方式引入都支持
    }
}
```

- output
  - library ： string 声明一个全局变量来使用该库的方法
  - libraryTarget
    - umd (一般情况下)  不管以何种方式引入都支持 (AMD,CMD,ESModule)
    - this  挂载一个全局变量在window上
    - window 同上
    - global (nodejs环境下)
- externals 表示在打包库文件的时候不引入哪些库，需要用户手动在index.js文件下引用（防止二次打包）

<br><br>

## Server Worker

webpack配置server worker ，目的是让文件缓存下来，防止服务器崩溃导致页面内容消失

**安装**: npm install workbox-webpack-plugin -D

**配置**

```js
//webpack.prod.js
const WorkboxPlugin = require('workbox-webpack-plugin')
module.exports= {
    plugins:[
        new WorkboxPlugin.GenerateSW({ //SW:server worker
            clientsClaim: true,
            skipWaiting: true
        })
    ]
}
```

```js
//index.js （入口文件）
if('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{
        navigator.serviceWorker.register('/service-worker.js')
        	.then(registration => {
               console.log('service-worker registed');
        	}).catch(error =>{
               console.log('service-worker register error')
        	})
    })
}
```

<br><br>

## http-server

将打包出来的文件运行在服务器上。详情自行Google（很简单）

<br><br>

## 请求转发(代理请求)

**注意 这里的配置是在devServer里面配置，意味着在开发环境中不能使用**

```js
const axios = require('axios')

axios.get('/react/api/header.json')
```



**配置**

```js
//webpack.config.js
module.exports = {
    proxy:{
        'react/api' : 'http://www.dell-li.com'
    }
}
```

意思是，当客户端发起`react/api`开头的请求时，webpack会匹配到proxy中去并进行相应配置会将发起的请求拼接为`http://www.dell-dell.com/react/api/header.json`

<br>

**更多的配置项**

```js
//webpack.config.js
module.exports = {
    devServer: {
        proxy: {
            '/react/api': {
                target: 'http://www.dell-li.com',
                secure: false,
                pathRewrite: {
                    'header.json': 'demo.json'
                },
                bypass: function(req, res, proxyOptions){
                    if(req.headers.accept.indexOf('html'))
                    return '/index.html'
                },
                changeOrigin: true,
                headers:{
                    host: 'www.dell-lee.com',
                    cookie: '...'
                }
            },
            {
            	context:['/auth','/api'],
        		target: 'http://localhost:3000'
        	}
        }
    }
}
```

参数说明

- pathRewrite：将向header.json请求的数据转向为向demo.json请求的数据，这样做的好处是不用改变源代码（当后端提供测试接口是demo.json时，而真正上线的是header.json时这样处理非常的合适，当不需要时直接注释掉即可）
- secure ：当请求的链接地址为https协议时，需要设置为`false`才能成功
- bypass ： 等你请求的是html（或其它）文件时，直接返回`/index.html`路径下的内容，而不会给你（代理）
- context：当你请求的地址匹配到括号里面的路径时，则统一代理到target的域名上
- changeOrigin：解决服务器对origin的限制问题（设置为true 可以跨域噢...）
- headers ： 设置请求头

<br><br>

## 单页面应用路由访问

```js
//webpack.config.js
module.exports = {
    devServer:{
        historyApiFullback : true //关键
    }
}
```

更多参数看webpack官网(webpack-dev-server这一块的配置项)

<br><br>

## 搭建Vue Cli3.0

**创建一个项目**

 ```js
vue create demoname
 ```

<br>

Vue Clid3.0为了让用户更简洁快速的去使用，所以把webpack配置文件隐藏了起来，如果用户需要自己配置，则在根目录下创建一个`vue.config.js`文件进行配置

>他和webpack的语法有出入 ,详情请看[官方文档](https://cli.vuejs.org/zh/config/#全局-cli-配置)

```js
//vue.config.js
module.exports = {
    outputDir: 'build',  //出口文件目录
    pages:{..}, //入口文件
    css : {modules:true}  //css模块化
}

```



