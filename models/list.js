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
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false
    },
    updatedAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
      allowNull: false
    }
  });
  List.associate = models => {
    // List.hasMany(models.card, { as: "list" });
    List.hasMany(models.card, {
      foreignKey: "fk_listId",
      onDelete: "cascade"
    });
  };
  return List;
};
