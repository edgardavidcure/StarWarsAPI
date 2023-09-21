const update = document.querySelector("#update-button");

update.addEventListener("click", () => {
  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Guy",
      quote: "i dont think this is good",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      window.location.reload(true);
    });
});
const messageDiv = document.querySelector("#message");
const deleteButton = document.querySelector("#delete-button");

deleteButton.addEventListener("click", (_) => {
  fetch("/quotes", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Guy",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      if (response === "No quote to delete") {
        messageDiv.textContent = "No quote to Delete";
      } else {
        window.location.reload();
      }
    });
});
