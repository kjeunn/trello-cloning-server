const router = require("express").Router();
const db = require("../db");

// 로그인
router.post("/signin", async (req, res) => {});

// 로그아웃
router.get("/signout", (req, res) => {});

// 회원가입
router.post("/signup", async (req, res) => {});

// mypage 내정보 보여주기
router.get("/setting", (req, res) => {});

// mypage 내정보 수정 name, password
router.put("/setting", async (req, res) => {});

// user의 전체 boardlist 가져옴
router.get("/board-list", async (req, res) => {});

// create new board
router.post("/board", async (req, res) => {});

// update board
router.put("/board", async (req, res) => {});

// delete board
router.delete("/board", async (req, res) => {});

// 해당 board의 전체 list 보여줌
router.get("/board/:boardId", async (req, res) => {});

module.exports = router;
