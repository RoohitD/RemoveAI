chrome.runtime.onInstalled.addListener( () => {
    chrome.storage.sync.set({enabled: true}, () => {
        console.log("Extension enabled by default.");
    })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggle") {
        chrome.tabs.query({ url: "*://*.google.com/*" }, (tabs) => {
            tabs.forEach((tab) => {
                if (message.enabled) {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ["content.js"],
                    });
                    chrome.tabs.reload(tab.id)
                } else {
                    chrome.scripting.removeCSS({
                        target: { tabId: tab.id },
                    });
                    chrome.tabs.reload(tab.id)
                }
            });
        });
    }
});
