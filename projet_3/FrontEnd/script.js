// _________________________________1____Récupérer dynamiquement les travaux_________________________________

//      1 - récupérer les datas avec fetch, stocker le retour api dans une variable
//      - tu devrais avoir un tableau d'objet

//       2 - Boucler sur ton tableau d'objet (for, foreach, while)
//       Pour chaque élément du tableau

//       3 - Dans la boucle, créer le template html d'un "work", en remplaçant dynamiquement les notions suivantes :
//         - src => lien de l'image, alt => texte alt de l'image, figcaption => description de l'image

//       4 - Stocker ces templates dans une variable qui finnalement est un string au format html

//       5 - Append cette variable dans la div avec la classe gallery

const gallery = document.getElementById("gallery");

// __ Tableau des travaux
let allWorks = [];

//__ Récupération des travaux
const fetchWorks = () => {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      response
        .json()
        .then((response) => {
          allWorks = response;
          showAllWorks(allWorks);
        })
        .catch((error) => console.log("ca marche pas"));
    })
    .catch((error) => console.log("ca marche toujours pas"));
};

//__Affichage des travaux
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
// document.addEventListener("DOMContentLoaded", fetchWorks);

// _________________________________2____Mettre en place les filtres par catégorie_________________________________

// __1_Créer les boutons filtres dynamiquement :

const filtersHtml = document.getElementById("filtres");

// Récupère les catégories
let categories = [];

const fetchCategories = () => {
  fetch("http://localhost:5678/api/categories").then((response1) =>
    response1
      .json()
      .then((data) => {
        categories = data;
        showAllCategories(categories);
      })
      .catch((error) => console.log("categories marchent pas"))
  );
};

// Créé les boutons

const showAllCategories = (categories) => {
  // Bouton "tous"
  let categoriesHtml = `<button id="btnFilter_tous" class="btnFilters">Tous</button>`;

  // Boucle pour que chaque catégorie créé un bouton et le selectionne

  categories.forEach(({ id, name }) => {
    categoriesHtml += `<button id="btnFilter_${id}" class="btnFilters">${name}</button>`;
  });

  filtersHtml.innerHTML = categoriesHtml;

  // Séléctionne tous les boutons
  const btnFilters = document.querySelectorAll(".btnFilters");

  // Boucle pour évènement click
  btnFilters.forEach(function (btn) {
    // si on clique sur "tous" ....
    if (btn == btnFilter_tous) {
      btn.addEventListener("click", function () {
        fetchWorks();
      });
    }

    // si on clique sur un autre bouton, afficher que les travaux dont la categoryId = à la catégorie du bouton
    else {
      btn.addEventListener("click", function () {
        const filteredWorks = allWorks.filter(function (work) {
          return work.categoryId == categories[btn.id.slice(-1) - 1].id;
        });
        showAllWorks(filteredWorks);
      });
    }
  });
};

fetchCategories(categories);

/*


// _________________________________3____Créer la page de connexion_________________________________

// Lors de l'évènement click sur le bouton login
// display none sur toute la page html sauf le header
// remplacer par le code html intégré via js
// enregistrer les données rentrées par l'utilisateur
// envoyer les données avec fetch
//comparer les données envoyées

//_____Séléction des id de chaque section à masquer :
const btnLogin = document.getElementById("login");
const sectionIntroduction = document.getElementById("introduction");
const sectionPortfolio = document.getElementById("portfolio");
const sectionContact = document.getElementById("contact");
const mainHtml = document.getElementById("main");
const bodyHtml = document.getElementById("body");

//_____évènement click :
btnLogin.onclick = () => {
  //_____Masquer les sections :
  sectionIntroduction.parentNode.removeChild(sectionIntroduction);
  sectionPortfolio.parentNode.removeChild(sectionPortfolio);
  sectionContact.parentNode.removeChild(sectionContact);
  //___ changer couleur de fond
  bodyHtml.style.backgroundColor = "#E5E5E5";
  //_____Ajouter le contenu html de la page de connexion :
  let newSectionLogin = document.createElement("section");
  newSectionLogin.id = "sectionLogin";
  newSectionLogin.innerHTML = `
  <h1 id="titleLogin">Log In</h1>
  <form action="page-log-in" method="post" id="formLogin">
    <div id="emailLogin">
        <label for="email" id="label">E-mail</label>
        <input type="text" id="email" name="user_mail">
    </div>
    <div id="passwordLogin">
        <label id="label"for="password">Mot de passe</label>
        <input type="password" id="password" name="user_password">
    </div>
    <div id="btnLogin">
    <button type="submit" id="btnConnecter">Se connecter</button>
</div>
</form>
<p id="pLogin">Mot de passe oublié</p>
  `;
  mainHtml.appendChild(newSectionLogin);
  //___connexion

  // Récupérer ce qui a été écrit dans l'input (local storage?)
  // Si ce qui a été écrit = users : rediriger sur page d'accueil en rajoutant bouton édition
  // Si ≠ users : message d'erreur
  // Reqûete POST (fetch)
};

// Filtres non dynamiques
/*
  filtersHtml.innerHTML = `
<button id="btnFilter_tous" class="btnFilters">Tous</button>
<button id="btnFilter_1" class="btnFilters">${categories[0].name}</button>
<button id="btnFilter_2" class="btnFilters">${categories[1].name}</button>
<button id="btnFilter_3" class="btnFilters">${categories[2].name}</button>
`;
  // Séléctionne chaque bouton
  const btnFilter_tous = document.getElementById("btnFilter_0");
  const btnFilter_1 = document.getElementById("btnFilter_1");
  const btnFilter_2 = document.getElementById("btnFilter_2");
  const btnFilter_3 = document.getElementById("btnFilter_3");
  // Séléctionne tous les boutons
  const btnFilters = document.querySelectorAll(".btnFilters");

  // Boucle pour évènement click
  btnFilters.forEach(function (btn) {
    // si on clique sur "tous" ....
    if (btn == btnFilter_tous) {
      btn.addEventListener("click", function () {
        fetchWorks();
      });
    }

    */
