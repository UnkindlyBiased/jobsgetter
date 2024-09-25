import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export const AboutScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Some information</Text>
            <Button
                title="Go back"
                onPress={() => navigation.navigate('Loading')} />
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
