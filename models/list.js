module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define("list", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  });
  List.associate = models => {
    List.hasMany(models.card, { as: "list" });
  };
  return List;
};
