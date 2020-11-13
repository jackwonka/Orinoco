// Appel ma function du nombre d'article dans mon panier
itemConfirmation()

// function qui affiche le nombre d'articles dans le panier.
function itemConfirmation() {
    
    div = document.querySelector(".item__number")
    let nomber = 0;

    if (sessionStorage.getItem('anyItem') !== null) {
        
        let keyNomber = JSON.parse(sessionStorage.getItem('anyItem'));
        
        keyNomber.forEach((prod) => {
            nomber = nomber + prod.quantity;
        });
    }
    div.textContent = nomber;
    console.log("test ajout")
}

//  function de message d'erreur si pas de connexion au serveur
function errorMessage() {

    let html = "";
   
    html += `<p class="section__error">Nous ne parvenons pas à vous connecter, vérifiez votre réseau et reessayer"</p>`
    document.querySelector(".error").innerHTML = html;
}