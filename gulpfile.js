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

async function chrome () {
    browserChoice = `google chrome`;
}


async function firefox () {
    browserChoice = `firefox`;
}


let validateHTML = () => {
    return src([`dev/html/*.html`, `dev/html/**/*.html`])
        .pipe(htmlValidator(undefined));
};

let lintJS = () => {
    return src(`dev/js/app.js`)
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
    let transpileJSForProd = () => {
        return src(`dev/js/*.js`)
            .pipe(babel())
            .pipe(jsCompressor())
            .pipe(dest(`./prod`));
    };

    let compressHTML = () =>{
        return src(`dev/html/*.html`)
            .pipe(htmlCompressor({collapseWhitespace: true}))
            .pipe(dest(`./prod`));
    };

    let compileCSSForProd = () => {
        return src(`/*.css`)
            .pipe(cssLint({
                outputStyle: `compressed`,
                precision: 10
            })
                .pipe(dest(`./prod`)));
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
        watch(`../js/*.js`, series(lintJS))
        .on(`change`,reload); };

watch(`../css/*.css`, (lintCSS))
    .on(`change`, reload);



async function listTasks () {
    let exec = require(`child_process`).exec;

    exec(`gulp --tasks`, function (error, stdout, stderr) {
        if (null !== error) {
            process.stdout.write(`An error was likely generated when invoking ` +
                `the “exec” program in the default task.`);
        }

        if (`` !== stderr) {
            process.stdout.write(`Content has been written to the stderr stream ` +
                `when invoking the “exec” program in the default task.`);
        }

        process.stdout.write(`\n\tThis default task does ` +
            `nothing but generate this message. The ` +
            `available tasks are:\n\n${stdout}`);
    });
}


exports.firefox=series(firefox,serve);
exports.chrome=series(chrome,serve);

    exports.default = series(
    lintJS,
    lintCSS,
    serve,
    );

    exports.build= series(
        compressHTML,
        transpileJSForProd
    )
