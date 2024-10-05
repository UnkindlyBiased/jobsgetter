export const lightTheme = {
    colors: {
        typography: '#000000',
        background: '#ffffff',
    },
    margins: {
        sm: 2,
        md: 4,
        lg: 8,
        xl: 12,
    },
} as const;

export const darkTheme = {
    colors: {
        typography: '#ffffff',
        background: '#000000',
    },
    margins: {
        sm: 2,
        md: 4,
        lg: 8,
        xl: 12,
    },
} as const;

export const colors = {
    primary: {
        50: '#edf5df',
        100: '#e3effb',
        200: '#c7dff7',
        300: '#97c3f0',
        400: '#4393e4',
        500: '#0b6bcb',
        600: '#185ea5',
        700: '#12467b',
        800: '#0a2744',
        900: '#051423',
    },
    neutral: {
        600: '#9fa6ad',
    },
};

export const typography = {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semibold: 'Inter-SemiBold',
};
