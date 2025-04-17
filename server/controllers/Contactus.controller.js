const {Contact}=require("../database/index.js")

module.exports = {
    getAllcontacts: async (req, res) => {
      try{
        const contact= await Contact.findAll()
        res.json(contact)
      }catch(error){
        console.error('Database error:', error);
      }
    },
      addcontact :async (req, res) => {
      try {
        const newContact = await Contact.create(req.body);
        console.log('New contact submitted:', newContact); 
        res.status(201).json({ message: 'Contact message sent successfully' });
      } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    }
    
  };
