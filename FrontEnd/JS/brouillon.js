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
}

    

    // Appeler la fonction pour afficher les travaux
    displayWorks().then(works => {
      works.forEach(work => {
        //Afficher chaque image sans titre
        const img = document.createElement("img");
        img.src = work.imageUrl;
        gallery.appendChild(img);
      });
    });
   }

   <aside class="modifyWork" role="dialog">
   <h3>Ajout Photo</h3>
   <i class="fa-solid fa-arrow-left arrowReturn"></i>
   <i class="fa-solid fa-xmark close"></i>

   <form id="dataForm" enctype="multipart/form-data" action='#' method="post">

       <div class="ajouterPhoto">
           <i class="fa-regular fa-image fa-5x"></i>
           <label id="btnAddPicture" for="filePicture">+ Ajouter photo</label>
           <input type="file" name="image" id="filePicture" multiple accept="images/*" required />
           
           <p>jpg, png : 4mo max</p>
       </div>


       <label for="title">Titre</label>
       <input type="text" id="title" name="title" required>
       <label for="categorieStyle">Catégorie</label>
       <select name="category" id="categorieStyle"  required>
           <option value=""></option>
           <option value="1">Objets</option>
           <option value="2">Appartements</option>
           <option value="3">Hôtels & Restaurants</option>
       </select>
       <img id="previewPicture" alt="image prévisualisée"></img>
   
       <div class="border-bottom"></div>



       <input type="submit" value="Valider" id="btnSubmit">
   </form>


</aside>