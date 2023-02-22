fonctionLogin = (event) => {
  // Sélection du formulaire
  let formLogin = document.getElementById("formLogin");
  // Écoute l'événement "soumettre" du bouton "Se connecter"
  formLogin.addEventListener("submit", async (event) => {
    // Empêche le rafraîchissement de la page
    event.preventDefault();
    // Récupère les données entrées par l'utilisateur
    let userValues = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(userValues),
      });
      const data = await response.json();
      console.log(data);
      sessionStorage.setItem("token", data.token); // Stocke le token dans le sessionStorage
    } catch (error) {
      console.error(error);
    }
  });
};

// Si combinaison mot de passe/ user incorrecte
// si ok =>

/* 


    // Condition 1 : alerte si une des deux cases est vide

    if (email.trim() == "") {
      let alertLogin = document.getElementById("alertLogin");
      alertLogin.innerHTML =
        'Les champs "E-mail" et "Mot de passe" sont requis.';
      event.preventDefault();
    }



*/

// fetch les données avec post
/*
fetch("http://localhost:5678/api/users/login", {
  method: "POST",
  headers: {
    //Accept: "application/JSON",
    "Content-Type": "application/json; charset=UTF_8",
  },
  body: JSON.stringify({
    "email": email,
    "password": password,
  })
   
});
*/
// stocker les données récupérées dans le local storage */
