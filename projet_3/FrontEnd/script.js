const gallery = document.getElementById("gallery");
const filtersHtml = document.getElementById("filtres");

// _________________________________1____Récupérer dynamiquement les travaux_________________________________

// __ Créer un tableau des travaux
let allWorks = [];

//__ Récupérer les travaux avec la méthode GET de FETCH
const fetchWorks = () => {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      response
        .json()
        .then((response) => {
          allWorks = response;
          showAllWorks(allWorks);
        })
        .catch((error) => console.log("les travaux n'ont pas pu être chargés"));
    })
    .catch((error) => console.log("les travaux n'ont pas pu être chargés"));
};

//__Afficher les travaux en créant le code HTML
const showAllWorks = (array) => {
  let allWorksHtml = "";

  array.forEach(
    ({ imageUrl, title }) =>
      (allWorksHtml += `
    <article>
    <img src=${imageUrl} alt=${title} crossorigin="anonymous">
    </img>
    <figcaption>
    ${title}
    </figcaption>
    </article>
    `)
  );
  gallery.innerHTML = allWorksHtml;
};
fetchWorks();
document.addEventListener("DOMContentLoaded", fetchWorks);

// _________________________________2____Mettre en place les filtres par catégorie_________________________________

// __1_Créer les boutons filtres dynamiquement :

// Récupérer les catégories avec la méthode GET
let categories = [];

const fetchCategories = () => {
  fetch("http://localhost:5678/api/categories").then((response1) =>
    response1
      .json()
      .then((data) => {
        categories = data;
        showAllCategories(categories);
      })
      .catch((error) =>
        console.log("les catégories n'ont pas pu être récupérées")
      )
  );
};

// Créé les boutons des filtres dans le code html

const showAllCategories = (categories) => {
  // Bouton "tous"
  let categoriesHtml = `<button id="filterBtn_tous" class="filtersButtons">Tous</button>`;

  // Boucle pour que chaque catégorie récupérée créé un bouton et le selectionne
  categories.forEach(({ id, name }) => {
    categoriesHtml += `<button id="filterBtn_${id}" class="filtersButtons">${name}</button>`;
  });

  filtersHtml.innerHTML = categoriesHtml;

  // Séléctionne tous les boutons
  const filtersButtons = document.querySelectorAll(".filtersButtons");
  // Séléctionne btn tous
  const filterBtnTous = document.getElementById("filterBtn_tous");

  // Boucle pour évènement click
  filtersButtons.forEach(function (btn) {
    // si on clique sur "tous" ....
    if (btn == filterBtn_tous) {
      btn.addEventListener("click", function () {
        filterBtnTous.classList.add("selected");
        filtersButtons.forEach(function (btn) {
          if (btn != filterBtnTous) {
            btn.classList.remove("selected");
          }
        });
        fetchWorks();
      });
    }

    // si on clique sur un autre bouton, afficher que les travaux dont la categoryId = à la catégorie du bouton
    else {
      btn.addEventListener("click", function () {
        btn.classList.add("selected");

        // Supprimer le fond vert des boutons qui ne sont pas cliqués
        filtersButtons.forEach(function (otherBtn) {
          if (otherBtn != btn) {
            otherBtn.classList.remove("selected");
          }
        });

        const filteredWorks = allWorks.filter(function (work) {
          return work.categoryId == categories[btn.id.slice(-1) - 1].id;
        });
        showAllWorks(filteredWorks);
      });
    }

    // le bouton reste vert tant qu'on a pas cliqué sur un autre filtre
  });
};

fetchCategories(categories);

// _________________________________3____Créer la page de connexion_________________________________
// Dans les fichiers login.html et login.js

//_________________________________4____Créer la modale_________________________________

// ___Redirection vers la page d'accueil si connexion réussie, et ajout de la bande noire

// Vérifie qu'un token est stocké dans le session storage :
const token = sessionStorage.getItem("token");

if (token !== null) {
  const header = document.getElementById("header");
  const blackElement = document.createElement("nav");
  blackElement.id = "blackElement";
  // Modification CSS sur le header
  header.style.flexWrap = "wrap";
  header.style.marginTop = 0;
  // Ajout du contenu de la bande noire
  blackElement.innerHTML += `
  <div id="txtBlackElement">
  <p id="modeEdition"><i class="fa-regular fa-pen-to-square" id="logoMode"></i>Mode édition</p>
  <button id="publier">publier les changements</button>
  </div>
  `;
  // Rattacher la bande noire au DOM
  let blackElementHtml = header.insertBefore(
    blackElement,
    document.getElementById("sophie-bluel-title")
  );
  // Cacher les filtres
  filtersHtml.style.visibility = "hidden";
  //Ajouter bouton modifier
  const portfolio = document.getElementById("portfolio");
  const mesProjets = document.getElementById("mesProjets");
  const btnModifier = document.createElement("button");
  btnModifier.id = "btnModifier";
  btnModifier.innerHTML += ` <a href=#modal1 id="lienModifier"><i class="fa-regular fa-pen-to-square" id="logoModifier"></i><p id="pModifier">modifier</p></a>`;
  let btnModifierHtml = mesProjets.appendChild(btnModifier);
  // Modifier CSS pour positionner le bouton modifier
  mesProjets.style.display = "flex";
  mesProjets.style.justifyContent = "center";
  mesProjets.style.width = "100%";
  //Ajout bouton modifier photo présentation
  const sophieBluelFigure = document.getElementById("sophie-bluel-figure");
  let btnModifier_1 = document.createElement("span");
  btnModifier_1.id = "btnModifier_1";
  btnModifier_1.innerHTML += ` <a href=# id="lienModifier_1"><i class="fa-regular fa-pen-to-square" id="logoModifier"></i><p id="pModifier1">modifier</p></a>`;
  sophieBluelFigure.appendChild(btnModifier_1);
}

// ________________Créer la modale ____________________________________________________

// Créer le code html de la modale

const main = document.getElementById("main");
const asideModal = document.createElement("aside");
asideModal.id = "modalBlock";
asideModal.className = "modal";
asideModal.ariaHidden = "true";
asideModal.role = "dialog";
asideModal.style.display = "none";
//Ajoute le contenu html à l'aside
asideModal.innerHTML = `		
    <div class="modal-wrapper" id="modal-wrapper0">


    <div id="div-close-back-modal">
    <button class="modalBack" id="modalBack">
    <i class="fas fa-arrow-left fa-xs" id="modalBack-logo"></i></button>
    <button class="btn-close-modal" id="btn-close-modal" ><i class="fas fa-xmark" id="modalCross"></i>
    </button></div>


    <div id="modal-wrapper1">
    <h1 id="modal-wrapper1-title">Galerie photo</h1>
    <div id="modalGallery">
    </div>
    <div id="modal-wrapper1-div-btnAdd">
    <button id="modal1-btnAdd">Ajouter une photo</button></div>
    <span id="delete-gallery-btn">Supprimer la galerie</span>
    </div>
    <div id="modal-wrapper2">
    <h1 id="modal-wrapper2-title">Ajout photo</h1>
  <div id="div-Add-Photo-1">
  <i class="fas fa-image" id="logo-Add-Photo"></i>

<img src="#" alt="" id="showUploadPhoto" ></img>
<form method="post" url="/upload-picture" enctype="multipart/form-data" id="fileElemForm">
<input type="file" name="picture" onchange="previewPicture(this)" id="fileElemInput" required >
<label for="fileElemInput" id="fileElemLabel">+ Ajouter photo</label>
</form>
<p id="p1-Add-Photo">jpg, png : 4mo max</p>
  </div>
  <div id="div-Add-Photo-2">
  <form name="formAddPhoto" action "" method="post" id="formAddPhoto">
  <label id="labelTitleAddPhoto" for="titleAddPhoto">Titre</label>
  <input type="text" name="title" value="" id="inputTitleAddPhoto">
  <label id="labelCategoryAddPhoto" for="categoryAddPhoto">Catégorie</label>
  <select id="chooseCategory" name="chooseCategory">
  <option value=""></option>
  <option value="objets">Objets</option>
  <option value="appartements">Appartements</option>
  <option value="hôtelsRestaurants">Hôtels & restaurants</option>
  </select>
  <div id="divInputAddPhoto">
  <span id="errorMessage"></span>
  <input id="submitAddPhoto" type="submit" name="submitAddPhoto" value="Valider"></input>
  </div>
  </form>
  </div>
    </div>
  </div>`;
//Insère la modale dans le DOM
let asideModalHtml = main.insertBefore(
  asideModal,
  document.getElementById("portfolio")
);

// Cache la deuxieme partie de la modal (ajout photo)
let modalWrapper2 = document.getElementById("modal-wrapper2");
modalWrapper2.style.display = "none";

// Cache la flèche retour
let modalBack = document.getElementById("modalBack");
modalBack.style.visibility = "hidden";

// Cacher la balise img pour ajout photo et input
let showUploadPhoto = document.getElementById("showUploadPhoto");
showUploadPhoto.style.display = "none";

// Insère les travaux dans la modale
const modalGallery = document.getElementById("modalGallery");

// __ Tableau des travaux
let allWorksModal = [];

//__ Récupération des travaux
const fetchWorksModal = () => {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      response
        .json()
        .then((response) => {
          allWorksModal = response;
          showAllWorksModal(allWorksModal);
        })
        .catch((error) =>
          console.log("Les travaux n'ont pas pu être affichés dans la modale")
        );
    })
    .catch((error) =>
      console.log("Les travaux n'ont pas pu être affichés dans la modale")
    );
};

//__Affichage des travaux
const showAllWorksModal = (array) => {
  let allWorksHtmlModal = "";

  array.forEach(
    ({ imageUrl, title, id }) =>
      (allWorksHtmlModal += `
    <article id="articleModal" class ="articleModal">
    <div id="logosImgModal">
    <i class="fas fa-arrows-alt moveLogo" id="moveImgModal"></i>
<div class="all-trashs" id="${id}">
<i class="fas fa-trash-alt trashsLogo" id="deleteImg"></i>
</div>
</div>
    <img src=${imageUrl} alt=${title} id="imgModal" class="imgsModal" crossorigin="anonymous">
    </img>
    <p id="editModal">
    Éditer
    </p>
    </article>
    `)
  );
  modalGallery.innerHTML = allWorksHtmlModal;
  deleteWork();
  logoMove();
};

// fonction pour logo déplacer
const logoMove = () => {
  // Afficher logo au passage de la souris
  const articles = document.querySelectorAll(".articleModal");
  articles.forEach((article) => {
    const logo = article.querySelector(".moveLogo");
    logo.style.display = "none";
    article.addEventListener("mouseover", () => {
      logo.style.display = "flex";
    });
    article.addEventListener("mouseout", () => {
      logo.style.display = "none";
    });
  });
};

// Fonction pour affficher la page 2 de la modale (Ajout photo)
let ShowAddPhoto = () => {
  let modalWrapper0 = document.getElementById("modal-wrapper0");
  let modalWrapper1 = document.getElementById("modal-wrapper1");
  // Cacher le contenu de la partie 1 de la modale "modifier la gallerie"
  modalWrapper1.style.display = "none";
  // Afficher contenu de la partie 2 de la modale
  modalWrapper2.style.display = "block";
  // Bouton retour en arrière
  let modalBack = document.getElementById("modalBack");
  modalBack.style.visibility = "visible";
  modalBack.addEventListener("click", () => {
    modalWrapper2.style.display = "none";
    modalWrapper1.style.display = "block";
    modalBack.style.visibility = "hidden";
  });
};

// Fonction pour ourvrir la modale
const openModal = function (e) {
  e.preventDefault();
  fetchWorksModal();
  // Enlève le display none de la modal pour l'afficher
  asideModal.style.display = null;
  // aria : pour l'accessibilité
  asideModal.removeAttribute("aria-hidden");
  asideModal.setAttribute("aria-modal", "true");
  // Ecoute le click  pour fermer la modal
  asideModal.addEventListener("click", closeModal);

  asideModal
    .querySelector(".btn-close-modal")
    .addEventListener("click", closeModal);
  asideModal
    .querySelector(".modal-wrapper")
    .addEventListener("click", stopPropagation);
};

// Fonction pour fermer la modal
const closeModal = function (e) {
  e.preventDefault();
  asideModal.style.display = "none";
  asideModal.setAttribute("aria-hidden", "true");
  asideModal.removeAttribute("aria-modal");
  asideModal.removeEventListener("click", closeModal);
  asideModal
    .querySelector(".btn-close-modal")
    .removeEventListener("click", closeModal);
  asideModal
    .querySelector(".modal-wrapper")
    .removeEventListener("click", stopPropagation);
};

// Fonction pour que l'événement click de fermeture de la modale ne soit pas situé sur la modale
const stopPropagation = function (e) {
  e.stopPropagation();
};

if (token !== null) {
  //Séléctionne le bouton modifier
  let btnModifier2 = document.getElementById("btnModifier");
  // Ecoute l'évènement click sur le bouton modifier pour ouvrir la modal
  btnModifier2.addEventListener("click", openModal);
  //séléctionne le bouton ajouter une photo
  const addPhotoBtn = document.getElementById("modal1-btnAdd");
  // Fonction afficher la modale "ajout photo" lors du click sur le bouton
  addPhotoBtn.addEventListener("click", ShowAddPhoto);
}

// _____________________________5_Envoyer de nouveaux travaux_______________________________________

// Récupère l'input ajout photo
const fileElemInput = document.getElementById("fileElemInput");

// Récupère logo sous photo
const logoAddPhoto = document.getElementById("logo-Add-Photo");

//Fonction pour afficher l'image uploadée dans la balise img
const previewPicture = (e) => {
  // Afficher balise img à la place du logo :
  const logoAddPhoto = document.getElementById("logo-Add-Photo");
  const fileElemLabel = document.getElementById("fileElemLabel");
  const p1AddPhoto = document.getElementById("p1-Add-Photo");
  showUploadPhoto.style.display = "flex";
  logoAddPhoto.style.display = "none";
  fileElemLabel.style.display = "none";
  p1AddPhoto.style.display = "none";
  // Récupérer la photo séléctionnée
  const [picture] = e.files;
  if (picture) {
    let reader = new FileReader();
    reader.onload = function (e) {
      showUploadPhoto.src = e.target.result;
    };
    reader.readAsDataURL(picture);
  }
};

// Envoyer les données à l'API

// Récupère titre image catégorie entrées dans le formulaire
const inputTitle = document.getElementById("inputTitleAddPhoto");
const form = document.getElementById("formAddPhoto");
const chooseCategory = document.getElementById("chooseCategory");
const submitAddPhoto = document.getElementById("submitAddPhoto");

const updateSubmitButton = () => {
  if (inputTitle.value && chooseCategory.value && fileElemInput.files[0]) {
    submitAddPhoto.style.backgroundColor = "#1D6154";
  } else {
    submitAddPhoto.style.backgroundColor = "#A7A7A7";
  }
};

inputTitle.addEventListener("input", updateSubmitButton);
chooseCategory.addEventListener("change", updateSubmitButton);
fileElemInput.addEventListener("change", updateSubmitButton);

// évènement click sur "valider"

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const errorMessage = document.getElementById("errorMessage");

  if (
    inputTitle.value === "" ||
    chooseCategory.value === "" ||
    !fileElemInput.files[0]
  ) {
    errorMessage.style.display = "flex";
    errorMessage.textContent = `Veuillez remplir tous les champs et choisir une photo`;
    return;
  }

  // attribue une categortId selon la categorie choisie dans le menu déroulant par rapport à la db
  let categoryId = 0;
  if (chooseCategory.value === "objets") {
    categoryId = 1;
  } else if (chooseCategory.value === "appartements") {
    categoryId = 2;
  } else if (chooseCategory.value === "hôtelsRestaurants") {
    categoryId = 3;
  }

  // crééer un objet pour envoyer nouveau Work à l'API
  const formData = new FormData();
  formData.append("title", inputTitle.value);
  formData.append("image", fileElemInput.files[0]);
  formData.append("category", categoryId);
  // Créer une fonction alerte

  // Envoyer les données
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      alert("Votre projet a bien été ajouté à la galerie de travaux.");
    })
    .catch(function (error) {
      console.log(error);
    });
});

updateSubmitButton();

// _____________________________6_Supprimer travaux_______________________________________

const deleteWork = () => {
  //Séléctionne chaque bouton poubelle
  const trashs = document.querySelectorAll(".all-trashs");
  //Boucle pour que ça récupère la poubelle à chaque élément créé
  trashs.forEach((trash) => {
    //evenement click sur la poubelle
    trash.addEventListener("click", () => {
      // Récupère l'iD de la poubelle cliquée
      const workId = trash.id;
      //console.log(trash.id);
      fetch("http://localhost:5678/api/works/" + workId, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Votre projet a bien été supprimé de la galerie de travaux.");
          } else {
            alert("Erreur lors de la suprresion de votre projet.");
          }
        })
        .catch((error) => console.log("Erreur :", error));
    });
  });
};

// Boutons login/Logout
const logout = document.getElementById("logout");
const login = document.getElementById("login");

const logoutUser = () => {
  sessionStorage.removeItem("token");
  location.reload();
};

if (token !== null) {
  login.style.display = "none";
  logout.style.display = "block";
  logout.addEventListener("click", logoutUser);
} else {
  logout.style.display = "none";
}
