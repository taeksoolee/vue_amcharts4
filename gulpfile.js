// gulp load (gulp modules 호출)
var gulp = require('gulp'); // Gulp 의 concat 패키지 로드
var concat = require('gulp-concat'); // Gulp.task()를 사용해 gulp-concat 업무 수행을 정의
var uglify = require('gulp-uglify');
var strip = require('gulp-strip-comments');
var removeEmptyLines = require('gulp-remove-empty-lines');
var minify = require('gulp-minify');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
var promise = require('gulp-promise');

// default concat build
gulp.task('concat:js', function () {
    console.log('gulp >> run concat:js');
    return (
        gulp
            // js 하위 디렉터리 내의 모든 자바스크립트 파일을 가져온다.
            .src(['src/components/chart/**/*.js', 'src/components/chart/*js'])
            // 상단에서 참조한 concat 모듈을 호출하고 병합할 파일네이밍을 정의
            .pipe(concat('combined.js'))
            .pipe(
                babel({
                    presets: ['@babel/env'],
                }),
            )
            // .pipe(uglify())
            .pipe(removeEmptyLines())
            .pipe(minify())
            .pipe(strip())
            // 위에서 수행한 task 를 배포지(dist)에 파일을 생성한다.
            .pipe(gulp.dest('dist/'))
    );
});

gulp.task('ncsmart:js', function () {
    console.log('gulp >> run ncsmart:js');
    return (
        gulp
            // js 하위 디렉터리 내의 모든 자바스크립트 파일을 가져온다.
            .src([
                'src/components/chart/**/*.js',
                'src/components/chart/*js',
                'src/ncsmart/*.js',
            ])
            // 상단에서 참조한 concat 모듈을 호출하고 병합할 파일네이밍을 정의
            .pipe(concat('ncsmart.js'))
            .pipe(
                babel({
                    presets: ['@babel/env'],
                }),
            )
            // .pipe(uglify())
            .pipe(removeEmptyLines())
            .pipe(minify())
            .pipe(strip())
            // 위에서 수행한 task 를 배포지(dist)에 파일을 생성한다.
            .pipe(gulp.dest('dist/'))
    );
});

// $ gulp 명령어만 수행하기 위해 'default' 로 정의, 의존 모듈 concat:js 정의
gulp.task('default', gulp.parallel('concat:js'));

gulp.task('watch', function () {
    gulp.watch(
        [
            'src/components/chart/**/*.js',
            'src/components/chart/*js',
            'src/ncsmart/*.js',
        ],
        gulp.parallel('ncsmart:js'),
    );
});

// test code
gulp.task('test', function () {
    return gulp
        .src(['src/test.js'])
        .pipe(
            babel({
                presets: ['@babel/env'],
            }),
        )
        .pipe(strip())
        .pipe(gulp.dest('dist/'));
});
