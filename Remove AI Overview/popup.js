document.addEventListener("DOMContentLoaded", () => {
    const toggleGoogle = document.getElementById("toggle-google");
    const toggleYouTube = document.getElementById("toggle-youtube");

    // Load and set the initial state of the toggle for Google
    chrome.storage.sync.get("enabledGoogle", (data) => {
        const isEnabledGoogle = data.enabledGoogle ?? true; // Default to true if not found
        toggleGoogle.checked = isEnabledGoogle;

        // Save the default state for Google if not set
        if (data.enabledGoogle === undefined) {
            chrome.storage.sync.set({ enabledGoogle: true }, () => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                }
            });
        }
    });

    // Load and set the initial state of the toggle for YouTube
    chrome.storage.sync.get("enabledYouTube", (data) => {
        const isEnabledYouTube = data.enabledYouTube ?? true; // Default to true if not found
        toggleYouTube.checked = isEnabledYouTube;

        // Save the default state for YouTube if not set
        if (data.enabledYouTube === undefined) {
            chrome.storage.sync.set({ enabledYouTube: true }, () => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                }
            });
        }
    });

    // Add event listener to update Google state on toggle
    toggleGoogle.addEventListener("change", () => {
        const isGoogleEnabled = toggleGoogle.checked;
        chrome.storage.sync.set({ enabledGoogle: isGoogleEnabled }, () => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }
            console.log(`Google extension enabled state set to: ${isGoogleEnabled}`);
        });

        // Notify background script about the change for Google
        chrome.runtime.sendMessage({ action: "toggleGoogle", enabled: isGoogleEnabled });
    });

    // Add event listener to update YouTube state on toggle
    toggleYouTube.addEventListener("change", () => {
        const isYouTubeEnabled = toggleYouTube.checked;
        chrome.storage.sync.set({ enabledYouTube: isYouTubeEnabled }, () => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }
            console.log(`YouTube extension enabled state set to: ${isYouTubeEnabled}`);
        });

        // Notify background script about the change for YouTube
        chrome.runtime.sendMessage({ action: "toggleYouTube", enabled: isYouTubeEnabled });
    });
});
