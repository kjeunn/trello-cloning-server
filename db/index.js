const models = require("../models");

module.exports = {
  user: {
    signin: {
      post: async body => {
        const matchedUser = await models.user
          .findAll({
            where: { email: body.email, password: body.password }
          })
          .then(res => res)
          .catch(err => console.error(err));
        return matchedUser;
      }
    },
    signup: {
      post: async body => {
        const matchedUser = await models.user.findAll({
          where: { email: body.email }
        });
        if (matchedUser.length !== 1) {
          const createdUserInfo = await models.user
            .create({
              name: body.name,
              email: body.email,
              password: body.password
            })
            .then(res => res)
            .catch(err => console.error(err));
          return createdUserInfo;
        }
        return "existed user";
      }
    },
    board: {
      // /user/board-list
      get: async boardId => {
        const lists = await models.list.findAll({
          attributes: ["id", "title"],
          where: { boardId }
        });
        lists.map(async listObject => {
          const cards = await models.card.findAll({
            attributes: ["id", "title", "description"],
            where: { listId: listObject.id }
          });
          return { id: listObject.id, title: listObject.title, cards };
        });
      },
      // /user/board
      async get(userId) {
        // let boards = await models.board.findAll({
        await models.board
          .findAll({
            attributes: ["id", "title"],
            where: { userId }
          })
          .then(res => res.json(res))
          .catch(err => console.error(err));
      },
      post(data) {
        models.board
          .create({ title: data })
          .then(res => res.json(res))
          .catch(err => console.error(err));
      },
      put() {
        models.board
          .update(
            { title: newTitle },
            { where: { boardId } },
            { returning: true }
          )
          .then(res => res.json(res[1][0]))
          .catch(err => console.error(err));
      },
      delete() {
        models.board
          .destroy({ where: { boardId } })
          .then(res => res.json({}))
          .catch(err => console.error(err));
      }
    },
    list: {
      post(data) {
        models.list
          .create({ title: data })
          .then(res => res.json(res))
          .catch(err => console.error(err));
      },
      put() {
        models.list
          .update(
            { title: newTitle },
            { where: { listId } },
            { returning: true }
          )
          .then(res => res.json(res[1][0]))
          .catch(err => console.error(err));
      },
      delete() {
        models.list
          .destroy({ where: { listId } })
          .then(res => res.json({}))
          .catch(err => console.error(err));
      }
    },
    card: {
      post(data) {
        models.card
          .create({ title: data })
          .then(res => res.json(res))
          .catch(err => console.error(err));
      },
      put() {
        models.card
          .update(
            { title: newTitle },
            { where: { cardId } },
            { returning: true }
          )
          .then(res => res.json(res[1][0]))
          .catch(err => console.error(err));
      },
      delete() {
        models.card
          .destroy({ where: { cardId } })
          .then(res => res.json({}))
          .catch(err => console.error(err));
      }
    }
  }
};
