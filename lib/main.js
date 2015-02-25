var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var clipboard = require("sdk/clipboard");
var timers = require("sdk/timers");

var urls = [];
var clipstring = "";

function archiveEverything(){
    urls = [];
    for (let tab of tabs){
        urls.push({
            'rawUrl': tab.url,
            'pageTitle': tab.title
        })
        archive(tab);
    }

    timers.setTimeout(urlsToClipboard, 3000, urls, tabs);
    // I don't like using a timeout but debugging variable scope made this kinda weird and difficult to do.
}

// This assumes that all archive instances have activated accordingly.
function urlsToClipboard(urls, tabs){
    clipstring = "";
    for (var i = 0; i < tabs.length; i++){
        clipstring += tabs[i].url + "\t\t" + urls[i].pageTitle + "\n";
    }
    clipboard.set(clipstring);
}

// Archives the url in its own tab.
function archive(tab){
    tab.url = 'https://archive.today/?run=1&url='+encodeURIComponent(tab.url);
}

var widget = widgets.Widget({
    id: "archive-today",
    label: "Archive All Tabs",
    contentURL: "http://archive.today/favicon.ico",
    onClick: function() {
        archiveEverything();
    }
});