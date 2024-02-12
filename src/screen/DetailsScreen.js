import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Axios from 'axios';

const DetailsScreen = ({ route }) => {
  const { cocktail } = route.params;
  const [cocktailDetails, setCocktailDetails] = useState(null);
  const [ingredientDetails, setIngredientDetails] = useState(null);

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const response = await Axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.idDrink}`);
        setCocktailDetails(response.data.drinks[0]);
        setIngredientDetails(response.data.drinks[0]);
      } catch (error) {
        console.error('Error fetching cocktail details:', error);
      }
    };

    fetchCocktailDetails();
  }, [cocktail.idDrink]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cocktailDetails && (
        <View style={styles.detailsContainer}>
          <Image
            source={{ uri: cocktailDetails.strDrinkThumb }}
            style={styles.image}
          />
          <Text style={styles.title}>{cocktailDetails.strDrink}</Text>
          <Text style={styles.instructions}>{cocktailDetails.strInstructions}</Text>
        </View>
      )}

      {ingredientDetails && (
        <View style={styles.ingredientsContainer}>
          <Text style={styles.title}>Ingrédients:</Text>
          {Object.keys(ingredientDetails)
            .filter(key => key.startsWith('strIngredient') && ingredientDetails[key])
            .map((key, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={styles.ingredientText}>{ingredientDetails[key]}</Text>
                <Image
                  source={{ uri: `https://www.thecocktaildb.com/images/ingredients/${ingredientDetails[key]}-Medium.png` }}
                  style={styles.ingredientImage}
                />
              </View>
            ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  ingredientsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredientText: {
    fontSize: 16,
    marginRight: 10,
  },
  ingredientImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default DetailsScreen;
