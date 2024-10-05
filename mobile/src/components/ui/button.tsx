import React from 'react';
import { Platform, Pressable, PressableProps, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { colors, typography } from '../../../utils/themes';

type ButtonProps = PressableProps & {
    children?: React.ReactNode

    variant?: 'solid' | 'outlined'

    borderRadius?: number

    width?: number | '100%'
}

const Button = ({ children, variant, style, borderRadius, width, ...props }: ButtonProps) => {
    const { styles } = useStyles(stylesheet);

    const variants = {
        'solid': [styles.solidOuter, styles.solidInner],
        'outlined': [styles.outlinedOuter, styles.outlinedInner],
    };

    return (
        <View style={[styles.wrapper, { borderRadius, width }]}>
            <Pressable
                {...props}
                android_ripple={{ color: 'rgba(0, 0, 0, 0.15)' }}
                style={({ pressed }) => [
                    Platform.select({
                        ios: {
                            backgroundColor: pressed ? 'rgba(0, 0, 0, 0.15)' : 'transparent',
                        },
                    }),
                    styles.defaultOuter,
                    variant ? variants[variant][0] : styles.solidOuter,
                    { borderRadius },
                    style,
                ]}
            >
                <Text style={[
                    styles.defaultInner,
                    variant ? variants[variant].at(1) : styles.solidInner,
                ]}>{children}</Text>
            </Pressable>
        </View>
    );
};

const stylesheet = createStyleSheet({
    wrapper: {
        overflow: 'hidden',
    },
    defaultOuter: {
        paddingVertical: 10,
    },
    defaultInner: {
        fontFamily: typography.semibold,
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
    solidOuter: {
        backgroundColor: colors.primary[500],
    },
    solidInner: {
        color: 'white',
    },
    outlinedOuter: {
        borderWidth: 1,
        borderColor: colors.primary[500],
    },
    outlinedInner: {
        color: colors.primary[500],
    },
});

export default Button;
