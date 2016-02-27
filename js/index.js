/* jshint esversion: 6 */

var repository = 'AlcaDesign/Twitch',
	repoTree = 'gh-pages',
	repoURL = 'https://github.com/' + repository,
	repoTreeURL = repoURL + '/tree/' + repoTree;

function getProjects() {
	return APIs.github({ url: 'repos/' + repository + '/contents/projects.json' })
		.then(data => atob(data.content))
		.then(JSON.parse)
		.then(data => data.projects)
}

function simplifyProjectsList(data) {
	return _.map(data, (proj, projectKey, projects) => {
			var vers = proj.versions[proj.versions.length - 1].name,
				icon = _.find(proj, (n, i) =>
					_.includes(['icon','md_icon'], i.toLowerCase()));
			return {
					name: proj.name,
					desc: proj.description,
					path: vers.replace(/(.*)/, proj.path),
					vers: vers, //TODO: ES6-ify
					icon: icon // TODO ES6-ify
				};
		})
}

function generateProjectItem(item) {
	var projectPath = repoTreeURL + '/projects/' + item.path;
	return 	'<div class="list-item">' +
				'<a icon="' + item.icon + '" target="_blank" href="' + projectPath + '">' +
					'<div class="project-name">' +
						item.name +
						' <span class="project-vers">' + item.vers + '</span>' +
					'</div>' +
					'<div class="project-desc">' + item.desc + '</div>' +
				'</a>' +
			'</div>';
}

function createProjectsHTML(items) {
	return items.map(generateProjectItem);
}

function addProjectsToList(htmlList) {
	var list = document.getElementById('project-list').querySelector('.list-items');
	list.innerHTML += htmlList.join('');
	return htmlList;
}

function listProjects() {
	getProjects()
		.then(simplifyProjectsList)
		.then(createProjectsHTML)
		.then(addProjectsToList);
	
}

(function() {
		
		listProjects();
		
	})();
