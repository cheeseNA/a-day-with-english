chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "requestLang") {
    sendResponse({ lang: getLanguageOfPage() });
  }
});

chrome.runtime.sendMessage(
  { type: "pageTransition", lang: getLanguageOfPage() },
  (response) => {
    console.log(response);
  }
);

function getLanguageOfPage() {
  return "en";
}
