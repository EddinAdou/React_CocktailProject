import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screen/HomeScreen';
import DetailsScreen from './src/screen/DetailsScreen';
import FavorisScreen from './src/screen/FavorisScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  const [favoris, setFavoris] = useState([]);

  const addToFavorites = (cocktail) => {
    const isFavorite = favoris.some((fav) => fav.idDrink === cocktail.idDrink);
    if (!isFavorite) {
      setFavoris([...favoris, cocktail]);
    }
  };

  const removeFromFavorites = (cocktail) => {
    const updatedFavorites = favoris.filter((fav) => fav.idDrink !== cocktail.idDrink);
    setFavoris(updatedFavorites);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="home" component={HomeStack} />
        <Tab.Screen name="Favoris">
          {() => <FavorisScreen favoris={favoris} removeFromFavorites={removeFromFavorites} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
