const path = require('path');
const webpack = require('webpack'); // so we can use the built-in 'DefinePlugin'
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CSSExtract = new ExtractTextPlugin('styles.css');

// process.env.NODE_ENV is set automatically on heroku (to 'production')
// how do we set up in our test environment? either 'production', 'test' or 'undefined'
// which means we are in 'development'. We will need to use a npm module
// to be able to set this cross-environment: npm-cross-env (in the package.json)

// NOTE ABOUT .env VARIABLES
// -------------------------
// For security reasons, node environment variables are
// not made available to the browser javascript. So we need
// to use the built-in webpack plugin 'DefinePlugin' which
// will help pass the .env variables to the live javascript
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test'});
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development'});
}

// .env VARIABLES ON HEROKU
// ------------------------
// process.env.NODE_ENV is already set for us on heroku as 'production'
// but heroku doesn't know about other variables like the
// Firebase settings... so they have to be setup manually, using
// the heroku command line.
// `heroku config` prints out all environment variables
// to set a config, use:
// `heroku config:set KEY=value`
// use `heroku config:unset KEY` to remove a key
// set multiple variable with a space in between:
// `heroku config:set KEY_1=value1 KEY_2=value2 KEY_3=value3`

module.exports = (env) => {
    const isProduction = env === 'production';

    return {
        entry: ['babel-polyfill', './src/app.js'],
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY), // We use JSON.stringify to wrap the value with quotes otherwise it would not be read
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }
}
