let boxSection = document.querySelector("#item__select");
// variable quantité 0
let total = 0;
// Appel ma function affichage du panier
displayQuantity()

// Contenu du panier, des boutons de suppression et d'annulation du panier ainsi que du formulaire de contact 
function displayQuantity() {

    if (sessionStorage.getItem('anyItem') !== null) {

        let products = JSON.parse(sessionStorage.getItem('anyItem'));
        total = 0; //initialisation du total à 0

        boxSection.insertAdjacentHTML("afterbegin",
            `<h1>Panier</h1>
            <table>
                <thead>
                    <tr>
                        <th>Articles</th>              
                        <th>Nom</th>
                        <th>Couleurs</th>
                        <th>Nombre d'articles</th>
                        <th>Prix</th>
                    </tr>
                </thead>
                <tbody class="order__details">
                </tbody>
            </table>`
        );
        
        let html = "";
        // Affichage des articles + prix + quantité
        products.forEach( (product, index) => {
            
            total = total + (product.price * product.quantity);

            html +=`<tr>
                        <td><img src="${product.imageUrl}" alt="ours peluche" style="width:120px;"></td>
                        <td>${product.name}</td>
                        <td>${product.selectColors}</td>
                        <td><button class="decrease__item ${index}"> - </button>
                        ${product.quantity}
                        <button class="increase__item ${index}"> + </button></td>
                        <td>${(product.price * product.quantity/100).toFixed(2).replace(".",",")} €</td>
                        <td><button class="delete__item ${index}">Supprimer</button></td>
                    </tr>`
            document.querySelector(".order__details").innerHTML = html;
        })

        //Total prix + boutton annuler commande    
        boxSection.insertAdjacentHTML("beforeend",
            `<div class="total">
                <p class="cart-section__total">Total : ${(total/100).toFixed(2).replace(".",",")} €</p>
                <button class="cancel__ordered">
                    <p>Annuler le panier</p>
                </button>
            </div>`
        );
        // Formulaire
        boxSection.insertAdjacentHTML("beforeend",
            `<h2>Veuillez remplir le formulaire ci-dessous avant de valider votre commande</h2>
                <form class="contact__form" action="post" type="submit">
                    <div class="details__form">
                        <label for="firstname">PRENOM:</label>
                        <input type="text" name="name" id="firstname" placeholder="Prénom" required />
                    </div>
                    <div class="details__form">
                        <label for="name">NOM:</label>
                        <input type="text" name="name" id="name" placeholder="Prénom" required />
                    </div>
                    <div class="details__form">
                        <label for="address">ADRESSE:</label>
                        <input type="text" name="address" id="address" placeholder="Adresse" required />
                    </div>
                    <div class="details__form">
                        <label for="city">VILLE:</label>
                        <input type="text" name="city" id="city" placeholder="Ville" required />
                    </div>
                    <div class="details__form">
                        <label for="email">EMAIL: </label>
                        <input type="email" name="email" id="email" placeholder="adressemail@gmail.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}" required />
                    </div>
                    <button id="submit">
                        <p>Valider vôtre commande</p>
                    </button>
                </form>`
        );

        // L'ecoute des bouttons + - supprimer annuler formulaire
        const decreaseItem = document.querySelectorAll(".decrease__item ");
        decreaseItem.forEach((btn) => {

            btn.addEventListener('click', e => {
            removeOneProduct(e, products);
            })
        })

        const increaseItem = document.querySelectorAll(".increase__item");
        increaseItem.forEach((btn) => {

            btn.addEventListener('click', e => {
            addOneProduct(e, products);
            })
        })
        
        const deleteItem = document.querySelectorAll(".delete__item");
        deleteItem.forEach((btn) => {

            btn.addEventListener('click', e => {
            deleteProduct(e, products);
            });
        });

        const cancelOrdered = document.querySelector(".cancel__ordered");
        cancelOrdered.addEventListener('click', () => {
            cancelCart();
        });
      
        const form = document.querySelector(".contact__form");
        form.addEventListener('submit', e => {
            e.preventDefault();
            submitForm();
        });
        //Panier vide
    } else {
        boxSection.insertAdjacentHTML("afterbegin",
            `<h2>Panier</h2>
            <p class="cart-section__vide">
                Vous n'avez aucun article! <a href="./index.html">Revenir à la page d'accueil</a>
            </p>`
        )
    }
}

// =====================================================================================

// Ajoute "1" d'un article
function addOneProduct(e, products) {
    let index = e.target.classList[1].slice(-1);
    products[index].quantity++;
    sessionStorage.setItem('anyItem', JSON.stringify(products));
    updateNumberOfArticles();
}

