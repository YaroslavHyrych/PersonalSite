module.exports = function(grunt) {
    grunt.initConfig({
        //concat: {
        //    js: {
        //        src: [
        //            ''
        //        ],
        //        dest: 'webapp/js/vendor.js'
        //    },
        //    css: {
        //        src: [
        //            ''
        //        ],
        //        dest: 'webapp/css/vendor.css'
        //    }
        //},
        uglify: {
            build: {
                src: 'resources/javascript/app.js',
                dest: 'webapp/js/app.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'resources/images/',
                    src: ['*.{png,jpg,JPG,gif}'],
                    dest: 'webapp/img'
                }]
            }
        },
        sass: {
            debug: {
                options: {
                    style: 'nested'
                },
                files: {
                    'webapp/css/style.css' : 'resources/stylesheet/main.sass'
                }
            },
            release: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'webapp/css/style.css' : 'resources/stylesheet/main.sass'
                }
            }
        },
        jade: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    'webapp/index.html' : 'resources/page/main.jade'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            script: {
                files: ['resources/javascript/*.js'],
                tasks: ['copy:debug'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: 'resources/stylesheet/**/*.sass',
                tasks: ['sass:debug'],
                options: {
                    spawn: false
                }
            },
            jade: {
                files: 'resources/page/*.jade',
                tasks: ['jade'],
                options: {
                    spawn: false
                }
            }
        },
        copy: {
            style: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/skeleton/css/',
                    src: '*.css',
                    dest: 'webapp/css'
                }]
            },
            javascript: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/jquery/dist/',
                    src: 'jquery.min.js',
                    dest: 'webapp/js'
                }]
            },
            debug: {
                files: [{
                    expand: true,
                    cwd: 'resources/javascript/',
                    src: '*.js',
                    dest: 'webapp/js'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['sass', 'jade', 'imagemin', 'uglify', 'copy']);
};