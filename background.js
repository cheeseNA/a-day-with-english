chrome.tabs.onActivated.addListener((activeInfo) => {
  console.log("onActivated fired");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length !== 1) {
      console.log("tab.length is not one");
      return;
    }
    const targetTabId = tabs[0].id;
    chrome.tabs.sendMessage(
      targetTabId,
      { type: "requestLang" },
      (response) => {
        console.log(response);
        setTimerStatus(response.lang);
      }
    );
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type == "pageTransition") {
    console.log("received pageTransition message:");
    if (sender.tab.active) {
      setTimerStatus(request.lang);
    }
    sendResponse({ message: "bg page received" });
  }
});

function setTimerStatus() {}
