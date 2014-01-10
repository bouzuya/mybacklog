var express = require('express');
var expressResource = require('express-resource');

var app = express();

app.use(express.json());
app.use(express.urlencoded());

var projects = app.resource('projects', require('./project'), { format: 'json' });
var milestones = app.resource('milestones', require('./milestone'), { format: 'json' });
var issues = app.resource('issues', require('./issue'), { format: 'json' });
projects.add(milestones);
projects.add(issues);

app.listen(3000);

