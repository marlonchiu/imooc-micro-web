# imooc-micro-web

> [慕课网 | 从零打造微前端框架：实战“汽车资讯平台”项目](https://coding.imooc.com/class/520.html)

> [参考 iheqi/mirco-web-test](https://github.com/iheqi/mirco-web-test)

> [single-spa.js.org](https://single-spa.js.org/)

> [single-spa 中文](https://zh-hans.single-spa.js.org/)

## 启动主应用

```shell script
cd main # 进入到主项目
npm run serve # 启动项目
```

## 启动子应用

```shell script
# imooc-micro-web 目录下
npm start
```

## 项目介绍

- main 主项目，包含框架代码，位于`micro`目录下。
- 其他为子项目代码。

## 子项目分类

> 我的。计算器，关注度排行，上市新车 react16

> 本地车市、首页、搜索、选车、经销商、新能源、车型 vue2

> 车系、对比、询价页、金融购车、降价频道 vue3

> 资讯、视频 react15

## 构建一个后端服务

```shell script
npm install koa-generator -g

koa2 service

# 服务修改自动更新
npm install supervisor --save-dev
# "start": "supervisor bin/www",

# 跨域
npm install koa2-cors --save-dev
```
