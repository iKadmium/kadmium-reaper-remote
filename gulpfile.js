const gulp = require('gulp');
const childProcess = require('child_process');
const clean = require('gulp-clean');

function exec(command, cwd = ".")
{
    return new Promise((resolve, reject) =>
    {
        childProcess.exec(command, { cwd: cwd, maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) =>
        {
            if (error)
            {
                console.error(stderr);
                reject(error);
            }
            else
            {
                console.log(stdout);
                resolve();
            }
        });
    });
}

function buildBackend()
{
    return exec("dotnet publish -o dist -r win10-x64 -c Release");
}

function copyBackend()
{
    return gulp
        .src("kadmium-reaper-remote.WebAPI/dist/**.*")
        .pipe(gulp.dest('dist'))
}

function testFrontend()
{
    return exec("ng test --watch=false", "kadmium-reaper-remote.WebUI");
}

function buildFrontend()
{
    return exec("ng build -c production --output-path dist", "kadmium-reaper-remote.WebUI");
}

function copyFrontend()
{
    return gulp
        .src("kadmium-reaper-remote.WebUI/dist/**.*")
        .pipe(gulp.dest('dist/wwwroot'))
}

function cleanDist()
{
    return gulp
        .src('dist/**/*', { read: false, allowEmpty: true })
        .pipe(clean());
}

function cleanBackendDist()
{
    return gulp
        .src('kadmium-reaper-remote.WebAPI/dist/**/*', { read: false, allowEmpty: true })
        .pipe(clean());
}

function cleanFrontendDist()
{
    return gulp
        .src('kadmium-reaper-remote.WebUI/dist/**/*', { read: false, allowEmpty: true })
        .pipe(clean());
}

const tasks = {
    cleanDist,
    cleanBackendDist,
    cleanFrontendDist,
    buildBackend,
    copyBackend,
    testFrontend,
    buildFrontend,
    copyFrontend
}

exports.default = gulp.series(
    cleanDist,
    cleanBackendDist,
    cleanFrontendDist,
    buildBackend,
    copyBackend,
    testFrontend,
    buildFrontend,
    copyFrontend
);