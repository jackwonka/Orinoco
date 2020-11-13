/* Récupération de l'id du produit sélectionné dans la page précédente */
const productId = window.location.search.substr(1); 


/* Récupération du produit avec l'id associé depuis le serveur */ 

fetch(`http://localhost:3000/api/teddies/${productId}`)
    .then((response) => response.json())
    .then(response => {
        
    let html="";

    // Affichage du produit / personalisation
    html += `<h1>${response.name}</h1>
        <img src="${response.imageUrl}" alt="image d'ours en détails" style="width:50%; border-radius:5px;">
        <p>${response.description}</p>
        <p>Prix: ${(response.price/100).toFixed(2).replace(".",",")}€</p>
        <!-- Personalisation de la couleur -->
        <label for="select__color">
            <h3>Personnaliser votre ours</h3>
        </label>
            <select class="section__choice" name="colors" id="select__color">
            <!-- Mes choix de couleurs dans la function forEach --!>
            </select>
        <button class="addCart" style="padding:15px; border-radius:10px;">Ajouter au panier <i class="fas fa-cart-arrow-down"></i></button>`
    document.getElementById("item__details").innerHTML = html;
    
    //Création d'une function foreach pour afficher mes choix de couleurs
    let choice = document.querySelector(".section__choice");
    
    response.colors.forEach (function (colors) {
        let option = document.createElement("option");
        option.value = colors;
        option.textContent = colors;
        choice.appendChild(option);
    })

    //Évènement "click" : lance la fonction d'ajout du produit au panier
    let cartBtn = document.querySelector(".addCart");

    cartBtn.addEventListener('click', () => {
        let select = document.querySelector(".section__choice");
        response.selectColors = select.options[select.selectedIndex].value;
        addItemCart(response);

    })
})
// Message d'erreur
.catch(e => {
    errorMessage();
    console.log(e);
});

// Function ajout des articles au panier.
function addItemCart (item) {

    // variable tableaux
    let cartItem = []

    // stocke dans un objet
    let saveItemCart = {
        _id: item._id,
        imageUrl: item.imageUrl,
        name: item.name,
        price: item.price,
        quantity: 1,
        selectColors: item.selectColors
    }
    let otherItem = true;
    // Si sessionStorage est vide elle crée un nouveau tableau cartItem et l'enregistre dans le sessionStorage
    if (sessionStorage.getItem('anyItem') === null) {
        cartItem.push(saveItemCart);
        sessionStorage.setItem('anyItem', JSON.stringify(cartItem));
    } 
    // Sinon elle récupère le tableau du sessionStorage, ajoute le nouveau produit, et enregistre le nouveau tableau.
    else { 
        cartItem = JSON.parse(sessionStorage.getItem('anyItem'));

        cartItem.forEach((prod) => {
            if (item._id === prod._id && item.selectColors === prod.selectColors) {
                prod.quantity++;
                otherItem = false;
            }
        })
    if (otherItem) cartItem.push(saveItemCart);
    sessionStorage.setItem('anyItem', JSON.stringify(cartItem));
}

itemConfirmation();
alert("Vôtre produit a été ajouter au panier");
}