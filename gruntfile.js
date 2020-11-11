
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'dist/built.js',
                dist: 'dist/built.min.js'
            }
        },
        concat: {
            options: {
                separator: '\n',
            },
            dist: {
                src: ['src/components/**/*.js'],
                dest: 'dist/built.js',
            },
        },

    });

    

    grunt.registerTask('dev', ['concat', 'uglify']);
}