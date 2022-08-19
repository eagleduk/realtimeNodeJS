========================= 2022-08-19 =======================

## Paint
1. socket 을 이용한 canvas 동기화 연결
2. x, y, 색상, 선 굵기 동기화
3. 양방향으로 동기화

========================= 2022-08-18 =======================

## Chat
1. Chat 기능 및 접속/퇴장 알림

## Canvas
1. 기존 개발한 PaintJS 앱을 import (`ctrl + c / v`)
2. 개인 그림판 기능 동작

========================= 2022-08-17 =======================

## Socket
1. socket 관련 js 를 따로 만들어서 개발
2. 서버의 event 따로(socketEvents.js), front-end event 따로(socket.js)

## Gulp
1. 번들시 css 설정을 잘못한 관계로 css 파일이 하나가 아닌 갯수만큼 번들이 되도록 되어있었다.
2. `assets/styles/**/*.scss` 로 되어 있던걸 `assets/styles/styles.scss` 로 수정

## Login
1. login form 개발 css 는 중요한 부분이 아니라 그냥 복사

========================= 2022-08-16 =======================

## del
1. del 설치
   - npm i del
   - 파일 및 폴더를 삭제 할 수 있게 해준다.
   - 버전이 많이 변경되어서 시행착오 및 검색으로 해결..
   1. package module 추가
      - commonJS 관련 import 에서 에러가 발생..
      - package.json `"type": "module"` 추가
      *** module을 추가시 socket.io 에서 에러 발생.. module 시 동작이 되질 않는다.
   - 강의 버전인 4.1.0 으로 설치..
   - npm i del@4.1.0

1. gulp-browserify
   - 현재 공식 github 에 더이상 업데이트가 되질 않는다.
   - 비슷한 패키지인 gulp-bro 를 사용하라고 한다.

1. gulp-bro 설치
   - npm install --save-dev gulp-bro
   - gulp 로 js 파일을 번들시 es6 문법(ex. import / export) 을 사용한 파일을 읽을 수 있게 해준다.
   - babel 옵션을 사용하기 위해 `babelify` 설치를 해 주어야 한다.
   - npm i babelify
   - presets 값은 `.babelrc` 파일과 동일하게 설정.

1. nodemon ignore 추가
   - assets 하위의 js / scss 파일을 수정할 때 마다 build 가 실행됨으로 서버가 재시작 되는것을 방지
   - ignore 옵션 추가 (assets/, src/static/)

========================= 2022-08-15 =======================

## Develop Setting

1. express 설치
   1. npm i express
2. nodemon 설치
   1. npm i nodemon
3. babel 설치
   1. npm install @babel/core @babel/node --save-dev
   2. npm install @babel/preset-env --save-dev
4. script 입력
   1. nodemon --exec babel-node `[server javascript]`
5. Pug 설치
   1. npm install pug --save
   2. express pug 설정
      1. express.set("view engine", "pug");
      2. app.set(`[pug root path]`, join(__dirname, `[pug root path]`));
6. static 설정
   1. express.use("static", `join(__dirname, "static"`);
7. eslint 설치
   1. npm install eslint --save-dev
   2. eslintrs.js 파일 생성 및 입력
8. socket io 설치
   1. npm install socket.io
   2. web socket 서버 설정

## Socket IO

1. on 함수를 통해 socket 연결, 임의 이벤트를 보내거나 받을 수 있다.
   
   ```javascript
   // **********    server side
   const server = express().listen(4000);
   const io = socket.io(server);

   io.on("connection", (socket) => {
      // socket 에 연결될 때 id 출력
      console.log(socket.id);

      // client 에서 `sendMessage` 이벤트 발생시 server 에서  실행되는 함수
      socket.on("sendMessage", data => {
         // 현재 접속중인 socket client 에 `receiveMessage` 이벤트 발생
         socket.emit("receiveMessage", data);
         // 현재 접속중인 socket client 를 제외한 client 에 `receiveMessage` 이벤트 발생 
         socket.broadcase.emit("receiveMessage", data);
      })
   })

   // **********    client side
   const socket = io();
   
   // server 에서 receiveMessage 이벤트 발생 시 client 에서 실행되는 함수 
   socket.on("receiveMessage", (data) => {
      console.log("receiveMessage", data);
   })

   // client sendMessage 이벤트 발생
   function sendMessage(text) {
      socket.emit("sendMessage", {text});
   }

   ```

2. socket 에 nickname 등 데이터를 저장 가능
   1. 메모리에 저장되는 데이터 이므로 휘발성이다.

   ```javascript
   // **********    server side
   const server = express().listen(4000);
   const io = socket.io(server);

   io.on("connection", (socket) => {
      socket.on("sendMessage", data => {
         socket.broadcase.emit("receiveMessage", {
            ...data,
            nickname: data.nickname || "Anonymous"
         });
      })
      
      // client 에서 `setNickname` 이벤트 발생시 server 에서 실행되는 함수
      socket.on("setNickname", data => {
         socket.nickname = data.nickname;
      })
   })

   // **********    client side
   const socket = io();
   
   socket.on("receiveMessage", (data) => {
      console.log(`${data.nickname}: ${data.text}`)
   })

   function sendMessage(text) {
      socket.emit("sendMessage", {text});
      console.log(`You: ${text}`);
   }

   // 접속 socket 의 nickname 을 저장하기 위한 client `setNickname` 이벤트
   function setNickname(nickname) {
      socket.emit("setNickname", {nickname});
   }

   ```

## Gulp

1. Gulp 설치
   1. npm install --save-dev gulp
   2. `gulpfile.js` 생성
      - import / export 문법을 사용하기 위해서는 `gulpfile.babel.js` 로 생성
   3. gulp build sciprt 생성
2. sass, gulp-sass 설치
   1. npm install sass gulp-sass --save-dev
3. build watch
   1. `gulpfile.babel.js` gulp.watch 함수를 실행하는 함수 export
4. Gulp plugin
   1. autoprefixer 설치
      1. npm install --save-dev gulp-autoprefixer
      2. 구형 브라우저에서도 scss 가 호환이 가능하게 해주는 plugin.
   2. gulp-csso 설치
      1. npm install gulp-csso --save-dev 
      2. css 파일의 용량을 줄이기 위한 plugin.