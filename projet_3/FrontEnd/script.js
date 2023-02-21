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

let allWorks = [];

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

const filtersHtml = document.getElementById("filtres");

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

const showAllCategories = () => {
  filtersHtml.innerHTML = `
<button id="btnFilter_0" class="btnFilters">Tous</button>
<button id="btnFilter_1" class="btnFilters">${categories[0].name}</button>
<button id="btnFilter_2" class="btnFilters">${categories[1].name}</button>
<button id="btnFilter_3" class="btnFilters">${categories[2].name}</button>
`;
  // Séléctionne chaque bouton
  const btnFilter_0 = document.getElementById("btnFilter_0");
  const btnFilter_1 = document.getElementById("btnFilter_1");
  const btnFilter_2 = document.getElementById("btnFilter_2");
  const btnFilter_3 = document.getElementById("btnFilter_3");
  // Séléctionne tous les boutons
  const btnFilters = document.querySelectorAll(".btnFilters");

  // Boucle pour évènement click
  btnFilters.forEach(function (btn) {
    // si on clique sur "tous" ....
    if (btn == btnFilter_0) {
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
  // copie le tableau des travaux
  //const filteredWorks = Array.from(allWorks);
};

fetchCategories();

/*
 // Test Gallery 

 let allWorks = [];

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

const work = allWorks[0];


let showAllWorks = (array) => {

for (let i=0; i < allWorks.length; i++) {

const gallery = document.getElementById("gallery");

const workImg = document.createElement("img");
workImg.src = allWorks[i].imageUrl;
workImg.alt = allWorks[i].title;
const workTitle = document.createElement("figcaption");
workTitle.innerText = allWorks[i].title;

gallery.appendChild(workImg);
gallery.appendChild(workTitle);

}
}

*/
