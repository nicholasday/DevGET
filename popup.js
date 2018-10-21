
let contentDiv = document.getElementById("content");
let generateBtn = document.getElementById("gencsvs");



generateBtn.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: "get_submission_data.js"},
            function (result) {
                result = result[0];
                console.log(result);
                for (var i = 0 ; i < result.length ; i++) {
                    var p = document.createElement("p");
                    p.appendChild(document.createTextNode(result[i]));
                    contentDiv.appendChild(p);
                }
            });
    });
};



