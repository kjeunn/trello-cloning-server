module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define("board", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
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
  Board.associate = models => {
    // Board.hasMany(models.list, { as: "board" });
    Board.hasMany(models.list, {
      foreignKey: "fk_boardId",
      onDelete: "cascade"
    });
    Board.belongsToMany(models.user, {
      through: models.userboard,
      foreignKey: "boardId"
    });
  };
  return Board;
};
