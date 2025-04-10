module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        'Category',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            img: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: 'categories',
            timestamps: false,
        }
    );

    return Category;
};