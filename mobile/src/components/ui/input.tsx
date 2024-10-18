import React, { forwardRef, useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { colors, typography } from '../../../utils/themes';

type InputProps = Omit<TextInputProps, 'enabled' | 'selectTextOnFocus'> & {
    disabled?: boolean,

    size?: 'sm' | 'md' | 'lg'
}

const InputWithoutRef = ({ style, size, disabled, ...props }: InputProps, ref: React.Ref<TextInput>) => {
    const { styles: mainStyles } = useStyles(stylesheet);
    const { styles: sizedStyles } = useStyles(sizedStylesheet);

    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[
            mainStyles.wrapper,
            isFocused && mainStyles.wrapperFocused,
        ]}>
            <TextInput
                {...props}
                ref={ref}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                editable={!disabled}
                selectTextOnFocus={!disabled}
                style={[
                    style,
                    mainStyles.input,
                    disabled && mainStyles.disabled,
                    isFocused && mainStyles.focused,
                    size ? sizedStyles[size] : sizedStyles.md,
                ]} />
        </View>
    );
};

const stylesheet = createStyleSheet({
    wrapper: {
        paddingVertical: 4,
    },
    wrapperFocused: {
        paddingVertical: 3,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.primary[300],
        borderRadius: 12,

        fontSize: 15,

        backgroundColor: 'white',
        elevation: 3,

        fontFamily: typography.regular,
    },
    focused: {
        borderColor: colors.primary[500],
        borderWidth: 2,
    },
    disabled: {
        borderColor: colors.neutral[600],
    },
});

const sizedStylesheet = createStyleSheet({
    sm: {
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    md: {
        paddingHorizontal: 14,
        paddingVertical: 9,
    },
    lg: {
        paddingHorizontal: 18,
        paddingVertical: 14,
    },
});

export const Input = forwardRef(InputWithoutRef);
