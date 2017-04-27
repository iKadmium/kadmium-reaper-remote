var isDevBuild = process.argv.indexOf('--env.prod') < 0;
var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var merge = require('webpack-merge');
var allFilenamesExceptJavaScript = /\.(?!js(\?|$))([^.]+(\?|$))/;

// Configuration in common to both client-side and server-side bundles
var sharedConfig = {
    resolve: { extensions: ['.js', '.ts'] },
    output: {
        filename: '[name].js',
        publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
    },
    module: {
        rules: [
            { test: /\.ts$/, include: /ClientApp/, use: [{ loader: 'ts-loader', options: { silent: true } }] },
            { test: /\.html$/, use: [{ loader: 'raw-loader' }] },
            { test: /\.css$/, use: ["to-string-loader", "css-loader"] },
            { test: /\.(png|jpg|jpeg|gif|svg)$/, use: [{ loader: 'url-loader', options: { limit: 25000 } }] }
        ]
    },
    node: {
        fs: 'empty'
    }
};

// Configuration for client-side bundle suitable for running in browsers
var clientBundleConfig = merge(sharedConfig, {
    entry: { 'main-client': './ClientApp/boot-client.ts' },
    output: { path: path.join(__dirname, './wwwroot/dist') },
    devtool: isDevBuild ? 'inline-source-map' : false,
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./wwwroot/dist/vendor-manifest.json')
        })
    ].concat(isDevBuild ? [] : [
        // Plugins that apply in production builds only
        new webpack.optimize.UglifyJsPlugin()
    ])
});

module.exports = [clientBundleConfig];
