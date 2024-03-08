const formInfo = document.querySelector("#contact form");
formInfo.addEventListener("submit", (e) => {
 e.preventDefault();
 connect();
});
const connect = () => {
 const formData = new FormData(formInfo);
 const dataUser = Object.fromEntries(formData);
 fetch("http://localhost:5678/api/users/login", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(dataUser),
 })
   .then((response) => {
     if (response.ok) {
       return response.json();
     } else {
       
         throw new Error("Erreur dans l’identifiant ou le mot de passe");

     }  
   })
   .then((data) => {
     sessionStorage.setItem("Token", data.token);
     document.location.href = "./index.html"; // Redirection vers la page d'accueil
   })
   .catch((error) => {
    console.log(error.message);
     alert("Erreur dans l’identifiant ou le mot de passe");
     formInfo.reset();
   });
};