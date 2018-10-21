let table =  document.getElementById('moderate-submissions')
                     .getElementsByTagName("tbody")[0]; 

var submissions = [];

let getPrizes = function(divs) {
    for (var i = 0 ; i < divs.length ; i++) {
        if (divs[i].getAttribute('id') == 'opt_in_prizes') {
            return divs[i];
        }
    }

    return undefined;
}

let getPrizeList = function(text) {
    return text.split(":")[1].trim().split(",");
}

for (var i = 1, row ; row = table.rows[i] ; i++) { 
    let submission = row.cells[2].getElementsByTagName("div")[0]; 
    let title = submission.getElementsByTagName("p")[0].innerText;
    let projectLink = submission.getElementsByTagName("p")[0].getElementsByTagName("a")[0].href;

    var request = new XMLHttpRequest();
    // we set async to false, just because performance isn't of much importance
    // here...
    request.open("GET", projectLink, false);
    request.send(null);

    var projectPage = document.createElement("html");
    projectPage.innerHTML = request.responseText;
    // this is annoying... turns out you cannot do '.getElementById' on DOM elts
    var prizesText = getPrizes(projectPage.getElementsByTagName("div")).getElementsByTagName("p")[0].innerText;

    var prizes = getPrizeList(prizesText);

    console.log({"title": title, "prizes": prizes});
    submissions.push({"title": title, "prizes": prizes});
}

console.log(submissions)

submissions
