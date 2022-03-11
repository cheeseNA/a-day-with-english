chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled fired");
  chrome.storage.sync.set({
    timing: { hour: 0, minute: 0 },
    count: 0,
    timerStatus: "not set",
  });
});

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
        console.log("received requestLang response");
        console.log(`lang: ${response.lang}`);
        setTimerStatus(response.lang);
      }
    );
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type == "pageTransition") {
    console.log("received pageTransition message");
    console.log(`lang: ${request.lang}`);
    if (sender.tab.active) {
      setTimerStatus(request.lang);
    }
    sendResponse({ message: "bg page received" });
  }
});

function setTimerStatus(lang) {
  chrome.storage.sync.get(["timerStatus"], function (statusResult) {
    const timerStatus = statusResult.timerStatus;
    console.log(`timer status: ${timerStatus}`);
    if (lang === "en" && timerStatus === "not set") {
      console.log("start timer");
      const intervalId = setInterval(() => {
        chrome.storage.sync.get(["count"], function (countResult) {
          const nowCount = countResult.count;
          console.log(`now count is ${nowCount}`);
          chrome.storage.sync.set({ count: nowCount + 1 });
          chrome.action.setBadgeText({ text: nowCount.toString() });
        });
      }, 1000);
      chrome.storage.sync.set({ timerStatus: intervalId });
    }
    if (lang !== "en" && timerStatus !== "not set") {
      console.log("stop timer");
      clearInterval(timerStatus);
      chrome.storage.sync.set({ timerStatus: "not set" });
    }
  });
}
