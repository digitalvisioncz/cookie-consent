module.exports = {
    env: {browser: true},
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    extends: ['@digitalvisioncz/eslint-config-react', '@digitalvisioncz/eslint-config-typescript'],
    rules: {},
    ignorePatterns: ['.eslintrc', '.eslintrc.js'],
};
