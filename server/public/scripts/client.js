$(document).ready(init);

function init() {
  $('#js-sku-form').on('submit', submitSku);

  // show list when application starts
  getCart();
}

function submitSku(event) {
  event.preventDefault();

  // Grab the sku info off the input
  // Not going to handle another type / errors for meow.
  const sku = parseInt($('#js-input-sku').val());
  postSku(sku);
}

function postSku(sku) {
  $.ajax({
    type: 'POST',
    url: '/additem',
    data: {
      sku,
    },
  })
    .then((response) => {
      getCart();
    })
    .catch((err) => {
      // This would be an awesome place to create an error to show if a
      // sku is not found!
      console.log(err);
    });
}

function getCart() {
  $.ajax({
    type: 'GET',
    url: '/cart',
  })
    .then((response) => {
      render(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

function render(cart) {
  // clear out the stuff that is already there!
  $('#js-container').empty();

  for (let item of cart.checkout) {
    // productCell is created in the other JS file, snippets.js, loaded via HTML
    $('#js-container').append(productCell(item));
  }

  // cart.total came from the server! Math is already done!
  $('#js-total').text(`$${new Intl.NumberFormat().format(cart.total)}`);
}
