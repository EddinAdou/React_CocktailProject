import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [cocktails, setCocktails] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (cocktail) => {
    const isFavorite = favorites.some((fav) => fav.idDrink === cocktail.idDrink);
    if (!isFavorite) {
      setFavorites([...favorites, cocktail]);
    }
  };

  const fetchCocktails = async () => {
    setLoading(true);
    try {
      const response = await Axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail&p=${page}`);
      if (response.data.drinks.length > 0) {
        setCocktails((prevCocktails) => [...prevCocktails, ...response.data.drinks]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCocktails();
  }, []);

  const handlePress = (item) => {
    navigation.navigate('Details', { cocktail: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <Image
        source={{ uri: item.strDrinkThumb }}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.strDrink}</Text>
        <TouchableOpacity onPress={() => addToFavorites(item)}>
          <Text style={styles.addToFavorites}>Ajouter aux favoris</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const handleLoadMore = () => {
    if (!loading && cocktails.length > 0) {
      setPage(prevPage => prevPage + 1);
      fetchCocktails();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cocktails}
        renderItem={renderItem}
        keyExtractor={(item) => item.idDrink}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  card: {
    width: '100%',
    height: 200,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
    marginRight: 10,
  },
  addToFavorites: {
    color: '#fff',
    fontSize: 16,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#ff0066',
  },
});

export default HomeScreen;
