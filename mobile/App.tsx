import React from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { AuthStack } from './src/stacks/auth.stack';
import './unistyles';

const App = () => {
    const { styles } = useStyles(stylesheet);

    return (
        <SafeAreaView style={styles.android}>
            <NavigationContainer>
                <AuthStack />
            </NavigationContainer>
        </SafeAreaView>
    );
};

const stylesheet = createStyleSheet({
    android: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
});

export default App;
