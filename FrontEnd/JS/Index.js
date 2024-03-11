// Variables globales
let works = [];
let categories = [];

const filter = document.querySelector(".filters");
const gallery = document.querySelector(".gallery");

const galleryM = document.createElement("div");


const closeIcon = document.querySelector(".close");
const containerModal = document.querySelector(".containerModal");

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

async function deleteWork(workId) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      console.log(`Le travail avec l'ID ${workId} a été supprimé avec succès.`);
      return await response.json(); // Convertit la réponse en JSON
    } else {
      console.error('Erreur lors de la suppression du travail:', response.statusText);
      return null; // Retourne null en cas d'erreur
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du travail:', error);
    return null; // Retourne null en cas d'erreur
  }
}



//Fonction qui permet d'afficher les works dans la galerie
async function displayWorks(categorieId) {
  works = await fetchWorks();
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

function modifyHomePageForAdmin() {
  //Gestion logout
  const login = document.querySelector(".loginPage");
  login.innerHTML = "logout";
  login.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.removeItem("Token");
    window.location.href = ("index.html")
  });
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

 async function displayModalWorks() {
  const gallery = document.querySelector(".galleryModal");
  gallery.innerHTML = "";
  works = await fetchWorks();
  works.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = work.imageUrl;
    const trashIcon = document.createElement("i");
    trashIcon.className = "fa-light fa-trash-can";
    
    trashIcon.addEventListener("click", () => {
      // Appeler la fonction deleteWork lorsque l'icône de suppression est cliquée
      deleteWork(figure, img);
    });

    figure.appendChild(img);
    figure.appendChild(trashIcon);
    gallery.appendChild(figure);
  });
}

function deleteWork(figure, img) {
  // Supprimer l'élément de la modale
  figure.remove();
  img.remove();

  // Sélectionner l'élément correspondant dans la galerie principale
  const correspondingElement = document.querySelector(`[data-id="${figure.dataset.id}"]`);

  // Vérifier si l'élément correspondant existe dans la galerie principale
  if (correspondingElement) {
    // Supprimer l'élément correspondant de la galerie principale
    correspondingElement.remove();
  }
}


function displayModal() {
  // Afficher la modal au milieu
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
  const borderLine = document.createElement("hr");
  const btnAdd = document.createElement("div");
  btnAdd.innerHTML = "Ajouter une photo";
  btnAdd.id = "btnAdd";
  aside.append(modalTitle, closeIcon, gallery, borderLine, btnAdd);
  containerModal.appendChild(aside);
  document.body.appendChild(containerModal);
  
  //Appeler la fonction pour afficher les travaux
  displayModalWorks();


  btnAdd.addEventListener("click", function() {
    displayModal2();
   
 });
}





 function displayModal2() {
  // Afficher la modal au milieu
const containerModal = document.createElement("div");
containerModal.classList.add("containerModal");
const aside = document.createElement("aside");
aside.classList.add("modifyWork");
const modalTitle2 = document.createElement("h3");
modalTitle2.innerHTML = "Ajout photo";
const closeIcon = document.createElement("i");
closeIcon.classList.add("fa-solid", "fa-xmark", "close");
const arrowIcon = document.createElement("i");
arrowIcon.classList.add("fa-solid", "fa-arrow-left", "arrowReturn");

const formElement = document.createElement('div');
formElement.classList.add('form');
formElement.setAttribute('enctype', 'multipart/form-data');
formElement.setAttribute('action', '#');
formElement.setAttribute('method', 'post');
const gallery2 = document.createElement("div");
gallery2.classList.add("ajouterPhoto");
const iconElement = document.createElement('i');
iconElement.classList.add('fa', 'fa-regular', 'fa-image', 'fa-5x');
const labelElement = document.createElement('label');
labelElement.id = 'btnAddPicture';
labelElement.setAttribute('for', 'filePicture');
labelElement.textContent = '+ Ajouter photo';
const inputElement = document.createElement('input');
inputElement.type = 'file';
inputElement.name = 'image';
inputElement.id = 'filePicture';
inputElement.multiple = true;
inputElement.accept = 'images/*';
inputElement.required = true;
const paragraphElement = document.createElement('p');
paragraphElement.textContent = 'jpg, png : 4mo max';
const addPhoto = document.getElementById("ajouterPhoto");

const borderLine = document.createElement("hr");
const btnValider = document.createElement("div");
btnValider.innerHTML = "Valider";
btnValider.id = "btnSubmit";
aside.append(modalTitle2, closeIcon, arrowIcon, formElement, borderLine, btnValider);
containerModal.appendChild(aside);
document.body.appendChild(containerModal);
addPhoto.appendChild(iconElement);
addPhoto.appendChild(labelElement);
addPhoto.appendChild(inputElement);
addPhoto.appendChild(paragraphElement);
formElement.appendChild(gallery2);
formElement.appendChild(iconElement);
formElement.appendChild(labelElement);
formElement.appendChild(inputElement);
formElement.appendChild(paragraphElement);

 // Code pour afficher la modale au millieu de la page
 containerModal.style.display = "block";
 containerModal.style.position = "fixed";
 containerModal.style.top = "50%";
 containerModal.style.left = "50%";
 containerModal.style.transform = "translate(-50%, -50%)";
 // la modal précédente est masquée
 aside.style.display = "none";
}






// Gestionnaire d'événements pour la fermeture de la modale
closeIcon.addEventListener("click", () => {
  
  modifyHomePageForAdmin(); // Appeler la fonction pour modifier la page pour l'administrateur
});

// Gestionnaire d'événements pour le clic sur le fond sombre pour fermer la modale
containerModal.addEventListener("click", () => {
  
  modifyHomePageForAdmin(); // Appeler la fonction pour modifier la page pour l'administrateur
});







/*
async function deleteWork(workId) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      // Work supprimé avec succès
      console.log(`Le work avec l'ID ${workId} a été supprimé.`);
    } else {
      // Gérer les erreurs en cas de problème de suppression
      console.error('Erreur lors de la suppression du work.');
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la suppression du work : ', error);
  }
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
