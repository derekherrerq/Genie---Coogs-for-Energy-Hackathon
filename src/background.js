function formatDate() {
    const date = new Date();
    let mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    let dd = String(date.getDate()).padStart(2, '0');
    let yy = String(date.getFullYear()).slice(-2);
  
    let hours = date.getHours();
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
  
    return `${mm}/${dd}/${yy} - ${hours}:${minutes} ${ampm}`;
}

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed.");
    chrome.storage.local.set({ codeQueries: 0 }, () => {
        console.log("Storage initialized!");
    });
    chrome.storage.local.set({ imageQueries: 0 }, () => {
        console.log("Storage initialized!");
    });
    chrome.storage.local.set({ mathQueries: 0 }, () => {
        console.log("Storage initialized!");
    });
    chrome.storage.local.set({ otherQueries: 0 }, () => {
        console.log("Storage initialized!");
    });
    chrome.storage.local.set({ trackingSince: formatDate() }, () => {
        console.log("Tracking started!");
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    sendResponse("Message received!", message.message);
    if (message.message === "sendQuery") {
        let bin = ""
        switch (message.type) {
            case "code":
                bin = "codeQueries";
                break;
            case "math":
                bin = "mathQueries";
                break;
            case "image":
                bin = "imageQueries";
                break;
            default:
                bin = "otherQueries";
        } 
        
        chrome.storage.local.get([bin], (result) => {
            let currentInput = message.content;
            let numberOfQueries = result[bin];
            numberOfQueries++;

            switch(bin) {
                case "codeQueries":
                    chrome.storage.local.set({ codeQueries: numberOfQueries }, () => {
                        console.log("Code queries updated!", numberOfQueries);
                    });
                    break;
                case "mathQueries":
                    chrome.storage.local.set({ mathQueries: numberOfQueries }, () => {
                        console.log("Math queries updated!", numberOfQueries);
                    });
                    break;
                case "imageQueries":
                    chrome.storage.local.set({ imageQueries: numberOfQueries }, () => {
                        console.log("Image queries updated!", numberOfQueries);
                    });
                    break;
                default:
                    chrome.storage.local.set({ otherQueries: numberOfQueries }, () => {
                        console.log("Other queries updated!", numberOfQueries);
                    });
                
            }
        });
    }
});