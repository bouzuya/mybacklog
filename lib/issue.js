var backlogApi = require('backlog-api');

module.exports.index = function(req, res) {
  var projectKey = req.params.project;
  var backlog = backlogApi();
  backlog.getProject({
    projectKey: projectKey
  }, function(err, project) {
    if (err) throw err;
    var params = { projectId: project.id };
    if (req.query.milestoneId)
      params.milestoneId = parseInt(req.query.milestoneId);
    backlog.findIssue(params, function(err, issues) {
      if (err) throw err;
      res.json(issues);
    });
  });
};

module.exports.show = function(req, res) {
  var projectKey = req.params.project;
  var issueNo = req.params.issue;
  var backlog = backlogApi();
  backlog.getIssue({
    issueKey: projectKey + '-' + issueNo
  }, function(err, issue) {
    if (err) throw err;
    res.json(issue);
  });
};

module.exports.estimatedHours = function(req, res) {
  var projectKey = req.params.project;
  var backlog = backlogApi();
  backlog.getProject({
    projectKey: projectKey
  }, function(err, project) {
    if (err) throw err;
    var params = { projectId: project.id };
    if (req.query.milestoneId)
      params.milestoneId = parseInt(req.query.milestoneId);
    backlog.findIssue(params, function(err, issues) {
      if (err) throw err;
      var sum = issues.reduce(function(s, i) {
        s += i.estimated_hours;
      }, 0);
      res.json(sum);
    });
  });
};
