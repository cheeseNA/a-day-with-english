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
  const languageTag = document.documentElement.lang; // this value follows the BCP47 syntax
  return languageTag.split("-")[0];
}
