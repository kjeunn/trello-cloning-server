const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../db");
const env = require("../.env.json");

// 로그인
router.post("/signin", async (req, res) => {
  const matchedUser = await db.user.signin.post(req.body);
  if (matchedUser === "failure") {
    res.json("failure");
  } else {
    const token = jwt.sign({ email: req.body.email }, env.SECRET_KEY_JWT, {
      expiresIn: "7d"
    });
    res.cookie("trello", token);
    res.json("success");
  }
});

// 로그아웃
router.get("/signout", (req, res) => {
  res
    .clearCookie("trello", { path: "/" })
    .send(JSON.stringify(req.cookies.trello));
});

// 회원가입
router.post("/signup", async (req, res) => {
  const createdUser = await db.user.signup.post(req.body);
  if (createdUser === "existed user") {
    res.json("failure");
  } else {
    res.json("success");
  }
});

// mypage 내정보 보여주기
router.get("/setting", async (req, res) => {
  const userEmail = jwt.verify(req.cookies.trello, env.SECRET_KEY_JWT);
  const userInfo = await db.user.setting.get(userEmail);
  if (userInfo === "failure") {
    res.json("failure");
  } else {
    res.json({
      name: userInfo.dataValues.name,
      email: userInfo.dataValues.email
    });
  }
});

// mypage 내정보 수정 name, password
router.put("/setting", async (req, res) => {
  const userEmail = jwt.verify(req.cookies.trello, env.SECRET_KEY_JWT);
  const updatedUserInfo = await db.user.setting.put(userEmail, req.body);
  if (updatedUserInfo === "failure") {
    res.json("failure");
  } else {
    res.json("success");
  }
});

// 회원탈퇴 delete account
router.delete("/account", async (req, res) => {
  const userEmail = jwt.verify(req.cookies.trello, env.SECRET_KEY_JWT);
  const deletedUser = await db.user.account.delete(userEmail, req.body);
  if (deletedUser === "failure") {
    res.json("failure");
  } else {
    res.json("success");
  }
});

// user의 전체 boardlist 가져옴
router.get("/board-list", async (req, res) => {
  const userEmail = jwt.verify(req.cookies.trello, env.SECRET_KEY_JWT);
  const boardList = await db.user.boardList.get(userEmail);
  res.json(boardList);
});

// create new board
router.post("/board", async (req, res) => {
  const userEmail = jwt.verify(req.cookies.trello, env.SECRET_KEY_JWT);
  const userBoard = await db.user.board.post(userEmail, req.body);
  if (userBoard === "failure") {
    res.json("failure");
  } else {
    res.json("success");
  }
});

// update board
router.put("/board", async (req, res) => {
  const updatedBoard = await db.user.board.put(req.body);
  if (updatedBoard === "failure") {
    res.json("failure");
  } else {
    res.json("success");
  }
});

// delete board
router.delete("/board", async (req, res) => {
  const deletedBoard = await db.user.board.delete(req.body);
  if (deletedBoard === "failure") {
    res.json("failure");
  } else {
    res.json("success");
  }
});

// 해당 board의 전체 list + card 보여줌
router.get("/board/:boardId", async (req, res) => {
  const allListCard = await db.user.board.get(req.params.boardId);
  res.json(allListCard);
});

module.exports = router;
