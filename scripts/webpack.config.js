let path = require('path');

module.exports = {
    entry: [
        './src/save.ts',
        './src/sharedData.ts',
        './src/render.ts',
        './src/interact.ts',
        './src/database.ts',

        './src/notice.tsx',
        './src/index.tsx',
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
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src"),
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                                "@babel/preset-typescript"
                            ]
                        }
                    },
                    "ts-loader"
                ],
            },
        ]
    },
    externalsType: 'window',
    externals: {
        'noisejs': 'Noise',
        'react': 'React',
        'react-dom/client': 'ReactDOM',
        'lz-string': 'LZString',
    }
}