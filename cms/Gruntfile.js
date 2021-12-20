
module.exports = function(grunt) {
    grunt.initConfig({
        rsync: {
			options: {
				args: ["--chmod a+r"],
				recursive: true,
				exclude: 'node_modules'
			},
			[config.domain]: {
				options: {
					src: "dist/",
					dest: `/var/www/${config.domain}`,
					host: "almero@cms.almero.pro"
				}
			}
		},
    });

    grunt.loadNpmTasks('grunt-rsync');
	grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('deploy', []);

}