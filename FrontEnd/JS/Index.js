// Variables globales
let works = [];
let categories = [];

const filter = document.querySelector(".filters");
const gallery = document.querySelector(".gallery");

console.log(categories);

// Fonction principale
async function main() {
  
  displayFilter(categories);

 
  displayWorks();
 
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

//MODALE//

const dataToken = sessionStorage.getItem("Token");

const shadow = document.querySelector(".shadow")
// console.log(shadow);

  // modification de la page d'accueil après connexion //
if (dataToken) {
  // console.log(login);
  logout.style.display = "inherit";
  logout.style.display = "inherit"
  login.style.display = "none";
  blackspace.style.visibility = "visible";
  modifier i p.style.visibility = "visible";
  filters.style.display = "none";
}

//Affichage de la modale au click//

const modif = document.querySelector(".modifier i");

  modif.addEventListener("click" function() {

  })











