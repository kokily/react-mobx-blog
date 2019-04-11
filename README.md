# react-mobx-blog
React-Mobx-Blog with Koa Server

## Usage stack
```javascript
- Backend : Koa.JS(Node)
- Database: MongoDB(Library: Mongoose)
- Frontend: React.JS(State Manage: MobX)
```

## ETC...
### Dotenv, nodemon.json setting(Private)

## Decorator 적용
yarn eject 이후
```javascript
$ yarn add @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators

- package.json
...
  "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ]
  }
...
```

## VS Code Decorator 에러 처리
```javascript
command + ' , ' (콤마) -> 셋팅.
검색에서 experimentalDecorators 체크
```
