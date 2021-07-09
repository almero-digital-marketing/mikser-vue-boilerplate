const config = require('./domain.config.json')

module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			dist: ['dist/storage', 'out/**/*.html'],
		},
		image: {
			options: {
				pngquant: true,
				optipng: false,
				zopflipng: true,
				jpegRecompress: false,
				jpegoptim: true,
				mozjpeg: true,
				gifsicle: true,
				svgo: true
			},
			dist: {
				expand: true,
				cwd: "out/",
				src: [
					"img/**/*.{svg,png,jpg,gif}",
				],
				dest: "runtime/dist/"
			},
			gallery: {
				expand: true,
				cwd: "files/gallery/",
				src: [
					"**/*.{svg,png,jpg,gif}",
				],
				dest: "runtime/files/storage/gallery/"
			}
		},
		sync: {
			dist: {
				files: [
					{
						cwd: "runtime/dist/",
						src: ["**/*"],
						dest: "dist/"
					},
					{
						cwd: "out/",
						src: [
							"**/*.txt",
							"**/*.conf",
							"**/*.html",
							"**/*.js",
							"**/*.js.map",
							"**/*.css",
							"**/*.css.map",
							"**/*.xml",
							"**/*.ico",
							"**/*.ttf",
							"**/*.otf",
							"**/*.woff",
							"**/*.eot",
							"**/*.pdf",
							"**/*.mp4",
							"**/*.mp3",
							"**/*.webm",
							"**/*.mjml",
							"!out/storage"
						],
						dest: "dist/"
					}, {
						cwd: "out/animations/",
						src: "**/*",
						dest: "dist/animations/"
					}
				]
			},
		},
		rename: {
			dist: {
				files: [
					{ src: 'dist/nossl.conf', dest: 'dist/nossl.nginx.conf' },
					{ src: 'dist/ssl.conf', dest: 'dist/ssl.nginx.conf' },
				]
			}
		},
		rsync: {
			options: {
				args: ["--chmod a+r"],
				recursive: true
			},
			[config.domain]: {
				options: {
					src: "dist/",
					dest: `/var/www/${config.domain}`,
					host: "almero@web.almero.pro"
				}
			}
		},
		newer: {
			options: {
				cache: "runtime"
			}
		},
		exec: {
			dps: `ssh almero@web.almero.pro "dps ${config.domain}"`
		},
		less: {
			email: {
				options: {
					paths: ['node_modules'],
					sourceMapFileInline: true
				},
				files: {
					'out/email/style.css': 'files/email/style.less'
				}
			}
		},
		juice: {
			email: {
				options: {
					webResources: {
						relativeTo: 'out/email'
					}
				},
				files: {
					'runtime/files/storage/email/request.hbs.html': 'files/email/request.hbs',
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-mega-image');
	grunt.loadNpmTasks('grunt-sync');
	grunt.loadNpmTasks('grunt-contrib-rename');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-rsync');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-juice-email');

	grunt.registerTask('deploy', ['newer:image:dist', 'sync:dist', 'rename:dist', 'clean:dist', 'rsync', 'exec:dps']);
	grunt.registerTask('default', ['newer:image:dist', 'sync:dist', 'rename:dist', 'clean:dist']);
	
	grunt.registerTask('gallery', ['newer:image:gallery']);
	grunt.registerTask('email', ['newer:less:email', 'newer:juice:email']);
};
