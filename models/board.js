module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define("board", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  });
  Board.associate = models => {
    Board.hasMany(models.list, { as: "board" });
    Board.belongsToMany(models.user, { through: models.userboard });
  };
  return Board;
};
