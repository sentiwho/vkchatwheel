document.addEventListener("keypress", handleKeyPress);

function handleKeyPress(event) {
  if (event.key === "ю" || event.key === "Ю") {
    document.getElementById("chatwheel").style.display = "flex";
  }
}
