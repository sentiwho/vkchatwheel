var phrases;
phrases = [
  "Установите",
  "Желаемые",
  "Фразы",
  "В настройках",
  "Вашего",
  "Расширения",
];

function savePhrases() {
  chrome.storage.local.set({ phrases: phrases }, function () {
    console.log("Phrases saved");
  });
}

function loadPhrases() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["phrases"], function (result) {
      if (result.phrases) {
        phrases = result.phrases;
        resolve(phrases);
      } else {
        reject("No phrases found");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  loadPhrases()
    .then(() => {})
    .catch((error) => {
      console.error(error);
    });
});

var choosedphrase = 0;

fetch(chrome.runtime.getURL("content.html"))
  .then((response) => response.text())
  .then((html) => {
    document.body.insertAdjacentHTML("beforeend", html);
  })
  .catch((error) => console.error("Ошибка:", error));

var choosedphrase;

window.addEventListener("load", (event) => {
  let isYuKeyPressed = false;

  document.addEventListener("keydown", (event) => {
    if ((event.key === "я" || event.key === "Я") && event.ctrlKey) {
      isYuKeyPressed = true;
      document.getElementById("chatwheel").style.display = "flex";
    }
  });

  document.addEventListener("keyup", (event) => {
    if ((event.key === "я" || event.key === "Я") && event.ctrlKey) {
      isYuKeyPressed = false;
      document.getElementById("chatwheel").style.display = "none";
      console.log(phrases);
      loadPhrases();
      document.querySelector('[role="textbox"]').innerHTML =
        phrases[choosedphrase];
      const elements = document.querySelector(
        "#content > div > div > div.im-page--history.page_block._im_page_history > div.im-page-history-w > div.im-page--chat-input._im_chat_input_w > div.im-chat-input.clear_fix._im_chat_input_parent > div.im-chat-input--textarea.fl_l._im_text_input._emoji_field_wrap._voice_field_wrap > div.im-chat-input--txt-wrap._im_text_wrap > button > span.im-send-btn__icon.im-send-btn__icon--send"
      );
      elements.click();
      elements.click();
    }
  });

  const pElements = Array.from(
    document.getElementsByClassName("chatwheel__item")
  );

  pElements.forEach((p, index) => {
    p.addEventListener("mouseenter", (e) => {
      choosedphrase = index;
    });
  });
  const myButton = document.getElementById("myButton");
  myButton.addEventListener("click", () => {
    let isAnyPhraseUpdated = false; // Флаг для проверки, были ли обновлены фразы
    for (let i = 0; i < 6; i++) {
      let inputValue = document.getElementById("input" + (i + 1)).value.trim();
      if (inputValue) {
        phrases[i] = inputValue;
        isAnyPhraseUpdated = true;
      }
    }
    if (isAnyPhraseUpdated) {
      savePhrases(); // Сохраняем обновлённые фразы только если были изменения
      alert(phrases);
    } else {
      alert("error");
    }
  });
});
