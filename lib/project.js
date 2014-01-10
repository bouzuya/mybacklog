var backlogApi = require('backlog-api');

module.exports.index = function(req, res) {
  var backlog = backlogApi();
  backlog.getProjects(function(err, projects) {
    if (err) throw err;
    res.json(projects);
  });
};

module.exports.show = function(req, res) {
  var projectKey = req.params.project;
  var backlog = backlogApi();
  backlog.getProject({
    projectKey: projectKey
  }, function(err, project) {
    if (err) throw err;
    res.json(project);
  });
};

