# webpack-static-website-config
Webpack example configuration for static website (JS, typescript, CSS, Sass, templating, analyzing CSS url / html images)
All dependencies can be downloaded and included from npm/yarn.

## Using JS/typescript entry point to load needed JS from node_modules directly
* split needed JS into appJS & vendorsJS
* Common Chunk plugin split JS between appJS entry point & vendorsJS.

## Using 2 entry points to load application CSS & vendors CSS (from node_modules)
* appCSS entry point
* vendorsCSS entry point
* CSS files are bundle as JS module that are included automatically as <style> markups
* required fonts will be picked up automatically and included into the bundle

## Sass loader is included, thus sass files can be required and will be compiled / included automatically
* Bootstrap Sass version is compiled & included 

## Generate HTML templates including JS, styles, checking image locations.
* HtmlWebpackPlugin with a template generate an HTML file. 
* Insert styles & script inside.
* Images are detected throw HTML img:src and compressed.

## HTML files are processed as template allowing usage of partials
* https://github.com/emaphp/underscore-template-loader

## Command lines 
`yarn install`
### production (minify JS, CSS, HTML, compress images)
`yarn build`
### start development server (start web server, deploy your site, hot module reload)
`yarn start`
