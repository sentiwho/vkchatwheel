$(document).ready(() => {
  $(document).on("click", ".phrase1", function (e) {
    document.querySelector('[role="textbox"]').innerHTML = "WELLPLAYED";
    const elements = document.querySelectorAll('[data-tttype="2"]');
    elements[0].click();
  });
  $(document).on("click", ".right2", function (e) {
    console.log("thanks");
  });
  $.get(chrome.runtime.getURL("/content.html"), (data) => {
    $(data).appendTo("body");
  });
});

const phrases = [
  "Well Played!",
  "Help!",
  "Get back!",
  "Carefull!",
  "Need mana!",
  "Okay.",
];
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
      console.log(phrases[choosedphrase]);
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
});
