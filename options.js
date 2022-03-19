function countToHMSText(count) {
  const second = count % 60;
  const minute = Math.floor(count / 60);
  const hour = Math.floor(minute / 60);
  return `${hour}:${minute}:${second}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const recordList = document.querySelector("#records");

  chrome.storage.sync.get(["countRecord"], function (result) {
    console.log(result.countRecord);
    for (const record of result.countRecord) {
      const recordElement = document.createElement("li");
      const textSpanElement = document.createElement("span");
      textSpanElement.textContent = `${
        Object.keys(record)[0]
      }  ${countToHMSText(Object.values(record)[0])}`;
      recordElement.appendChild(textSpanElement);
      recordList.appendChild(recordElement);
    }
  });
});
