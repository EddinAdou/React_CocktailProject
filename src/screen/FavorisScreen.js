import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FavorisScreen = ({ favoris, removeFromFavorites }) => {
  return (
    <View style={styles.container}>
      <Text>Favoris Screen</Text>
      {favoris.map(cocktail => (
        <View key={cocktail.idDrink}>
          <Text>{cocktail.strDrink}</Text>
          <TouchableOpacity onPress={() => removeFromFavorites(cocktail.idDrink)}>
            <Text>Supprimer des favoris</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavorisScreen;
