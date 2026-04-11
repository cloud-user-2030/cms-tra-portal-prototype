document.querySelectorAll(".top-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".top-tab").forEach((b) => b.classList.remove("is-active"));
    button.classList.add("is-active");
  });
});

document.querySelectorAll(".sub-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".sub-tab").forEach((b) => b.classList.remove("is-active"));
    button.classList.add("is-active");
  });
});