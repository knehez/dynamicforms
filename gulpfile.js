var gulp = require('gulp');
var del = require('del');
var fs = require('fs');
var exec = require('child_process').exec;
var nodemon = require('gulp-nodemon');
var stream;

gulp.task('clean-backend', function (done) {
    const dir = 'dist-server';
    del([dir]);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    done();
});

gulp.task('compile-backend', function (done) {
    exec('tsc --sourcemap -p ./src/backend', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
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

gulp.task('backend', gulp.series('clean-backend', 'compile-backend', 'watch-backend', function () {
    stream = nodemon({
        script: 'dist-server/src/backend/app.js',
        watch: 'dist-server/',
        delay: 1000, // milliseconds
    })
        .on('restart', function () {
            console.log('*** Backend restarted ***');
        });
}));