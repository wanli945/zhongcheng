module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        "no-unused-vars": 'off',
        "no-empty": "off",
        "vue/no-unused-components": "off",
        "vue/no-unused-vars": "off",
        "vue/valid-v-for": "off",
        "no-prototype-builtins": 'off',
        'no-global-assign': 'off',
        "no-undef": "off",
        "no-unsafe-finally": "off"
    }
}
