function showRepositories(event, data) {
  //explicitly listing event,data is optional, this gets passed in automatically
  //this is set to the XMLHttpRequest object that fired the event
  //console.log(this.responseText)
  var repos = JSON.parse(this.responseText)// JSON.parse  parses a JSON string, constructing the JavaScript value or object described by the string.
  console.log(repos)
/**
  let repoList = "<ul>"
  for(var i=0;i < this.responseText.length; i++) {
    repoList += "<li>" + this.responseText[i]["name"] + "</li>"
  }
  repoList += "</ul>"
**/
  //const repoList = `<ul>${repos.map(r => '<li>' + r.name + '</li>').join('')}</ul>`

  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`


  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}

function getCommits(el) {
  const name = el.dataset.repo //this gets the value of the data attribute and stores it here
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

function showCommits() {
  //turns this into a json object
  const commits = JSON.parse(this.responseText)
// creates the html by going through the commits collection and pulling out the data needed and putting it into a li
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.committer + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  //gets the DOM element and puts the commitsList html into the div
  document.getElementById("commits").innerHTML = commitsList
}
