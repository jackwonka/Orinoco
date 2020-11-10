let cart = document.querySelector(".cart");

itemConfirmation();

// Affiche le nombre d'articles dans le panier.
function itemConfirmation() {
    
    div = document.querySelector(".item__number")
    let nb = 0;

    if (localStorage.getItem('cartProducts') !== null) {
        let cp = JSON.parse(localStorage.getItem("cartProducts"));
        
        cp.forEach((prod) => {
            nb = nb + prod.quantity;
        });
    } 
    div.textContent = nb;
    console.log("produit ajouter")
}

//  Message d'erreur si pas de connexion au serveur
function errorMessage() {
    const section = document.querySelector(".error");
   
    section.insertAdjacentHTML("beforeend", `
        <p class="section__error">Suite à un problème technique nous ne pouvons afficher correctement la page. </br> Rééssayer plus tard.</p>
    `);
}