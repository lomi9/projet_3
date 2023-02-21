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

//document.addEventListener("DOMContentLoaded", fetchWorks);
