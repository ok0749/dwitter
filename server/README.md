Dwitter
- 개요 및 목적
  - node.js, Mysql을 사용해 RestAPI를 구현하고 제공된 React.js 템플릿과 연결하여 배포까지 진행하면서 웹 서버 및 데이터 베이스 구축에 대한 전반적인 지식과 역량을 키운다

- 설명 
  - Node.js의 Express.js 프레임워크를 사용해 유저 관련 Api(sign up, login 등), tweet 관련 Api(Get tweets, Create tweets 등) 구현 
  - Express-validator 라이브러리를 사용해 Sign up, Login, Tweet 생성시 유효성 검사
  - Sign up시 Bcrypt 라이브러리를 사용해 password 암호화 저장
  - Sign up, Login시 JWT라이브러리를 사용해 설정한 기간동안 유효한 Access token을 생성해 유효한 사용자인지 확인 
  - Socket.io를 사용해 실시간으로 Tweet을 통신하도록 구현 
  - 유저 정보(Id, Password 등), Tweet 정보(User id, Text 등)를 데이터베이스에 저장(Mysql, MongoDB 각각에 대해 구현하여 SQL과 NoSQL의 차이에 대해 알아봄, Sequelize 라이브러리를 사용하여 Mysql을 구현하여 SQL과 ORM의 차이에 대해 알아봄)
  - 개인적으로 SQL로 Mysql을 구현하는 것이 가장 편하다고 느껴져 이것으로 배포함
  - 프론트엔드 -> Netlify, 서버 -> Herokudp 각각 배포



- 사용 기술
  - Node.js 14.17.3
    - Express.js 4.17.1
    - Express-validator 6.12.1 
    - Express-async-errors 3.1.1
    - Bcrypt 5.0.1
    - Cors 2.8.5
    - Helmet 4.6.0
    - Morgan 1.10.0
    - Dotenv 10.0.0
    - Jsonwebtoken 8.5.1
    - Mysql2 2.3.0
    - Socket.io 4.2.0
    - Nodemon 2.0.12


- URL
  - https://dongja.netlify.app

- 로컬에서 실행 방법
  - $cd server
  - $npm start
  - $cd client
  - $npm start

