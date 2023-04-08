// Récupère le formulaire
const formLogin = document.getElementById("formLogin");

// Evènement click
formLogin.addEventListener("submit", async function (e) {
  e.preventDefault();
  // Séléction des données entrées par l'utilisateur dans les champs de saisie
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  let user = {
    email: email,
    password: password,
  };
  // Méthode POST pour envoyer les données entrées par l'utilisateur
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const alertLogin = document.getElementById("alertLogin");

  if (response.ok) {
    const data = await response.json();
    // Stockage du token dans le localStorage
    sessionStorage.setItem("token", data.token);
    // Redirection vers la page d'accueil en mode édition
    window.location.replace("index.html");
    // condition si i le champs email ou password est vide
  } else if (email === "" || password === "") {
    alertLogin.innerHTML = "Les champs email et mot de passe sont requis.";
    return;
    //Condition si email ou mdp invalides
  } else {
    alertLogin.innerHTML = "E-mail ou mot de passe invalide";
  }
});
