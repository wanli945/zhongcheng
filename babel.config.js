let transformRemoveConsolePlugin = []
if (process.env.NODE_ENV === 'production') {
    // 去除 console
    transformRemoveConsolePlugin = ['transform-remove-console']
}

module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
    ],
    plugins: [...transformRemoveConsolePlugin],
}
