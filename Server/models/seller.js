const { Model, DataTypes } = require("sequelize");
const connection = require("./connection");
const bcrypt = require("bcryptjs");
class Seller extends Model {}

Seller.init(
  {
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    
    email: {type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {isEmail: true,},
    },
    password: {type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [1],},
    },
    role: {type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "USER",
      validate: {isIn: ["Seller"],},
    },
  },
  {
    sequelize: connection,
  }
);

Seller.password = await bcrypt.hash(Seller.password, await bcrypt.genSalt());

Seller.addHook("beforeUpdate", async (Seller, { fields }) => {
  if (fields.includes("password")) {
    Seller.password = await bcrypt.hash(Seller.password, await bcrypt.genSalt());
  }
});

module.exports = Seller;