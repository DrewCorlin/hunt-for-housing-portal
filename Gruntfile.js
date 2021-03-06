module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify', {
              'presets': ['es2015']
            }],
            ['jstify']
          ]
        },
        files: {
          './public/app.js': ['./app/initialize.js']
        }
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, cwd: 'app/assets/', src: ['**'], dest: './public/', filter: 'isFile'}
        ]
      }
    },
    browserSync: {
      bsFiles: {
        src : './public/**'
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "./public"
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: 'public'
        }
      }
    },
    watch: {
      scripts: {
        files: ["./app/**"],
        tasks: ["build"]
      }
    },
    less: {
      development: {
        options: {
          paths: ["/app/styles"],
          compress: true
        },
        files: {
          './public/main.css': ['./app/styles/base.less', './app/styles/ribbon.less', './app/styles/common.less', './node_modules/toastr/build/toastr.min.css']
        }
      }
    },
    uglify: {
      options: {
        mangle: false,
        compress: true,
        output: {
          comments: false
        }
      },
      development: {
        files: {
          './public/app.js': ['./public/app.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('start', ['build', 'browserSync', 'watch']);
  grunt.registerTask("build", ["browserify", "copy:main", "less", "uglify"]);
};