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

    Category.associate = (models) => {
        Category.hasMany(models.Estate, {
            foreignKey: 'category_id'
        });
    };

    return Category;
};