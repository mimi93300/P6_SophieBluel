// Variables globales
let works = [];
let categories = [];

const filter = document.querySelector(".filters");
const gallery = document.querySelector(".gallery");

const galleryM = document.createElement("div");


const closeIcon = document.querySelector(".close");
//const containerModal = document.querySelector(".containerModal");

let containerModal

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
    const adminToken = sessionStorage.getItem("Token")
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${adminToken}`,
     },
    });
    if (response.ok) {
      console.log(`Le travail avec l'ID ${workId} a été supprimé avec succès.`);
      //return await response.json(); // Convertit la réponse en JSON
      await displayModalWorks();
      await displayWorks(); // Mettre à jour la galerie principale

    } else {
      console.error('Erreur lors de la suppression du travail:', response.statusText);
      //return null; // Retourne null en cas d'erreur
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du travail:', error);
    //return null; // Retourne null en cas d'erreur
  }
}

async function postWorks(image, title, category, Token) {
  const adminToken = sessionStorage.getItem("Token"); // Récupération du token depuis la session
  let errorResponse;
  try {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);

    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${adminToken}`, // Utilisation du token récupéré depuis la session
      },
      body: formData,
    });

    if (!response.ok) {
      errorResponse = await response.status;
      console.error("Erreur lors de l'ajout de projet :", errorResponse);
      throw new Error(
        `Erreur lors de l'ajout du projet (status ${response.status})`
      );
    }
  } catch (error) {
    if (errorResponse === 401) {
      // Gérer le cas d'une erreur d'authentification
      window.location.href = "./login.html";
      sessionStorage.clear();
    }
    console.error("Erreur lors de l'ajout du projet :", error.message);
    throw error;
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

//Mode administrateur de la page
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
  icon.classList.add("fa-regular", "fa-pen-to-square");
  const modEdition = document.createElement("p");
  modEdition.innerHTML = "Mode édition"
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
 // Ajout d'un écouteur d'événement pour le click sur l'icône
 const filter = document.querySelector(".filters")
    filter.remove()
    modifier.addEventListener("click", () => {
      // Afficher la modal au milieu
      containerModal = document.createElement("div");
      containerModal.classList.add("containerModal");
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
    trashIcon.className = "fa-solid fa-trash-can";
    trashIcon.addEventListener("click", async () => {
      try {
        await deleteWork(work.id); // Suppression de l'œuvre lors du clic sur l'icône de la corbeille
        // Mettre à jour l'affichage après la suppression
       
      } catch (error) {
        console.error("Erreur lors de la suppression de l'œuvre :", error);
        // Gérer l'erreur, par exemple afficher un message à l'utilisateur
      }
    });

    // Ajout des éléments à la figure
    figure.appendChild(img);
    figure.appendChild(trashIcon);
    
    // Ajout de la figure à la galerie
    gallery.appendChild(figure);
  });
}



//Affiche la 1ere modale
function displayModal() {
  
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

  closeModal();
  btnAdd.addEventListener("click", function() {
    aside.remove();
    displayModal2();
 });
}



//function pour prévisualiser l'image dans le formulaire de la modale2
const previewImage = () => {
  const input = document.querySelector("#uploadImage");
  const preview = document.querySelector("#previewImage img");
  const file = input.files;

  if (file) {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      preview.setAttribute("src", event.target.result);
    };
    const iconDisplay = document.querySelector("#iconDisplay");
    const pDisplay = document.querySelector("#pDisplay");
    const spanDisplay = document.querySelector("#spanDisplay");
    const imgDisplay = document.querySelector("#imgPreview");

    if (iconDisplay || pDisplay || spanDisplay) {
      iconDisplay.style.display = "none";
      pDisplay.style.display = "none";
      spanDisplay.style.display = "none";
      imgDisplay.style.display = "block";
    }
    fileReader.readAsDataURL(file[0]);
  }
};
//Fonction qui active ou non le bouton SUbmit
function toggleSubmitButton() {
  // Récupérer les éléments du formulaire
  const previewImageInput = document.querySelector("#uploadImage");
  const formSelectInput = document.querySelector("#select");
  const formTitleInput = document.querySelector("#title");
  const btnSubmit = document.querySelector("#btnSubmit");

  // Vérifier si le formulaire est valide
  const formValid =
    previewImageInput.files.length > 0 &&
    formSelectInput.value.trim() !== "" &&
    formTitleInput.value.trim() !== "";

  // Activer ou désactiver le bouton en fonction de la validation du formulaire
  btnSubmit.disabled = !formValid;
  btnSubmit.classList.toggle("enabled", formValid);

  // Ajouter un écouteur d'événements click au bouton btnSubmit
  btnSubmit.addEventListener("click", () => {
    // Vérifier à nouveau si le formulaire est valide avant d'appeler postWorks()
    if (formValid) {
      postWorks(); // Appeler la fonction postWorks() si le formulaire est valide
    }
  });
}


//2e page de modale pour ajout de photo
function displayModal2() {
  // Afficher la modal au milieu
  const aside = document.createElement("aside");
  aside.classList.add("modifyWork");
  const modalTitle2 = document.createElement("h3");
  modalTitle2.innerHTML = "Ajout photo";
  const closeIcon = document.createElement("i");
  closeIcon.classList.add("fa-solid", "fa-xmark", "close");
  const arrowIcon = document.createElement("i");
  arrowIcon.classList.add("fa-solid", "fa-arrow-left", "arrowReturn");
  const borderLine = document.createElement("hr");
  const btnValider = document.createElement("div");
  btnValider.innerHTML = "Valider";
  btnValider.id = "btnSubmit";

  // Créer le formulaire à l'intérieur d'un conteneur div
  const formContainer = document.createElement("div");
  formContainer.appendChild(createFormModal());

  // Ajouter les éléments à la modal
  aside.append(modalTitle2, formContainer, closeIcon, arrowIcon, borderLine, btnValider);

  containerModal.appendChild(aside);

  closeModal();

  arrowLeft();

  toggleSubmitButton();

}



function closeModal() {
  const containerModal = document.querySelector(".containerModal");
  const modifyWork = document.querySelector(".modifyWork");

  document.querySelector(".fa-xmark").addEventListener("click", (event) => {
    containerModal.remove();
  });

  containerModal.addEventListener("click", (event) => {
    if (event.target === containerModal) {
      containerModal.remove();
    }
  });
}



function arrowLeft() {
  const returnModal1 = document.querySelector(".arrowReturn");
  const modifyWork = document.querySelector(".modale")
  //Événement au click pour retourner à la page précedente

  document.querySelector(".fa-arrow-left").addEventListener("click", (event) => {
    modifyWork.remove();
  });

  modifyWork.addEventListener("click", (event) => {
    if (event.target === modifyWork) {
      modifyWork.remove();
    }
  });
}





// Fonction pour créer le formulaire de la modale d'ajout de photo
function createFormModal() {
  const form = document.createElement("form");

  const fileLabel = document.createElement("label");
  fileLabel.id = "previewImage";
  fileLabel.htmlFor = "uploadImage";

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.id = "uploadImage";
  fileInput.addEventListener("change", previewImage);

  const imagePreview = document.createElement("img");
  imagePreview.src = "";
  imagePreview.id = "imgPreview";

  const iconImage = document.createElement("i");
  iconImage.classList.add("fa-regular", "fa-image");
  iconImage.id = "iconDisplay";

  const paraText = document.createElement("p");
  paraText.innerHTML = "+ Ajouter photo";
  paraText.id = "pDisplay";

  const spanText = document.createElement("span");
  spanText.textContent = "jpg, png : 4mo max";
  spanText.id = "spanDisplay";

  fileLabel.append(fileInput, imagePreview, iconImage, paraText, spanText);

  const titleLabel = document.createElement("label");

  titleLabel.textContent = "Titre";
  titleLabel.classList.add("labelTitle");

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "title";

  const selectLabel = document.createElement("label");

  selectLabel.textContent = "Catégorie";

  const selectInput = document.createElement("select");
  selectInput.id = "select";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  selectInput.appendChild(defaultOption);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.text = category.name;
    selectInput.appendChild(option);
  });

  form.append(fileLabel, titleLabel, titleInput, selectLabel, selectInput);

  // Ajoutez un gestionnaire d'événements de soumission de formulaire
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    // Récupérez les valeurs du formulaire
    const image = fileInput.files[0];
    const title = titleInput.value;
    const category = selectInput.value;

    // Récupérez le token d'authentification depuis la session
    const dataToken = sessionStorage.getItem("Token");

    // Appelez la fonction postWorks avec les données du formulaire
    try {
      await postWorks(image, title, category, dataToken);
      // Gérer le succès de l'ajout du projet (par exemple, fermer la modale)
    } catch (error) {
      // Gérer les erreurs (par exemple, afficher un message d'erreur à l'utilisateur)
    }
  });

  fileInput.addEventListener("change", toggleSubmitButton);
  titleInput.addEventListener("input", toggleSubmitButton);
  selectInput.addEventListener("input", toggleSubmitButton);

  return form;
}















