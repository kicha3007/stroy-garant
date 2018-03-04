global.$ = {
    gulp : require("gulp"),
    gp : require("gulp-load-plugins")(),
    bs : require('browser-sync').create(),
    sg : require('smart-grid'),
    gcmq : require('gulp-group-css-media-queries'),

    path: {
        tasks: require("./gulp/config/tasks.js")
    }
};

$.path.tasks.forEach(function (taskPath) {
    require(taskPath)();
});


$.gulp.task("default", $.gulp.series(
    $.gulp.parallel("pug", "sass", "scripts", "imagemin"),
    $.gulp.parallel("watch", "serve")
));


