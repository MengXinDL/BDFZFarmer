let path = require('path');

module.exports = {
    entry: [
        './src/index.ts',
        './src/sharedData.ts',
        './src/render.ts',
        './src/interact.ts',

        './src/notice.tsx'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.tsx'],
        alias: {
            'statics': path.resolve(__dirname, '../statics'),
        }
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
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-typescript'],
                        },
                    },
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ]
    },
    externals: {
        'noisejs': 'noisejs',
    }
}