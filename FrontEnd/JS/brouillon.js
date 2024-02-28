// Fonction pour créer les boutons de filtre et gérer les événements
async function createFilterButtons() {
    const categories = await fetchCategories();
    const filtersContainer = document.querySelector('#portfolio .filters');
    filtersContainer.innerHTML = ""; // Vider les filtres existants
  
    // Création du bouton "Tous" et gestion de son événement
    const allBtn = document.createElement('span');
    allBtn.textContent = 'Tous';
    allBtn.classList.add('filter-btn', 'active');
    allBtn.addEventListener('click', async () => {
      addWorksToGallery(allWorks); // Afficher tous les travaux
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      allBtn.classList.add('active');
    });
    filtersContainer.appendChild(allBtn);
  
    // Création des boutons pour chaque catégorie
    categories.forEach(category => {
      const btn = document.createElement('span');
      btn.textContent = category.name;
      btn.classList.add('filter-btn');
      
      btn.addEventListener('click', () => {
        const categoryName = category.name; // Utilisation d'une variable locale pour stocker le nom de la catégorie
        const filteredWorks = allWorks.filter(work => work.category === categoryName);
        
        // Ajouter la ligne suivante pour vider la galerie existante
        document.querySelector('.gallery').innerHTML = "";
        
        // Afficher les travaux filtrés dans la galerie
        addWorksToGallery(filteredWorks);
        
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
       });
       console.log();
      
      filtersContainer.appendChild(btn);
    });
  // Ecouteur d'événement sur le bouton Objets
  document.getElementById('1').addEventListener('click', async () => {
    const categories = await fetchCategories(1);
    // Effacer les travaux précédemment affichés
    document.getElementById('work-container').innerHTML = '';
    const travauxObjets = travaux.filter(travail => travail.categorie === 'objets');
    // Mettre à jour l'affichage avec les travauxObjets
   });
   // Ecouteur d'événement sur le bouton Appartements
   document.getElementById('2').addEventListener('click', async () => {
    const categories = await fetchCategories(2);
    // Effacer les travaux précédemment affichés
    document.getElementById('work-container').innerHTML = '';
    const travauxAppartements = travaux.filter(travail => travail.categorie === 'appartements');
    // Mettre à jour l'affichage avec les travauxAppartements
   });
   // Ecouteur d'événement sur le bouton Hôtels et restaurants
   document.getElementById('3').addEventListener('click', async () => {
    const categories = await fetchCategories(3);
    // Effacer les travaux précédemment affichés
    document.getElementById('work-container').innerHTML = '';
    const travauxHotelsRestaurants = travaux.filter(travail => travail.categorie === 'hotels-restaurants');
    // Mettre à jour l'affichage avec les travauxHotelsRestaurants
   });
    
  }//