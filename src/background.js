chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed.");
    chrome.storage.local.set({ numberOfQueries: 0 }, () => {
        console.log("Storage initialized!");
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    sendResponse("Message received!");
    if (message.message === "sendQuery") {
        chrome.storage.local.get(["numberOfQueries"], (result) => {
            let currentInput = message.content;
            let numberOfQueries = result.numberOfQueries;
            numberOfQueries++;
            chrome.storage.local.set({ numberOfQueries });
            console.log(`Query number ${numberOfQueries}: ${currentInput}`);
        });
    }
});