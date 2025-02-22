
let currentInput = ""

const observer = new MutationObserver((mutations, obs) => {
    const box = document.querySelector("#prompt-textarea")
    if (box) { 
        console.log("Target element is available!");
        
        box.addEventListener("input", (e) => {
            currentInput = box.textContent
        });
        window.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                console.log("Enter key pressed!", currentInput);
                if (currentInput) {
                    chrome.runtime.sendMessage({ message: "sendQuery", content: currentInput }, (response) => {
                        console.log(response)
                    });
                }
            }
        })
        obs.disconnect(); 
    }
});

observer.observe(document.body, { childList: true, subtree: true });
