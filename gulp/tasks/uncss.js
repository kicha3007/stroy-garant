module.exports = function () {
    console.log(1);
    $.gulp.task('uncss', function () {

        return $.gulp.src("build/static/css/main.css")
            .pipe($.gp.uncss({

                html: ['static/index.html']
            }))
                .pipe($.gulp.dest('build/static/out/'));
            });


};
