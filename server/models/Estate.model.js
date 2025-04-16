module.exports=(sequelize,DataTypes)=>{

    const Estate = sequelize.define(
            'Estate',
            {
              // Model attributes are defined here
              title : {
                type: DataTypes.STRING,
                allowNull: false,
              },
              description: {
                type: DataTypes.TEXT,
                allowNull: true,
              },
              price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
              },
              location : {
                type: DataTypes.STRING,
                allowNull: false,
              },
              bathrooms  : {
                type: DataTypes.INTEGER
              },
              bedrooms  : {
                type: DataTypes.INTEGER
              },
              area : {
                    type: DataTypes.FLOAT,
                },
              image_url  : {
                    type: DataTypes.TEXT
                  },
                  category_id: {  
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {  
                        model: 'categories',  
                        key: 'id'  
                    }},
            },
          );
          return Estate
    }
    