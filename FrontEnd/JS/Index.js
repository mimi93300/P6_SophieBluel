// Variables globales
let works = [];
let categories = [];

const filter = document.querySelector(".filters");
const gallery = document.querySelector(".gallery");


/*console.log(categories);*/

// Fonction principale
async function main() {
  
    displayFilter(categories);

 
    displayWorks();
   // Vérifier si l'utilisateur est connecté en tant qu'administrateur
   const dataToken = sessionStorage.getItem("Token");
   if (dataToken) {
     // Si l'utilisateur est connecté en tant qu'administrateur, modifier la page d'accueil
     modifyHomePageForAdmin();

     

   }

  
 
}
// Appel de la fonction principale
main();


// Fonction pour récupérer les données depuis l'API
async function fetchWorks() {
 try {
   const response = await fetch("http://localhost:5678/api/works");
   return await response.json();
 } catch (error) {
   console.error("Erreur lors de la récupération des données :", error);
   return [];
 }
}

async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    return [];
  }
}



// Fonction pour afficher les travaux dans la galerie
async function displayWorks(categorieId) {
  works = await fetchWorks();
  gallery.innerHTML = ""; // Vider la galerie actuelle
  works.forEach((work) => {
  if (categorieId == work.category.id || categorieId == null) {
    const workContainer = document.createElement("figure");
    workContainer.classList.add("work-container");
    const workImage = document.createElement("img");
    workImage.setAttribute("src", work.imageUrl);
    workImage.setAttribute("alt", work.title);
    const workTitle = document.createElement("figcaption");
    workTitle.textContent = work.title;
    workContainer.appendChild(workImage);
    workContainer.appendChild(workTitle);
    gallery.appendChild(workContainer);
  }  
  });
}

// Fonction pour créer les boutons de filtre et gérer les événements
async function displayFilter() {
 categories = await fetchCategories();
 const filterAll = document.createElement("li");
 filterAll.innerHTML = "Tous";
 filterAll.classList.add("focusBtn");
 filter.appendChild(filterAll);
 categories.forEach((category) => {
  const filterButton = document.createElement("li");
  filterButton.innerHTML = category.name;
  filterButton.id = category.id;
  filter.appendChild(filterButton);
  
 });


//Ajout d'un event au clic sur chaque bouton//
const buttons = document.querySelectorAll(".filters li");
buttons.forEach((button)=> {
  button.addEventListener("click", function () {
    let categorieId = button.getAttribute("id");
    buttons.forEach((button) => button.classList.remove("focusBtn"));
    button.classList.add("focusBtn");
    displayWorks(categorieId);
  });
});

}

function displayModal() {
  //afficher la modal au millieu

const containerModal = document.createElement("div");
containerModal.classList.add("containerModal");


  const aside = document.createElement("aside");
  aside.classList.add("modale");
  const modalTitle = document.createElement("h3");
  modalTitle.innerHTML = "Galerie photo";
  const closeIcon = document.createElement("i");
  closeIcon.classList.add("fa-solid", "fa-xmark", "close");
  const gallery = document.createElement("div");
  gallery.classList.add("galleryModal");
  const borderLine = document.createElement("tr");
  const btnAdd = document.createElement ("div");
  btnAdd.innerHTML = "Ajouter une photo";
  btnAdd.id = "btnAdd";
  
  aside.append(modalTitle, closeIcon, gallery, borderLine, btnAdd);
  containerModal.appendChild(aside);
  document.body.appendChild(containerModal);
 }



function modifyHomePageForAdmin() {
  const login = document.querySelector(".loginPage");
  login.innerHTML = "logout"
  const body = document.querySelector("body");

  const blackspaceDiv = document.createElement("div");
  blackspaceDiv.classList.add("blackspace")
  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-pen-square");
  const modEdition = document.createElement("p");
  modEdition.innerHTML = "Mode édition"
  body.prepend(blackspaceDiv);
  blackspaceDiv.append(icon, modEdition);
  
  const modifier = document.createElement("div");

  modifier.classList.add("modifier");
  const icon2 = document.createElement("i");
  icon2.classList.add("fas", "fa-pen-square");
  const btnModifier = document.createElement("p");
  btnModifier.innerHTML = "modifier";
  modifier.append(icon2, btnModifier);

  const portfolio = document.querySelector("#portfolio");
  const portfolioH2 = portfolio.querySelector("h2");

  portfolioH2.insertAdjacentElement("afterend", modifier);
 // Ajout d'un écouteur d'événement pour le click sur l'icône
    
    modifier.addEventListener("click", () => {
    displayModal();
 });
 }














/*

//MODALE//

const dataToken = sessionStorage.getItem("Token");

const shadow = document.querySelector(".shadow")
// console.log(shadow);

const iconElement = document.querySelector(".fa-regular.fa-pen-to-square");

const galleryModal = document.getElementById("galleryModal");

  // modification de la page d'accueil après connexion //
if (dataToken) {
  // console.log(login);
  logout.style.display = "inherit";
  login.style.display = "none";
  blackspace.style.visibility = "visible";
  iconElement.style.visibility = "visible";
  document.getElementById("modify-p").style.visibility = "visible";
  filterAll.style.display = "none";
   // Redirection vers la page d'accueil
 window.location.href = "FrontEnd/index.html"; 
}};


//-------déconnexion---------//

const deconnect = (e) => {
  e.preventDefault()
  sessionStorage.clear();
  document.location.href = "./index.html";
  logout.style.display = "none";
  login.style.display = "inherit";
  blackspace.style.visibility = "hidden";
  iconElement.style.visibility = "hidden";
  filterAll.style.display = "block";
};
logout.addEventListener("click", deconnect);


//Affichage de la modale au click// 
 //--fonction pour générer la galerie dans la modale--//


 iconElement.addEventListener("click", async function() {
  const modalElement = document.getElementById("modale");
  modalElement.style.display = "block";
  shadow.style.display = "block";
  galleryModal.innerHTML = "";
  const response = await fetch('http://localhost:5678/api/works');
  const works = await response.json();
  
  works.forEach(work => {
    const workElement = document.createElement("div");
    workElement.classList.add("work");
    
    const workImage = document.createElement("img");
    workImage.src = work.image;
    workImage.alt = work.title;
    workImage.classList.add("work-thumbnail");
    workElement.appendChild(workImage);
    const workTitle = document.createElement("h3");
    workTitle.textContent = work.title;
    workElement.appendChild(workTitle);
    
    galleryModal.appendChild(workElement);
  });
 });*/


