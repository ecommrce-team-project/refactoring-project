require('dotenv').config({ path: '../utils/.env' });
const { sequelize, Estate, Category } = require('../database/index.js');

const seedEstates = async () => {
  try {
    // Fetch categories from the database
    const categories = await Category.findAll();

    // Map categories to their respective estates
    const estates = [
      // Studios and 1 Bedrooms
      {
        title: 'Modern Studio Apartment',
        description: 'A cozy and modern studio apartment in the heart of the city.',
        price: 1200.0,
        location: 'Downtown',
        bathrooms: 1,
        bedrooms: 1,
        area: 45.0,
        image_url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/438136862.jpg?k=2ff6745341f4c8d28bc02a5336c11cf2daf4dcd2b7a59969c6288096f550c455&o=&hp=1',
        category_id: categories.find(c => c.name === 'Studios and 1 Bedrooms').id,
      },
      {
        title: 'Chic City Loft',
        description: 'Stylish 1-bedroom loft with industrial design, exposed brick walls, and high ceilings.',
        price: 2500.0,
        location: 'Downtown',
        bathrooms: 1,
        bedrooms: 1,
        area: 70.0,
        image_url: 'https://i.pinimg.com/736x/89/17/0e/89170ed5a73ae6026dee23ddd15363dd.jpg',
        category_id: categories.find(c => c.name === 'Studios and 1 Bedrooms').id,
      },
      {
        title: 'Compact Urban Studio',
        description: 'A small yet functional studio perfect for urban living.',
        price: 800.0,
        location: 'City Center',
        bathrooms: 1,
        bedrooms: 1,
        area: 30.0,
        image_url: 'https://www.decorilla.com/online-decorating/wp-content/uploads/2023/08/Contemporary-small-studio-design-scaled.jpeg',
        category_id: categories.find(c => c.name === 'Studios and 1 Bedrooms').id,
      },
      {
        title: 'Bright and Airy Studio',
        description: 'A bright studio with large windows and modern decor.',
        price: 1000.0,
        location: 'Suburbs',
        bathrooms: 1,
        bedrooms: 1,
        area: 40.0,
        image_url: 'https://hommes.studio/wp-content/uploads/capa-2.jpeg',
        category_id: categories.find(c => c.name === 'Studios and 1 Bedrooms').id,
      },

      // Apartments
      {
        title: 'Luxury Apartment',
        description: 'A spacious luxury apartment with stunning city views.',
        price: 2500.0,
        location: 'Uptown',
        bathrooms: 2,
        bedrooms: 3,
        area: 120.0,
        image_url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/485095588.jpg?k=4f172e20bd0fd7427c882a45cca69839f176ba203f00a0a4b5135c6331552444&o=&hp=1',
        category_id: categories.find(c => c.name === 'Apartments').id,
      },
      {
        title: 'Modern Family Apartment',
        description: 'A family-friendly apartment with a large living area.',
        price: 2000.0,
        location: 'Suburbs',
        bathrooms: 2,
        bedrooms: 3,
        area: 100.0,
        image_url: 'https://www.home-designing.com/wp-content/uploads/2018/09/modern-living-room-1-1024x768.jpg',
        category_id: categories.find(c => c.name === 'Apartments').id,
      },
      {
        title: 'City Center Apartment',
        description: 'A centrally located apartment with easy access to amenities.',
        price: 1800.0,
        location: 'City Center',
        bathrooms: 1,
        bedrooms: 2,
        area: 80.0,
        image_url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM1NDM3OTk2MzY5NDM1MjI5NQ==/original/1442900d-50b5-4594-92d0-57837708802f.jpeg?im_w=720',
        category_id: categories.find(c => c.name === 'Apartments').id,
      },
      {
        title: 'Penthouse Apartment',
        description: 'A luxurious penthouse with a private rooftop terrace.',
        price: 5000.0,
        location: 'Downtown',
        bathrooms: 3,
        bedrooms: 4,
        area: 200.0,
        image_url: 'https://imageio.forbes.com/specials-images/imageserve/6430496393cdbe0716b0e672/Rooftop-Patio-133-West-22nd-Street--PHB-NEW-YORK--New-York--United-States/960x0.jpg?format=jpg&width=960',
        category_id: categories.find(c => c.name === 'Apartments').id,
      },

      // Villas and Houses
      {
        title: 'Elegant Villa',
        description: 'A beautiful villa with a private pool and garden.',
        price: 5000.0,
        location: 'Suburbs',
        bathrooms: 4,
        bedrooms: 5,
        area: 300.0,
        image_url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/166987636.jpg?k=6bcd5e1c1fb7cf2c86a1f6dfd7853ac6e4136d0afd4c724e5bde2b0299d2a415&o=&hp=1',
        category_id: categories.find(c => c.name === 'Villas and Houses').id,
      },
      {
        title: 'Cozy Country House',
        description: 'A charming house in the countryside with a large backyard.',
        price: 3500.0,
        location: 'Countryside',
        bathrooms: 3,
        bedrooms: 4,
        area: 250.0,
        image_url: 'https://www.galbraithgroup.com/media/ehikxypz/pierhill-house-1-large.jpg',
        category_id: categories.find(c => c.name === 'Villas and Houses').id,
      },
      {
        title: 'Modern Villa',
        description: 'A sleek and modern villa with state-of-the-art amenities.',
        price: 6000.0,
        location: 'Uptown',
        bathrooms: 5,
        bedrooms: 6,
        area: 400.0,
        image_url: 'https://aihkcdnstoragep01.blob.core.windows.net/pgl-release/Images/LuxuryImages/4266536/IMG_941.jpg',
        category_id: categories.find(c => c.name === 'Villas and Houses').id,
      },
      {
        title: 'Beachfront Villa',
        description: 'A luxurious villa with direct beach access.',
        price: 8000.0,
        location: 'Coastal Area',
        bathrooms: 4,
        bedrooms: 5,
        area: 350.0,
        image_url: 'https://www.firefly-collection.com/wp-content/uploads/2018/05/Villa-Bianchi-Luxury-Summer-Villa-Anguilla-Caribbean-15-2.jpg',
        category_id: categories.find(c => c.name === 'Villas and Houses').id,
      },

      // Penthouses
      {
        title: 'Luxury Penthouse',
        description: 'A high-end penthouse with breathtaking city views.',
        price: 10000.0,
        location: 'Downtown',
        bathrooms: 4,
        bedrooms: 5,
        area: 400.0,
        image_url: 'https://www.mohd.it/wp-content/uploads/2023/07/505f7e32-d2fe-4dae-8f4a-48564f3e-scaled.jpg',
        category_id: categories.find(c => c.name === 'Penthouses').id,
      },
      {
        title: 'Modern Penthouse',
        description: 'A sleek penthouse with state-of-the-art amenities.',
        price: 11000.0,
        location: 'Uptown',
        bathrooms: 4,
        bedrooms: 5,
        area: 420.0,
        image_url: 'https://blog.sothebysrealty.ae/hubfs/Imported_Blog_Media/e265658b-845d-497b-8bd4-2ebdae0be940-1.jpg',
        category_id: categories.find(c => c.name === 'Penthouses').id,
      },
      {
        title: 'Beachfront Penthouse',
        description: 'A luxurious penthouse with direct beach access.',
        price: 15000.0,
        location: 'Coastal Area',
        bathrooms: 5,
        bedrooms: 6,
        area: 500.0,
        image_url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/487956081.jpg?k=0a2225dc02b02bf43f60076ac55f8d4e442d6a1293b3968c4afa263b6257894c&o=&hp=1',
        category_id: categories.find(c => c.name === 'Penthouses').id,
      },

      // Daily Rental Buildings
      {
        title: 'Daily Rental Building 1',
        description: 'A fully furnished building available for daily rentals.',
        price: 300.0,
        location: 'Tourist Area',
        bathrooms: 1,
        bedrooms: 1,
        area: 50.0,
        image_url: 'https://leasing.dmcihomes.com/blog/wp-content/uploads/2019/08/staycations-and-short-term-rent.webp',
        category_id: categories.find(c => c.name === 'Daily Rental Buildings').id,
      },
      {
        title: 'Daily Rental Building 2',
        description: 'A modern building for short-term stays.',
        price: 400.0,
        location: 'City Center',
        bathrooms: 2,
        bedrooms: 2,
        area: 80.0,
        image_url: 'https://blog.metahomes.net/wp-content/uploads/2023/08/Short-term-vs.-Long-term-Living.jpg',
        category_id: categories.find(c => c.name === 'Daily Rental Buildings').id,
      },
      {
        title: 'Daily Rental Building 3',
        description: 'A cozy building for tourists and travelers.',
        price: 350.0,
        location: 'Suburbs',
        bathrooms: 1,
        bedrooms: 1,
        area: 60.0,
        image_url: 'https://www.thehousedesigners.com/images/plans/APS/bulk/7424/A504-Front-Rendering-Close-Shot-FINAL-With-Shadows.jpg',
        category_id: categories.find(c => c.name === 'Daily Rental Buildings').id,
      },
      {
        title: 'Daily Rental Building 4',
        description: 'A luxurious building for short-term rentals.',
        price: 500.0,
        location: 'Uptown',
        bathrooms: 2,
        bedrooms: 2,
        area: 100.0,
        image_url: 'https://lussostay.com/wp-content/uploads/2023/05/pexels-max-rahubovskiy-7031407-scaled.jpg',
        category_id: categories.find(c => c.name === 'Daily Rental Buildings').id,
      },

      // Vacation Homes
      {
        title: 'Beachfront Vacation Home',
        description: 'A stunning vacation home with direct beach access.',
        price: 4000.0,
        location: 'Coastal Area',
        bathrooms: 3,
        bedrooms: 4,
        area: 180.0,
        image_url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/538887023.jpg?k=2708a87aecf1835f143276f8fad969569d903b121d9c41072ac4602ec49d3a40&o=&hp=1',
        category_id: categories.find(c => c.name === 'Vacation Homes').id,
      },
      {
        title: 'Mountain Vacation Home',
        description: 'A cozy cabin in the mountains with stunning views.',
        price: 3500.0,
        location: 'Mountain Area',
        bathrooms: 2,
        bedrooms: 3,
        area: 150.0,
        image_url: 'https://escapetoblueridge.icnd-cdn.com/images/blog/Candlestick%20Cabin%20fall.jpg',
        category_id: categories.find(c => c.name === 'Vacation Homes').id,
      },
      {
        title: 'Lakefront Vacation Home',
        description: 'A beautiful home by the lake, perfect for relaxation.',
        price: 4500.0,
        location: 'Lake Area',
        bathrooms: 3,
        bedrooms: 4,
        area: 200.0,
        image_url: 'https://png.pngtree.com/background/20250124/original/pngtree-dreamy-water-front-house-views-for-the-perfect-relaxation-background-quiet-picture-image_16031756.jpg',
        category_id: categories.find(c => c.name === 'Vacation Homes').id,
      },
      {
        title: 'Countryside Vacation Home',
        description: 'A charming home in the countryside with a large backyard.',
        price: 3000.0,
        location: 'Countryside',
        bathrooms: 2,
        bedrooms: 3,
        area: 180.0,
        image_url: 'https://content.knightfrank.com/property/exe012339077/images/02cf5f27-af85-4df6-9a9d-2910cbd3d09a-0.jpg?cio=true&w=1200',
        category_id: categories.find(c => c.name === 'Vacation Homes').id,
      },
    ];

    // Seed estates into the database
    await sequelize.sync({ alter: false }); // Ensure the database is ready
    await Estate.bulkCreate(estates);
    console.log('Estates seeded successfully!');
  } catch (error) {
    console.error('Error seeding estates:', error);
  } finally {
    await sequelize.close();
  }
};

seedEstates();