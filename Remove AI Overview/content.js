function removeAIOverview() {
    const aiOverview = document.querySelector("div.YzCcne h1.VW3apb");

    if (aiOverview && aiOverview.textContent === "AI Overview") {
        const parentElement = aiOverview.closest("div.YzCcne");
        if (parentElement) {
            parentElement.remove();
            console.log("AI Overview section removed!");
        }
    }
}

function removeVideoSummaries() {
    const headerDiv = document.querySelector('div#header.style-scope.ytd-expandable-metadata-renderer');
    if (headerDiv) {
        headerDiv.remove(); // Remove the element from the DOM
        console.log('Header div removed successfully.');
    } else {
        console.log('Header div not found.');
    }
}

// Listen for changes in the DOM to handle dynamically loaded content
const observer = new MutationObserver(() => {
    // Ensure that storage data is retrieved before executing functions
    chrome.storage.sync.get(["enabledGoogle", "enabledYouTube"], (data) => {
        if (data.enabledGoogle) {
            removeAIOverview();
        }
        if (data.enabledYouTube) {
            removeVideoSummaries();
        }
    });
});

// Start observing the document body for changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial check to handle elements already loaded when the script runs
chrome.storage.sync.get(["enabledGoogle", "enabledYouTube"], (data) => {
    if (data.enabledGoogle) {
        removeAIOverview();
    }
    if (data.enabledYouTube) {
        removeVideoSummaries();
    }
});
