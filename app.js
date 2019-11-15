const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const app = express();

const PORT = process.env.NODE_ENV === "production" ? 3001 : 3002;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// URL-encoded는 주소 형식(URI)으로 데이터를 보내는 방식이다.
// false면 노드의 querystring 모듈을 사용하여 쿼리스트링을 해석하고, true면 qs 모듈을 사용하여 쿼리스트링을 해석한다.
app.use(cookieParser());

app.use("/", routes);

app.use((req, res, next) => {
  // 404 처리 부분
  res.status(404).send("일치하는 주소가 없습니다!");
});
app.use((err, req, res, next) => {
  // 에러 처리 부분
  console.error(err.stack); // 에러 메시지 표시
  res.status(500).send("서버 에러!"); // 500 상태 표시 후 에러 메시지 전송
});
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
