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