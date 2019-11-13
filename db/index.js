const crypto = require("crypto");
const models = require("../models");

module.exports = {
  user: {
    signin: {
      post: async body => {
        const matchedUser = await models.user.findOne({
          where: { email: body.email }
        });
        if (matchedUser === null) {
          return "failure";
        }
        let exactPassword = false;
        return new Promise(resolve => {
          crypto.pbkdf2(
            body.password,
            matchedUser.dataValues.salt,
            100000,
            64,
            "sha512",
            (err, key) => {
              if (key.toString("base64") === matchedUser.dataValues.password) {
                exactPassword = true;
              }
              if (!exactPassword) {
                resolve("failure");
              }
              resolve("success");
            }
          );
        });
      }
    },
    signup: {
      post: async body => {
        const matchedUser = await models.user.findOne({
          where: { email: body.email }
        });
        if (matchedUser !== null) {
          return "existed user";
        }
        crypto.randomBytes(64, (err, buf) => {
          crypto.pbkdf2(
            body.password,
            buf.toString("base64"),
            100000,
            64,
            "sha512",
            async (err, key) => {
              const createdUserInfo = await models.user
                .create({
                  name: body.name,
                  email: body.email,
                  password: key.toString("base64"),
                  salt: buf.toString("base64")
                })
                .then(res => res)
                .catch(err => console.error(err));
              return createdUserInfo;
            }
          );
        });
        return "success";
      }
    },
    boardList: {
      // /user/board-list
      get: async body => {
        const boardList = await models.board
          .findAll({
            attributes: ["title"],
            include: [
              {
                model: models.user,
                where: { id: body.userId }
              }
            ]
          })
          // .then(res => {
          //   res.forEach((element, index) => {
          //     res[index] = element.dataValues.title;
          //   });
          //   return res;
          // })
          .then(res =>
            res.map(board => {
              return board.dataValues.title;
            })
          )
          .catch(err => console.error(err));
        return boardList;
      }
    },
    board: {
      // /user/board/:boardId
      get: async boardId => {
        const lists = await models.list.findAll({
          attributes: ["id", "title"],
          where: { fk_boardId: boardId }
        });
        lists.map(async listObject => {
          const cards = await models.card.findAll({
            attributes: ["id", "title", "description"],
            where: { fk_listId: listObject.id }
          });
          console.log({ id: listObject.id, title: listObject.title, cards });
          // return { id: listObject.id, title: listObject.title, cards };
        });
      },
      post: async body => {
        const searchUser = await models.user
          .findOne({ where: { id: body.userId } })
          .then(res => res)
          .catch(err => console.error(err));
        if (searchUser === null) {
          return "failure";
        }
        const createdBoard = await models.board
          .create({ title: body.boardTitle })
          .then(res => res)
          .catch(err => console.error(err));
        if (createdBoard === undefined) {
          return "failure";
        }
        const createdUserBoard = await models.userboard
          .create({
            boardId: createdBoard.id,
            userId: body.userId
          })
          .then(res => res)
          .catch(err => console.error(err));
        if (createdUserBoard === undefined) {
          return "failure";
        }
        return createdUserBoard;
      },
      put: async body => {
        const updatedBoard = await models.board
          .update({ title: body.boardTitle }, { where: { id: body.boardId } })
          .then(res => res)
          .catch(err => console.error(err));
        if (updatedBoard[0] !== 1) {
          return "failure";
        }
        return "success";
      },
      delete: async body => {
        const deletedBoard = await models.board
          .destroy({ where: { id: body.boardId } })
          .then(res => res)
          .catch(err => console.error(err));
        if (deletedBoard === 0) {
          return "failure";
        }
        return "success";
      }
    }
  },
  list: {
    post: async body => {
      const searchBoard = await models.board
        .findOne({
          where: { id: body.boardId }
        })
        .then(res => res)
        .catch(err => console.error(err));
      if (searchBoard === null) {
        return "failure";
      }
      const createdList = await models.list
        .create({ title: body.listTitle, fk_boardId: body.boardId })
        .then(res => res)
        .catch(err => console.error(err));
      if (createdList === undefined) {
        return "failure";
      }
      return createdList;
    },
    put: async body => {
      const updatedList = await models.list
        .update({ title: body.listTitle }, { where: { id: body.listId } })
        .then(res => res)
        .catch(err => console.error(err));
      if (updatedList[0] !== 1) {
        return "failure";
      }
      return "success";
    },
    delete: async body => {
      const deletedList = await models.list
        .destroy({ where: { id: body.listId } })
        .then(res => res)
        .catch(err => console.error(err));
      if (deletedList === 0) {
        return "failure";
      }
      return "success";
    }
  },
  card: {
    post: async body => {
      const searchList = await models.list
        .findOne({
          where: { id: body.listId }
        })
        .then(res => res)
        .catch(err => console.error(err));
      if (searchList === null) {
        return "failure";
      }
      const createdCard = await models.card
        .create({
          title: body.cardTitle,
          description: body.cardDiscript,
          fk_listId: body.listId
        })
        .then(res => res)
        .catch(err => console.error(err));
      if (createdCard === undefined) {
        return "failure";
      }
      return createdCard;
    },
    put: async body => {
      const updatedCard = await models.card
        .update(
          {
            title: body.cardTitle,
            description: body.cardDiscript
          },
          { where: { id: body.cardId } }
        )
        .then(res => res)
        .catch(err => console.error(err));
      if (updatedCard[0] !== 1) {
        return "failure";
      }
      return "success";
    },
    delete: async body => {
      const deletedCard = await models.card
        .destroy({ where: { id: body.cardId } })
        .then(res => res)
        .catch(err => console.error(err));
      if (deletedCard === 0) {
        return "failure";
      }
      return "success";
    }
  }
};
