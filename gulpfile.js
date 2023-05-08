const { src, dest, series, watch } = require(`gulp`),
    cssLint = require(`gulp-stylelint`),
    babel = require(`gulp-babel`),
    htmlCompressor = require(`gulp-htmlmin`),
    htmlValidator=require(`gulp-html`);
    jsCompressor = require(`gulp-uglify`),
    jsLint = require(`gulp-eslint`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let browserChoice = `default`;

let validateHTML = () => {
    return src([`dev/html/*.html`, `dev/html/**/*.html`])
        .pipe(htmlValidator(undefined));
};

let lintJS = () => {
    return src(`dev/js/*.js`)
        .pipe(jsLint())
        .pipe(jsLint.formatEach(`compact`));
};


let lintCSS = ()=>{
    return src(`dev/css/style.css`)
        .pipe(cssLint({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]

        }));
};

let transpileJSForDev = () => {
    return src(`dev/js/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};
let transpileJSForProd = () => {
    return src(`dev/js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let compressHTML = () =>{
    return src(`dev/html/*.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let compileCSSForProd = () => {
    return src(`dev/css/*.css`)
        .pipe(cssLint({
            outputStyle: `compressed`,
            precision: 10
        })
            .pipe(dest(`prod/css`)));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                './',
                `dev`,
                `dev/html`
            ]
        }
    });
    watch(`dev/js/*.js`, series(lintJS))
        .on(`change`,reload); };

watch(`dev/css/*.css`, (lintCSS))
    .on(`change`, reload);

exports.default = series(
    lintJS,
    lintCSS,
    serve,
    transpileJSForDev,
    validateHTML,
);

exports.build= series(
    compressHTML,
    compileCSSForProd,
    transpileJSForProd
);
