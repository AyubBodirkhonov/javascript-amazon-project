import { cart } from "../data/cart.js";
import {products} from '../data/products.js';


let productsHTML = "";

products.forEach(product => {
    const { image, name, rating, priceCents, id } = product;
    productsHTML += `
        <div class="product-container">
              <div class="product-image-container">
                <img class="product-image"
                  src=${image}>
              </div>
    
              <div class="product-name limit-text-to-2-lines">
                ${name}
              </div>
    
              <div class="product-rating-container">
                 <img class="product-rating-stars"
                  src="images/ratings/rating-${rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                  ${rating.count}
                </div>
              </div>
    
              <div class="product-price">
               ${(priceCents / 100).toFixed(2)}
              </div>
    
              <div class="product-quantity-container">
                <select class="js-quantity-selector-${id}">
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
    
              <div class="product-spacer"></div>
    
              <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
              </div>
    
              <button class="add-to-cart-button button-primary js-add-to-cart"
                 data-product-id="${id}"
              >
                Add to Cart
              </button>
            </div>
    `;
})

document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
        button.addEventListener('click', () => {
            //how do we know which product to add?
            //with the help of data attribute/html attribute/it allows us to attach any information to an element
            const productId = button.dataset.productId;
            //We will check whether the product is already in the cart or not
            const selectedValue = document.querySelector(`js-quantity-selector-${productId}`);
            let matchingItem;

            cart.forEach(item => {
                if (productId === item.productId) {
                   matchingItem = item;
                }
            })
            //if similar item is in the cart, increase the quantity, otherwise add a new one
            //matchingItem is an object which is truthy value
            if (matchingItem) {
                matchingItem.quantity++;
            } else {
                cart.push({
                    productId: productId,
                    quantity: 1
                })
            }
            // this is how to control the number of orders

            let cartQuantity = 0;
            cart.forEach((item) => {
                cartQuantity += item.quantity;
            })
            document.querySelector('.js-cart-quantity')
                .innerHTML = cartQuantity;
        })
    })


