var backlogApi = require('backlog-api');

module.exports.index = function(req, res) {
  var projectKey = req.params.project;
  var backlog = backlogApi();
  backlog.getProject({
    projectKey: projectKey
  }, function(err, project) {
    if (err) throw err;
    backlog.getVersions({
      projectId: project.id
    }, function(err, versions) {
      if (err) throw err;
      res.json(versions);
    });
  });
};

