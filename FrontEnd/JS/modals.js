import { works, categories, filter, gallery, containerModal, closeIcon } from './Index.js';

export function displayModal() {
    // Fonction pour afficher la modale 1
    
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
  }

  // modals.js

  //Affichage des works dans la gallerie modale
export async function displayModalWorks() {
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
  
  
  export function displayModal2() {
    // Fonction pour afficher 2e page de modale pour ajout de photo
    const aside = document.createElement("aside");
    aside.classList.add("modifyWork");
    const modalTitle2 = document.createElement("h3");
    modalTitle2.innerHTML = "Ajout photo";
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fa-solid", "fa-xmark", "close");
    const arrowIcon = document.createElement("i");
    arrowIcon.classList.add("fa-solid", "fa-arrow-left", "arrowReturn");
   
  
    // Créer le formulaire à l'intérieur d'un conteneur div
    const formContainer = document.createElement("div");
    formContainer.appendChild(createFormModal());
  
    // Ajouter les éléments à la modal
    aside.append(modalTitle2, formContainer, closeIcon, arrowIcon);
  
    containerModal.appendChild(aside);
  
    closeModal();
  
    arrowLeft();
  
    toggleSubmitButton();
    

  }
  
  export function closeModal() {
    // Fonction pour fermer la modale
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
  
  export function arrowLeft() {
    // Fonction pour gérer le bouton de retour dans la modale 2
    const returnModal1 = document.querySelector(".arrowReturn");
    const modifyWork = document.querySelector(".modifyWork")
    returnModal1.addEventListener("click", (event) => {
  
        displayModal();  
        modifyWork.remove();
       
      });
  }
  
  export function createFormModal() {
    // Fonction pour créer le formulaire de la modale d'ajout de photo dans la gallerie
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

  const borderLine = document.createElement("hr");
  const btnValider = document.createElement("button");
  btnValider.innerHTML = "Valider";
  btnValider.type = "submit";
  btnValider.id = "btnSubmit";

  form.append(fileLabel, titleLabel, titleInput, selectLabel, selectInput,borderLine,btnValider);

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

  // modals.js

export function previewImage() {
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
  }
  
  export function toggleSubmitButton() {
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
  }
  
  