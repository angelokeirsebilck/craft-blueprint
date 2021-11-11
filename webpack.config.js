const Encore = require('@symfony/webpack-encore');
// var CopyWebpackPlugin = require('copy-webpack-plugin');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

//Encore.configureRuntimeEnvironment('dev'); // will always run as dev (so no minify)

Encore

    // directory where compiled assets will be stored
    .setOutputPath('web/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')


    // .addPlugin(new CopyWebpackPlugin({
    //     patterns: [
    //         { from: "./assets/css", to: "css" },
    //     ],
    // }),)

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     *
     * Each entry will result in one JavaScript file (e.g. site.js)
     * and one CSS file (e.g. site.css) if you JavaScript imports (S)CSS.
     */
    // Main site entry
    .addEntry('app', './assets/js/index.js')

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    // .enableVersioning(Encore.isProduction())

    .configureBabel(function(babelConfig) {
        // add additional presets
        // example
        // babelConfig.presets.push('@babel/preset-flow');
    }, {
        // node_modules is not processed through Babel by default
        // but you can whitelist specific modules to process
        includeNodeModules: ['bootstrap'],
    })

    // enable Sass/SCSS files
    .enableSassLoader()

    // fallback for certain jquery plugins
    // .autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();