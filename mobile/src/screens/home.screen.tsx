import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Hello, ReactNative</Text>
            <Button
               title="Navigate"
               onPress={() => navigation.navigate('About')} />
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
