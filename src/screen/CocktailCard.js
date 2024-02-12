import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const HeartIcon = styled(MaterialCommunityIcons)`
  margin-right: 10px;
  color: ${props => (props.isFavorite ? '#FF6347' : 'gray')};
`;

const CocktailCard = ({ cocktail, isFavorite, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
            <Text style={styles.title}>{cocktail.strDrink}</Text>
            <View style={styles.likeContainer}>
                <HeartIcon name="heart" size={24} isFavorite={isFavorite} />
                <Text style={styles.likeText}>{isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    title: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    likeText: {
        fontSize: 14,
    },
});

export default CocktailCard;