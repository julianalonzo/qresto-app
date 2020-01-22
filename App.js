import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Restaurant from './screens/Restaurant';

const MainNavigator = createStackNavigator(
  {
    Restaurant
  },
  {
    initialRouteName: 'Restaurant'
  }
);

const App = createAppContainer(MainNavigator);

export default App;
