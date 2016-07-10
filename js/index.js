var repository = 'AlcaDesign/Twitch',
	repoTree = 'gh-pages',
	repoURL = `https://github.com/${repository}`,
	repoTreeURL = `${repoURL}/tree/${repoTree}`;

function getProjects() {
	return APIs.github({
				url: `repos/${repository}/contents/projects.json`
			})
		.then(data => atob(data.content))
		.then(JSON.parse)
		.then(data => data.projects);
}

function simplifyProjectsList(data) {
	return _.map(data, (proj, projectKey, projects) => {
			var lastVers = _.last(proj.versions),
				vers = lastVers.name,
				v_ti = lastVers.title,
				icon = _.find(proj, (n, i) =>
					_.includes(['icon','md_icon'], i.toLowerCase()));
			return {
					name: proj.name,
					desc: proj.description,
					path: vers.replace(/(.*)/, proj.path),
					time: proj.created,
					lmod: proj.lastModified,
					vers, v_ti, icon,
				};
		});
}

function generateProjectItem(item) {
	let projectPath = repoTreeURL + '/projects/' + item.path,
		time;
	if(item.time) {
		if(item.lmod) {
			time = `Updated ${moment(item.lmod).fromNow()}`;
		}
		else {
			time = `Added ${moment(item.time).fromNow()}`;
		}
	}
	let html = 
	`<div class="list-item">
		<a icon="${item.icon}" target="_blank" href="${projectPath}">
			<div class="project-name">
				${item.name}
				<span class="project-vers">${item.v_ti}</span>
				${time ? `<span class="project-time">(${time})</span>` : '' }
			</div>
			<div class="project-desc">${item.desc}</div>
		</a>
	</div>`;
	return html;
}

function createProjectsHTML(items) {
	return items.map(generateProjectItem);
}

function addProjectsToList(htmlList) {
	var list = document.querySelector('#project-list .list-items');
	list.innerHTML += htmlList.join('');
	return htmlList;
}

function listProjects() {
	return getProjects()
		.then(simplifyProjectsList)
		.then(createProjectsHTML)
		.then(addProjectsToList);
	
}

(function() {
		listProjects()
			.then(() => console.log('Done loading'))
			.catch(err => console.log(err));
	})();
