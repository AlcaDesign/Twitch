/* jshint esversion: 6 */

APIs.github({ url: 'repos/AlcaDesign/Twitch/contents/projects.json' })
	.then(data => atob(data.content))
	.then(JSON.parse)
	.then(data => data.projects)
	.then(data =>
			_.map(data, (proj, projectKey, projects) => {
					var vers = proj.versions[proj.versions.length - 1];
					return {
							name: proj.name,
							desc: proj.description,
							path: vers.name.replace(/(.*)/, proj.path)
						};
				})
		)
	.then(console.log.bind(console));
