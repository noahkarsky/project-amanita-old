// DOM element where the Timeline will be attached
var container = document.getElementById('visualization');

// Configuration for the Timeline
var options = {};

d3.csv("../../data/timeline_data.csv").then(function(data) {
  // Extract unique groups from data
  var groupsArray = [...new Set(data.map(item => item.group))];

  // Create a map for groups to their ids
  var groupToId = new Map(groupsArray.map((group, index) => [group, index + 1]));

  // Create a DataSet for groups
  var groups = new vis.DataSet(groupsArray.map(function(group, index) {
    return {
      id: index + 1,
      content: group
    };
  }));

  // Create a DataSet (allows two way data-binding)
  var items = new vis.DataSet(data.map(function(row) {
    return {
      id: row.id,
      group: groupToId.get(row.group),  // Use the id corresponding to the group
      type: row.type,
      start: row.start,
      end: row.end,
      content: row.content
    };
  }));

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, groups, options);
});
