========================= 2022-08-15 =======================
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