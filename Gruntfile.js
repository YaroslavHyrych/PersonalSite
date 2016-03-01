module.exports = function(grunt) {
    grunt.initConfig({
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
            //script: {
            //    files: ['resources/javascript/*.js'],
            //    tasks: [''],
            //    options: {
            //        spawn: false
            //    }
            //},
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', ['sass', 'jade', 'imagemin']);
};