import { works, categories, filter, gallery, containerModal, closeIcon } from './Index.js';

export async function fetchWorks() {
    // Fonction pour récupérer les œuvres depuis l'API
    try {
        const response = await fetch("http://localhost:5678/api/works");
        return await response.json();
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        return [];
      }
  }
  


  export async function fetchCategories() {
    // Fonction pour récupérer les catégories depuis l'API
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        return await response.json();
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
        return [];
      }
  }

    //Ajout d'un Works dans la galerie//
export async function postWorks(image, title, category, Token) {
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
  
      if (response.ok) {
        displayWorks();
        containerModal.remove();
        displaySuccessMessage("Le travail a été ajouté avec succès."); // Appel de la fonction displaySuccessMessage ici
      } else {
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

  
  export async function deleteWork(workId) {
    // Fonction pour supprimer une œuvre via l'API
    try {
        const adminToken = sessionStorage.getItem("Token");
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
          method: 'DELETE',
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${adminToken}`,
         },
        });
        if (response.ok) {
          console.log(`Le travail avec l'ID ${workId} a été supprimé avec succès.`);
          // Afficher un message de suppression réussie à l'utilisateur
          displaySuccessMessage("Le travail a été supprimé avec succès.");
          await displayModalWorks();
          await displayWorks(); // Mettre à jour la galerie principale
    
        } else {
          console.error('Erreur lors de la suppression du travail:', response.statusText);
          // Afficher un message d'erreur à l'utilisateur
          displayErrorMessage("Erreur lors de la suppression du travail.");
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du travail:', error);
        // Afficher un message d'erreur à l'utilisateur
        displayErrorMessage("Erreur lors de la suppression du travail.");
      }
    }
    
    function displaySuccessMessage(message) {
      // Afficher un message de succès à l'utilisateur sous forme d'alerte
      alert(message);
    }
    
    function displayErrorMessage(message) {
      // Afficher un message d'erreur à l'utilisateur sous forme d'alerte
      alert(message);
  }
  
  export async function postWorks(image, title, category, Token) {
    // Fonction pour ajouter une œuvre via l'API
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

    if (response.ok) {
      displayWorks();
      containerModal.remove();
      displaySuccessMessage("Le travail a été ajouté avec succès."); // Appel de la fonction displaySuccessMessage ici
    } else {
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