module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define(
        'Contact',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
          
            },
            message: {
                type: DataTypes.STRING,
               
            },
            phonenumber: {
                type: DataTypes.STRING
             
            },
            adress: {
                type: DataTypes.STRING
               
            },
        },
     
    );

    return Contact;
};
// http://localhost:3000/api/contact/getall 
// http://localhost:3000/api/contact/add 