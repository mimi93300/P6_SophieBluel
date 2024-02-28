const formInfo = document.querySelector("#contact form");

const connect = () => {
  const formData = new FormData(formInfo);

  const dataUser = Object.fromEntries(formData);
  console.log(dataUser);

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataUser),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("Token", data.token);


      if (data.message || data.error) {
        alert("Erreur dans l’identifiant ou le mot de passe");
        document.location.href = "./login.html"
        form.reset()
      } else {
        localStorage.setItem("Token", data.token);
        // sessionStorage.setItem("isConnected", JSON.stringify(true));
        document.location.href = "./index.html";
      }
    });
};


// console.log(formInfo);
formInfo.addEventListener("submit", (e) => {
  e.preventDefault();
  connect();

  
});

