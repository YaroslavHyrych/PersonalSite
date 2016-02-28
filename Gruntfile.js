module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dist: {
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
                //tasks: ['concat'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: 'resources/stylesheet/**/*.sass',
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'jade']);
};