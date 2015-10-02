// Configuration for Copy task(s)
// Copies specified folders/files to specified destination
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('copy', {
    server: {
      files: [{
        expand: true,
        cwd: '<%= yeogurt.client %>/',
        dest: '<%= yeogurt.tmp %>',
        src: [
          'styles/styleguide.md'
        ]
      }]
    },

    fonts: {
      files: [{
          expand: true,
          cwd: '<%= yeogurt.client %>/bower_components/font-awesome/',
          dest: '<%= yeogurt.dist %>/',
          src: ['fonts/**/*', ]
        }

      ]
    },



    dist: {
      files: [{
        expand: true,
        cwd: '<%= yeogurt.client %>/',
        dest: '<%= yeogurt.dist %>/',
        src: [
          'styles/styleguide.md',
          'docs/styleguide/public/images',
          'styles/fonts/**/*.{woff,otf,ttf,eot,svg}',
          'images/**/*.{webp}',
          '!*.js',
          '*.{ico,png,txt}',
          '*.html',
          'json-data/**/*',
          'locales/**/'
        ]
      }]
    }
  });

};

module.exports = taskConfig;