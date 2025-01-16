document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggle");

    // Load and set the initial state of the toggle
    chrome.storage.sync.get("enabled", (data) => {
        // Default to enabled if no value exists
        const isEnabled = data.enabled ?? true;
        toggle.checked = isEnabled;

        // Save the default state if no value exists in storage
        if (data.enabled === undefined) {
            chrome.storage.sync.set({ enabled: true }, () => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                }
            });
        }
    });

    // Add event listener to update state on toggle
    toggle.addEventListener("change", () => {
        const isEnabled = toggle.checked;
        chrome.storage.sync.set({ enabled: isEnabled }, () => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }
            console.log(`Extension enabled state set to: ${isEnabled}`);
        });

        // Notify content or background scripts about the change
        chrome.runtime.sendMessage({ action: "toggle", enabled: isEnabled });
    });
});

