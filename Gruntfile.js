module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        js_folder: 'resources/javascript',
        sass_folder: 'resources/stylesheet',
        images_folder: 'resources/images',
        jade_folder: 'resources/page',
        target_folder: 'webapp',
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
                src: '<%= js_folder %>/app.js',
                dest: '<%= target_folder %>/js/app.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%= images_folder %>/',
                    src: ['*.{png,jpg,JPG,gif}'],
                    dest: '<%= target_folder %>/img'
                }]
            }
        },
        sass: {
            debug: {
                options: {
                    style: 'nested'
                },
                files: {
                    '<%= target_folder %>/css/style.css' : '<%= sass_folder %>/main.sass'
                }
            },
            release: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= target_folder %>/css/style.css' : '<%= sass_folder %>/main.sass'
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
                    '<%= target_folder %>/index.html' : '<%= jade_folder %>/main.jade'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            script: {
                files: ['<%= js_folder %>/*.js'],
                tasks: ['copy:debug'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: '<%= sass_folder %>/**/*.sass',
                tasks: ['sass:debug'],
                options: {
                    spawn: false
                }
            },
            jade: {
                files: '<%= jade_folder %>/*.jade',
                tasks: ['jade'],
                options: {
                    spawn: false
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', '<%= js_folder %>/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        copy: {
            style: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/skeleton/css/',
                    src: '*.css',
                    dest: '<%= target_folder %>/css'
                }]
            },
            javascript: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/jquery/dist/',
                    src: 'jquery.min.js',
                    dest: '<%= target_folder %>/js'
                }]
            },
            debug: {
                files: [{
                    expand: true,
                    cwd: 'resources/javascript/',
                    src: '*.js',
                    dest: '<%= target_folder %>/js'
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
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['sass:release', 'jade', 'imagemin', 'jshint', 'uglify', 'copy:style', 'copy:javascript']);
};