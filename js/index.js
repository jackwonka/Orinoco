//////////  Récupération des données ours en peluches avec l'API fetch, fonctionne avec les promesses.

fetch('http://localhost:3000/api/teddies')
  .then((response) => response.json())
  .then((response) => console.log(response))

  // function avec message d'erreur du serveur HS
  .catch(function(err){
    console.log(err);
    if(err === 0){ // requete annulée
        alert("serveur HS");
    }
});

////////// Afficher dynamiquement les produits sur la page d’accueil.

// Création div sur parents bear

let divItem = document.createElement("div");
divItem.classList.add("item");
document.getElementById("bear").appendChild(divItem);




