var gulp = require('gulp');
var del = require('del');
var exec = require('child_process').exec;
var nodemon = require('gulp-nodemon');
var stream;

gulp.task('compile-backend', function (done) {
    exec('tsc --sourcemap -p ./src/backend', function (err, stdout, stderr) {
        console.log(stdout);
        done();
    });
});

gulp.task('restart-server', function (done) {
    if (stream) {
        stream.emit('restart', 5);
    }
    done();
});

gulp.task('build-backend-no-clean', gulp.series('compile-backend', 'restart-server'));

gulp.task('watch-backend', function (done) {
    gulp.watch(['src/backend/**/*.ts'], gulp.series('build-backend-no-clean'));
    done();
});

gulp.task('backend', gulp.series('watch-backend', function () {
    stream = nodemon({
        script: 'dist-server/app.js',
        watch: 'dist-server/backend',
        delay: 1000, // milliseconds
    })
        .on('restart', function () {
            console.log('*** Backend restarted ***');
        });
}));