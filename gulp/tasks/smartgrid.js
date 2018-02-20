module.exports = function () {

    const settings = {
        outputStyle: "scss",
        container: {
            maxWidth: "1890px",
            fields: "30px"
        }
    };

    $.gulp.task('grid', function () {
            $.sg("./src/static/scss", settings);
    });

};

