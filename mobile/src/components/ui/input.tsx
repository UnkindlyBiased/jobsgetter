import * as React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type InputProps = Omit<TextInputProps, 'enabled' | 'selectTextOnFocus'> & {
    disabled?: boolean,

    size?: 'sm' | 'md' | 'lg'
}

const Input = ({ style, size, disabled, ...props }: InputProps, ref: React.Ref<TextInput>) => {
    const { styles: mainStyles } = useStyles(stylesheet);
    const { styles: sizedStyles } = useStyles(sizedStylesheet);

    const [isFocused, setIsFocused] = React.useState(false);

    return (
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
                isFocused && mainStyles.focused,
                size ? sizedStyles[size] : sizedStyles.md,
            ]} />
    );
};

const stylesheet = createStyleSheet({
    input: {
        borderWidth: 1,
        borderColor: '#97c3f0',
        borderRadius: 12,

        fontSize: 15,

        backgroundColor: 'white',
        elevation: 3,
    },
    focused: {
        borderColor: '#0b6bcb',
        borderWidth: 2,
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

export default React.forwardRef(Input);
