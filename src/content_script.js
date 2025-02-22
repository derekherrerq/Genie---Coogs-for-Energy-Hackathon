
let currentInput = ""

const classify_prompt = (currentInput) => {
    code_keywords = ["write code", "code", "implement", "function", "debug", "API", "script", "Python", "JavaScript", "C++", "React", "algorithm"]
    math_keywords = ["solve", "equation", "integral", "derivative", "theorem", "proof", "matrix", "vector", "probability", "statistic"]
    image_keywords = ["generate image", "image", "create picture", "visualize", "draw", "render", "photo", "graph", "chart"]

    let prompt = currentInput.toLowerCase()

    for (let keyword of code_keywords) {
        if (prompt.includes(keyword)) {
            return "code"
        }
    }

    for (let keyword of math_keywords) {
        if (prompt.includes(keyword)) {
            return "math"
        }
    }

    for (let keyword of image_keywords) {
        if (prompt.includes(keyword)) {
            return "image"
        }
    }

    return "general"
}

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
                    chrome.runtime.sendMessage({ message: "sendQuery", content: currentInput, type: classify_prompt(currentInput) }, (response) => {
                        console.log(response)
                    });
                }
            }
        })
        obs.disconnect(); 
    }
});

observer.observe(document.body, { childList: true, subtree: true });
