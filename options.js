chrome.storage.sync.get(["numberOfQueries"], (result) => {
    document.getElementById("counter").innerText = result.numberOfQueries;
}
);