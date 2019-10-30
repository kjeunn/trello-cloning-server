module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    // 열 (Column) 정의
    id: {
      // 열 이름
      type: DataTypes.INTEGER, // 자료형
      allowNull: false,
      primaryKey: true, // Primary Key 여부
      autoIncrement: true // 자동증가 여부
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  });
  User.associate = models => {
    User.belongsToMany(models.board, { through: models.userboard });
  };
  return User;
};
