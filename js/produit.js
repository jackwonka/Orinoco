//Récupère ID du produit sélectionné.
const productId = window.location.search.substr(1);


fetch(`http://localhost:3000/api/teddies/${productId}`)
    .then((response) => response.json())
    .then((response) => {
    
      console.log(response);
    
      // Afficher nos produits
      // console.log(response[0].name)
      
      //Je créer ma variable que je vais ajouter à mes elements
      let html = "";
  
      // Boucle pour récupére toutes les variables des produits + (Foreach)
      for(let i = 0; i < response.length; i++) {
        console.log(response[i].name);
        
        //Html pur , Créer les élément, clone prototype
        html += `<li class="item">
        <h2 class="row">${response[i].name}</h2>
        <img src="${response[i].imageUrl}" alt="Images ours" style= "width:70%; border-radius: 5px; margin-left: 16%;">
        <p class="row">${response[i].description}</p>
        <p class="row">${(response[i].price/100).toFixed(2).replace(".",",")}€</p>
        <a class="row" href="./produit.html?${response[i]._id}" style= "color: black;"><b>Voir l'article</b></a></li>`
      }
  
      console.log(html);
  
      // Ajouter mes element créer dans le HTML
      document.getElementById("bear").innerHTML = html;
  
    
    })