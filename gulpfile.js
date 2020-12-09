"use strict";

// *********************************************************************
// Libs config
// *********************************************************************
const browsersync = require("browser-sync").create();
const del = require("del");
const gulp = require("gulp");
const merge = require("merge-stream");

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });

  done();
}


function browserSyncReload(done) {
  browsersync.reload();
  done();
}


function clean() {
  return del(["./vendor/"]);
}


function modules() {
  var bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
    .pipe(gulp.dest('./vendor/bootstrap'));

  var jquery = gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'));

  var jqueryEasing = gulp.src('./node_modules/jquery.easing/*.js')
    .pipe(gulp.dest('./vendor/jquery-easing'));

  return merge(bootstrap, jquery, jqueryEasing);
}


function watchFiles() {
  gulp.watch("./**/*.css", browserSyncReload);
  gulp.watch("./**/*.html", browserSyncReload);
}


const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor);
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));


exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;


// *********************************************************************
// Vue config
// *********************************************************************
/*
const { src, dest, parallel } = require('gulp');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const vueLoaderPlugin = require('vue-loader/lib/plugin');


function html () {
  return src('src/*.html')
    .pipe(dest('public/'));
}


function vue () {
  return src('node_modules/vue/dist/vue.min.js')
    .pipe(dest('public/assets/js'));
}


function vuerouter () {
  return src('node_modules/vue-router/dist/vue-router.min.js')
    .pipe(dest('public/assets/js'));
}


function js () {
  return src('src/js/index.js')
    .pipe(named())
    .pipe(webpack({
      mode: 'production',
      output: {
        filename: '[name].js'
      },
      module: {
        rules: [
          {
            test:/\.vue$/,
            loader: 'vue-loader'
          },
          {
            test:/\.js$/,
            loader: 'babel-loader'
          },
          {
            test:/\.css$/,
            use: ['vue-style-loader', 'css-loader']
          },
        ]
      },
      plugins: [
        new vueLoaderPlugin()
      ],
      resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
      }
    }))
    .pipe(dest('public/assets/js'))
}

exports.default = parallel(html, vue, js, vuerouter);
*/