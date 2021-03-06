module.exports = {
    devtool: 'inline-source-map',
    entry: './src/index.tsx',
    output: {
        path: __dirname + '/public',
        filename: 'build/app.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, 
                loader: 'ts-loader'
            },
            {
              test: /\.js$/,
              loader: [
                  'babel-loader'
                ],
              exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader', 'css-loader'
                ]
       
            },
        ]
    }
}
