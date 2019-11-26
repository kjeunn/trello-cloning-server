module.exports = (sequelize, DataTypes) => {
  const UserBoard = sequelize.define("userboard", {
    boardId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "board",
        key: "id"
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "user",
        key: "id"
      }
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false
    },
    updatedAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false
    }
  });
  UserBoard.associate = models => {
    UserBoard.belongsTo(models.board, {
      foreignKey: "boardId"
    });
    UserBoard.belongsTo(models.user, {
      foreignKey: "userId"
    });
  };
  return UserBoard;
};
