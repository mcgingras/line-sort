module.exports = {
    entry: [
      './src/main.js',
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    }
}