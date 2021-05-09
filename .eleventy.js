const stringify = require('javascript-stringify').stringify;
const markdown = require('markdown-it')({html:true});
const slugify = require('slugify');
const CleanCSS = require("clean-css");


module.exports = function( eleventyConfig ){

    // Copy the /img directory
    eleventyConfig.addPassthroughCopy("src/assets/img");
    eleventyConfig.addPassthroughCopy("src/assets/styles/*.css*");
    eleventyConfig.addPassthroughCopy("src/assets/fonts");
    eleventyConfig.addPassthroughCopy("src/assets/js");
    eleventyConfig.addPassthroughCopy("src/service-worker.js");
    eleventyConfig.addPassthroughCopy("src/admin");
    eleventyConfig.addPassthroughCopy("src/web.config");
    eleventyConfig.addPassthroughCopy("src/manifest.json");
    
    eleventyConfig.addWatchTarget("./src/assets/styles/src/");
    eleventyConfig.addWatchTarget("./src/assets/js/");

    // Inline Minified CSS
    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
    });

    return {
        dir: { input: 'src', output: 'dist', includes: '_includes' }
    };

}