const gulp = require('gulp');
const webpack = require('webpack');
const opn = require('opn');
const nodemon = require('gulp-nodemon');

const ssrWebpackConf = require('./build/webpack.ssr.config');
const clientWebpackConf = require('./build/webpack.config');

ssrWebpackConf.watch = true;
clientWebpackConf.watch = true;

const errFun = (err, stats) => {
    if (err) {
        console.error(err.stack || err);

        if (err.details) {
          console.error(err.details);
        }

        return;
    }
    
    const info = stats.toJson();
    
    if (stats.hasErrors()) {
        console.error(info.errors);
    }
    
    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }
}

const compile = (conf, done) => webpack(conf, (err, stats) => {
    if (err || stats.hasErrors()) {
        errFun(err, stats);
        return;
    }
      
    done();
})

gulp.task('default', gulp.series(
    gulp.parallel(
        done => compile(ssrWebpackConf, done),
    
        done => compile(clientWebpackConf, done),
    ),

    done => {
        nodemon({
            script: './server_render/index.js',
            "ignore": [
                '*.test.js', 
                'node_modules/*',
                '*.map'
            ],
        });
        
        done();
    },

    done => {
        opn(`http://localhost:${process.env.PORT}/`);

        done();
    },
));