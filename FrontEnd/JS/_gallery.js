//Mes imports pour le bon fonctionnement de l'affichage
import { fetchWorks, fetchCategories } from './apiCalls.js';

import { works, categories, filter, gallery, containerModal, closeIcon } from './Index.js';


export async function displayWorks(gallery, categorieId) {
  const works = await fetchWorks();
  gallery.innerHTML = ""; // Vider la galerie actuelle
  works.forEach((work) => {
    if (categorieId == work.category.id || categorieId == null) {
      const workContainer = document.createElement("figure");
      workContainer.classList.add("work-container");
      workContainer.setAttribute("data-id", work.id); // Ajout de l'attribut data-id
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

export async function displayFilter(filter, gallery) {
  const categories = await fetchCategories();
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