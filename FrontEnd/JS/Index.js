// Fonction pour récupérer les données depuis l'API
async function fetchData() {
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

// Variables globales
let allWorks = [];
const categories = fetchCategories();

console.log(categories);


// Fonction pour afficher les travaux dans la galerie
function addWorksToGallery(works) {
 const gallery = document.querySelector(".gallery");
 gallery.innerHTML = ""; // Vider la galerie actuelle
 works.forEach((work) => {
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
 });
}
// Fonction pour créer les boutons de filtre et gérer les événements
async function createFilterButtons() {
 const filter = document.querySelector(".filters");
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
}
// Fonction principale
async function main() {
 allWorks = await fetchData();

 addWorksToGallery(allWorks);
 
 createFilterButtons();
}
// Appel de la fonction principale
main();









