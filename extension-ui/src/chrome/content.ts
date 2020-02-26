chrome.runtime.onMessage.addListener(
    function(message, callback) {
        if (message == "whitelist-url-seen") {
            chrome.tabs.executeScript({
                code: 'alert(message.timesSeen);'
            });
        }
});