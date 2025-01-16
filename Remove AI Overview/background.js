chrome.runtime.onInstalled.addListener( () => {
    chrome.storage.sync.set({enabledGoogle: true, enabledYouTube: true}, () => {
        console.log("Extension enabled by default.");
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleGoogle") {
        chrome.tabs.query({ url: "*://*.google.com/search*" }, (tabs) => {
            tabs.forEach((tab) => {
                if (message.enabled) {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ['content.js']  // Make sure content.js is injected
                    }, () => {
                        // After injecting, execute the removeAIOverview function in the context of content.js
                        chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            func: removeAIOverview
                        });
                    });
                    chrome.tabs.reload(tab.id);
                } else {
                    chrome.scripting.removeCSS({
                        target: { tabId: tab.id },
                    });
                    chrome.tabs.reload(tab.id)
                }
            });
        });
    }

    if (message.action === "toggleYouTube") {
        chrome.tabs.query({ url: "*://*.youtube.com/watch*" }, (tabs) => {
            tabs.forEach((tab) => {
                if (message.enabled) {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ['content.js']  // Make sure content.js is injected
                    }, () => {
                        // After injecting, execute the removeVideoSummaries function in the context of content.js
                        chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            func: removeVideoSummaries
                        });
                    });
                    chrome.tabs.reload(tab.id);
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
