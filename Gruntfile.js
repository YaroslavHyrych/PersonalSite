module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        libs_folder:    'bower_components',
        js_folder:      'resources/javascript',
        sass_folder:    'resources/stylesheet',
        images_folder:  'resources/images',
        jade_folder:    'resources/page',
        target_folder:  'webapp',
        concat: {
            js: {
                src: [
                    '<%= js_folder %>/*.js',
                    '!<%= js_folder %>/app.js'
                ],
                dest: '<%= js_folder%>/app.js'
            },
            libs_css: {
                src: [
                    '<%= libs_folder%>/skeleton/css/skeleton.css',
                    '<%= libs_folder%>/skeleton/css/normalize.css',
                    '<%= libs_folder%>/magnific-popup/dist/magnific-popup.css',
                    '<%= libs_folder%>/jScrollPane/style/jquery.jscrollpane.css'
                ],
                dest: '<%= libs_folder%>/libs.css'
            },
            libs_js: {
                src: [
                    '<%= libs_folder%>/jquery/dist/jquery.min.js',
                    '<%= libs_folder%>/slideout.js/dist/slideout.min.js',
                    '<%= libs_folder%>/jScrollPane/script/jquery.jscrollpane.min.js',
                    '<%= libs_folder%>/jScrollPane/script/jquery.mousewheel.js',
                    '<%= libs_folder%>/magnific-popup/dist/jquery.magnific-popup.min.js'
                ],
                dest: '<%= target_folder%>/js/libs.min.js'
            }
        },
        uglify: {
            release: {
                src: '<%= js_folder %>/app.js',
                dest: '<%= target_folder %>/js/app.min.js'
            }
        },
        cssmin: {
            release: {
                files: [{
                    expand: true,
                    cwd: '<%= libs_folder%>',
                    src: 'libs.css',
                    dest: '<%= target_folder%>/css',
                    ext: '.min.css'
                }]
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
            dev: {
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
            js: {
                files: ['<%= js_folder %>/**/*.js'],
                tasks: ['concat:js', 'copy:dev_js'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: '<%= sass_folder %>/**/*.sass',
                tasks: ['sass:dev'],
                options: {
                    spawn: false
                }
            },
            jade: {
                files: '<%= jade_folder %>/**/*.jade',
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
            dev_js: {
                files: [{
                    expand: true,
                    cwd: '<%= js_folder %>',
                    src: 'app.js',
                    dest: '<%= target_folder %>/js/',
                    rename: function(dest, src) {
                        return dest + src.replace('.js','.min.js');
                    }
                }]
            },
            dev_css: {
                files: [{
                    expand: true,
                    cwd: '<%= libs_folder%>',
                    src: 'libs.css',
                    dest: '<%= target_folder %>/css/',
                    rename: function(dest, src) {
                        return dest + src.replace('.css','.min.css');
                    }
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('build', ['sass:release', 'jade', 'imagemin', 'concat', 'jshint']);
    grunt.registerTask('dev', ['build', 'copy:dev_js', 'copy:dev_css', 'watch']);
    grunt.registerTask('release', ['build', 'uglify', 'cssmin']);
};