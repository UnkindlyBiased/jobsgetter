import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import Input from '../../components/ui/input';
import { typography } from '../../../utils/themes';
import Button from '../../components/ui/button';

export const LoginScreen = () => {
    const { styles } = useStyles(stylesheet);
    const [value, setValue] = useState<string>();

    return (
        <View style={styles.container}>
            <Input onChangeText={text => setValue(text)} placeholder="Username" />
            { value && <Text style={styles.text}>{value}</Text> }
            <Button variant="outlined" borderRadius={10}>Hello</Button>
        </View>
    );
};

const stylesheet = createStyleSheet(theme => ({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
        paddingHorizontal: 15,
        gap: 15,
    },
    text: {
        fontFamily: typography.medium,
        color: theme.colors.typography,
        textAlign: 'center',
    },
}));
