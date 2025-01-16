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

// Observe DOM changes to dynamically remove the AI Overview section as it loads
const observer = new MutationObserver(() => {
    chrome.storage.sync.get("enabled", (data) => {
        if (data.enabled) {
            removeAIOverview();
        }
    });
});

// Start observing the document body for changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial check in case the section is already loaded
chrome.storage.sync.get("enabled", (data) => {
    if (data.enabled) {
        removeAIOverview();
    }
})

