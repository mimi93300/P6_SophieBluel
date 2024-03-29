import { works, categories, filter, gallery, containerModal, closeIcon } from './Index.js';

export function modifyHomePageForAdmin() {
    // Fonction pour modifier la page d'accueil en mode administrateur
    // Gestion logout
  const login = document.querySelector(".loginPage");
  login.innerHTML = "logout";
  login.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.removeItem("Token");
    window.location.href = ("index.html")
  });
  

  const body = document.querySelector("body");
  const blackspaceDiv = document.createElement("div");
  blackspaceDiv.classList.add("blackspace");
  const icon = document.createElement("i");
  icon.classList.add("fa-regular", "fa-pen-to-square");
  const modEdition = document.createElement("p");
  modEdition.innerHTML = "Mode édition";
  body.prepend(blackspaceDiv);
  blackspaceDiv.append(icon, modEdition);
  
  const modifier = document.createElement("div");
  modifier.classList.add("modifier");
  const icon2 = document.createElement("i");
  icon2.classList.add("fa-regular", "fa-pen-to-square");
  const btnModifier = document.createElement("p");
  btnModifier.innerHTML = "modifier";
  modifier.append(icon2, btnModifier);
  
  const portfolio = document.querySelector("#portfolio");
  const portfolioH2 = portfolio.querySelector("h2");
  portfolioH2.insertAdjacentElement("afterend", modifier);
  
  // Ajout d'un écouteur d'événement pour le clic sur l'icône
  modifier.addEventListener("click", () => {
    // Afficher la modal au milieu
    containerModal = document.createElement("div");
    containerModal.classList.add("containerModal");
    displayModal();

  });
  }
  