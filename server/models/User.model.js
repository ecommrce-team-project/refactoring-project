module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
            set(value) {
              // Convert to lowercase before saving
              this.setDataValue('email', value.toLowerCase());
            },
          },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("customer", "admin"),
            defaultValue: "customer",
        },
        isBanned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        pfp: {
            type: DataTypes.STRING,
            allowNull: true,
            validators: {
                isUrl: true,
            },
        },
    }, { timestamps: true });

    return User;
};
