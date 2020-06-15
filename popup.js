// https://stackoverflow.com/questions/13359421/chrome-extension-get-current-tab-from-popup
var query = { active: true, currentWindow: true };
function callback(tabs) {
    var currentTab = tabs[0]; // there will be only one in this array
    old_url = currentTab.url;
    // console.log(old_url); // also has properties like currentTab.id

    // https://github.com/avinashpaliwal/Super-SloMo/blob/master/misc/original.gif
    // https://cdn.jsdelivr.net/gh/avinashpaliwal/Super-SloMo@master/misc/original.gif
    // https://cdn.jsdelivr.net/gh/user/repo@version/file
    
    // https://regex101.com/
    re = /https:\/\/github\.com\/([a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38})\/(.+)\/blob\/([^\/]+)\/(.+)/i;
    var myArray = old_url.match(re);
    // console.log(myArray);
    new_url = "https://cdn.jsdelivr.net/gh/" + myArray[1] + "/" + myArray[2] + "@" + myArray[3] + "/"+ myArray[4];
    // console.log(new_url)
    chrome.tabs.update({url: new_url});
    window.close(); // Note: window.close(), not this.close()
  }

  
function clickHandler(e) {
    console.log('click');
    chrome.tabs.query(query, callback);

}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('click-me').addEventListener('click', clickHandler);
});