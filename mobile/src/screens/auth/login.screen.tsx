import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import Input from '../../components/ui/input';

export const LoginScreen = () => {
    const { styles } = useStyles(stylesheet);
    const [value, setValue] = useState('');

    return (
        <View style={styles.container}>
            <Input onChangeText={text => setValue(text)} placeholder="Username" />
            <Text style={styles.text}>{value}</Text>
        </View>
    );
};

const stylesheet = createStyleSheet({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 15,

        gap: 10,
    },
    text: {
        fontFamily: 'Inter-Medium',
    },
});
