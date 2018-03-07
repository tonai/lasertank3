module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /* JS tasks*/
    hogan: {
      common: {
        template : './dev/js/Common/**/*.hogan',
        output: './dev/js/views/common.js',
        binderName: 'nodejs'
      },
      game: {
        template : './dev/js/Game/**/*.hogan',
        output: './dev/js/views/game.js',
        binderName: 'nodejs'
      },
      editor: {
        template : './dev/js/Editor/**/*.hogan',
        output: './dev/js/views/editor.js',
        binderName: 'nodejs'
      }
    },
    jshint: {
      options: {
        /* Enforcing options */
        curly:     true,
        camelcase: true,
        immed:     true,
        indent:    4,
        latedef:   'nofunc',
        newcap:    true,
        noarg:     true,
        noempty:   true,
        undef:     true,
        //unused:    true,
        trailing:  true,
        /* Relaxing option */
        eqnull:    true,
        evil:      true,
        sub:       true,
        /* Environments */
        browser:   true,
        devel:     true,
        globals: {
          'module':  true,
          'require': true
        }
      },
      dev: [
        './dev/js/Block/**/*.js',
        './dev/js/Common/**/*.js',
        './dev/js/Editor/**/*.js',
        './dev/js/Game/**/*.js'
      ]
    },
    browserify: {
      options: {
        alias: './dev/js/lib/utils.js:utils,' +
          './dev/js/lib/options.js:options,' +
          './node_modules/hogan.js/lib/hogan.js:hogan.js',
        shim: {
          jquery: {
            path: './dev/js/lib/jquery.js',
            exports: '$'
          }
        }
      },
      game: {
        src: ['game.js'],
        dest: './staging/js/game.js'
      },
      editor: {
        src: ['editor.js'],
        dest: './staging/js/editor.js'
      }
    },
    uglify: {
      prod: {
        files: [
          {'./prod/js/game.js':   ['./dev/js/lib/prod.js', './staging/js/game.js']},
          {'./prod/js/editor.js': ['./dev/js/lib/prod.js', './staging/js/editor.js']}
        ]
      }
    },

    /* CSS tasks*/
    csslint: {
      dev: {
        options: {
          'adjoining-classes': false,
          'box-model':         false,
          'unique-headings':   false  // Needed for CSS reset compatibility
        },
        src: ['dev/css/*.css']
      },
    },
    concat: {
      dev: {
        src: ['./dev/css/*.css'],
        dest: './staging/css/styles.css'
      }
    },
    cssmin: {
      prod: {
        files: {
          './prod/css/styles.css': ['./staging/css/styles.css']
        }
      }
    },

    /* HTML tasks*/
    htmlmin: {
      prod: {
        files: {
          './prod/html/index.html':  './staging/html/index.html',
          './prod/html/game.html':   './staging/html/game.html',
          './prod/html/editor.html': './staging/html/editor.html'
        },
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
      }
    },

    /* Other tasks */
    symlink: {
      dev: {
        files: [{
          src: './dev/html',
          dest: './staging/html'
        }, {
          src: './dev/images',
          dest: './staging/images'
        }],
      },
      prod: {
        files: [{
          src: './dev/images',
          dest: './prod/images'
        }],
      },
    },

    /* Watch tasks*/
    watch: {
      options: {
        atBegin: true,
        livereload: true
      },
      js: {
        files: ['./dev/js/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      css: {
        files: ['./dev/css/*.css'],
        tasks: ['csslint', 'concat']
      }
    }

  });


  grunt.loadNpmTasks('grunt-hogan');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.loadNpmTasks('grunt-contrib-symlink');

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('check',   ['jshint', 'csslint']);
  grunt.registerTask('dev',     ['check', 'hogan', 'browserify', 'concat', 'symlink:dev']);
  grunt.registerTask('prod',    ['uglify', 'cssmin', 'htmlmin', 'symlink:prod']);
  grunt.registerTask('all',     ['dev', 'prod']);
  grunt.registerTask('default', ['dev']);
};