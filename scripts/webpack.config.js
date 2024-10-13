let path = require('path');

module.exports = {
    entry: [
        './src/index.ts',
        './src/sharedData.ts',
        './src/render.ts',
        './src/interact.ts'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            { 
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    }
                ]
            }
        ]
    },
    externals: {
        'noisejs': 'noisejs'
    }
}