import { Button, Platform, StatusBar, StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { createStyleSheet, useStyles } from "react-native-unistyles"
import { NavigationContainer } from "@react-navigation/native"

import './unistyles'

const App = () => {
    const { styles } = useStyles(stylesheet)

    return (
        <NavigationContainer>
            <SafeAreaView style={[styles.container, styles.ios]}>
                <Text style={stylesheet.text}>Hello</Text>
                <Button title="Hello" onPress={() => console.log('hi')} />
            </SafeAreaView>
        </NavigationContainer>
    )
}

const stylesheet = createStyleSheet({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 25,
    },
    ios: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
})

export default App