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

// _________________________________3____Créer la page de connexion_________________________________
