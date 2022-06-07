const fs = require('fs');

try {
  var rawData = fs.readFileSync('config/config.txt', 'utf8');
  var rawData = rawData.split(':');
  var users = rawData[1].split(';');
  var colors = rawData[3].split(';');
  var files = rawData[5].split(';');
} catch (err) {
  console.error(err);
}

var outHtml = ""
for (const i of Array(users.length).keys()) {
  outHtml = outHtml + "<div class='user' style='background-color:" + colors[i] + "'><h3><a href='main.html'>" + users[i] + "</a></h3>"
}
document.getElementById('users').innerHTML = outHtml
