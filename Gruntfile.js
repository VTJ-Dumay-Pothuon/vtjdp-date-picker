module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
  
      babel: {
        options: {
          sourceMap: true,
          presets: ['@babel/preset-react']
        },
        dist: {
          files: [{
            expand: true,
            cwd: 'src/',
            src: ['**/*.jsx'],
            dest: 'dist/',
            ext: '.js'
          }]
        }
      },
  
      uglify: {
        options: {
          mangle: true,
          compress: true
        },
        dist: {
          files: {
            'dist/DatePicker.min.js': ['dist/DatePicker.js']
          }
        }
      },
  
      watch: {
        scripts: {
          files: ['src/**/*.jsx'],
          tasks: ['babel', 'uglify'],
          options: {
            spawn: false,
          },
        },
      },
    });
  
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
  
    grunt.registerTask('default', ['babel', 'uglify', 'watch']);
  };