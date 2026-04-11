
export const cart = [];

export function addToCart(productId) {
    let matchingItem;

    cart.forEach(cartItem => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
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
}
