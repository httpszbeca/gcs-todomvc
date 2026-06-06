/**
 * Main Grunt module export
 * Sets up all build tasks and automation workflows
 */
module.exports = function (grunt) {
	// Initialize module dependencies
	var bower = require('bower');
	var wrench = require('wrench');

	// Primary task: synchronize common TodoMVC assets across all frameworks
	// This ensures consistency in styling and shared functionality
	grunt.registerTask('todomvc-common', function () {
		// For some reason, I began trusting Batman to be my test directory for
		// `todomvc-common`.  If you work on changes in ...
		//
		//   examples/batman/bower_components/todomvc-common
		//
		// ... or even just drop the latest `todomvc-common` there, this task will
		// find all of the other `bower_components/todomvc-common` directories, and
		// update them with what Batman has.
		//
		// I also added Bower up top for in the future, as that might come in handy
		// to correctly fetch and install the latest todomvc-common, without relying
		// on this weird Batman system.
		// Define the source directory containing the canonical todomvc-common files
		var sourceTodoMvcCommon = 'examples/angularjs/bower_components/todomvc-common';
		// Pattern to exclude the source directory from updates
		var sourceIdentifierRegex = /angularjs/;

		// Change working directory to parent for relative path resolution
		grunt.file.setBase('../');

		// Expand glob pattern to find all todomvc-common directories
		// Filter excludes the source directory itself
		var directories = grunt.file.expand({
			filter: function (src) {
				// Check if path is a directory, ends with 'todomvc-common', and is not the source
				return grunt.file.isDir(src) && src.substr(-14) === 'todomvc-common' && !src.match(sourceIdentifierRegex);
			}
		}, ['*/**']);

		directories.forEach(function (destPath) {
			// Log the current synchronization operation for visibility
			console.log('Syncing todomvc-common to: ' + destPath);
			// Perform recursive directory sync with options
			wrench.copyDirSyncRecursive(
				sourceTodoMvcCommon,
				destPath,
				{
					// Force delete existing files to prevent merge conflicts
					forceDelete: true,
					// Do not preserve old files - full replacement
					preserveFiles: false
				},
				// Callback function handles completion or errors
				function (error) {
					// Report any issues encountered during sync
					if (error) {
						console.error('Error syncing to ' + destPath + ': ' + error);
					} else {
						// Confirm successful synchronization
						console.log('Successfully synced: ' + destPath);
					}
				});
		});
	});
	// End of todomvc-common task definition
};
// End of Grunt configuration module
