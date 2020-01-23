import uuid from 'uuid/v4';

const restaurant = {
  id: uuid(),
  name: 'Barrio Fiesta',
  address: '170 - 6800 Memorial Dr E, Calgary, AB T2A 6V3',
  coverPhoto:
    'https://momofuku-assets.s3.amazonaws.com/uploads/sites/38/2019/07/IMG3127-1440x590.jpg',
  foods: [
    {
      id: uuid(),
      name: 'Pork Adobo',
      image:
        'https://salu-salo.com/wp-content/uploads/2015/04/Pork-Adobo-3.jpg',
      category: 'Main Dish',
      featured: true,
      price: 15.99
    },
    {
      id: uuid(),
      name: 'Sinanglao',
      image:
        'https://i0.wp.com/www.angsarap.net/wp-content/uploads/2017/10/Sinanglaw.jpg?ssl=1',
      category: 'Soup',
      featured: true,
      price: 12
    },
    {
      id: uuid(),
      name: 'Pork Sisig',
      image:
        'https://i.pinimg.com/474x/63/ae/17/63ae17e98e2019da608cb8fe1c3efddb--filipino-recipes-filipino-food.jpg',
      category: 'Appetizers',
      featured: true,
      price: 10.99
    }
  ]
};

export default restaurant;
