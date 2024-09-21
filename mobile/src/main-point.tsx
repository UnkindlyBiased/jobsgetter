import React, { StyleSheet, Text, View } from 'react-native';

export const MainPoint = () => {
    return (
        <View style={styles.container}>
            <Text>Main point of JobsGetter</Text>
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
