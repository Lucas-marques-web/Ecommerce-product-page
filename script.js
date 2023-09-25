let emptyValue = Number(document.querySelector('.empty-value').textContent);

document.querySelector('.plus-sign').addEventListener('click', addItems);
document.querySelector('.minus-sign').addEventListener('click', minusItems);
document.querySelector('.add-cart-btn').addEventListener('click', addItemsToCart);
let carIcon = document.querySelector('.cart-icon');
let cartItemsDiv = document.getElementById("cart-items");
carIcon.addEventListener('click', updateCartList);
carIcon.addEventListener('click', ShowCartlist);

let imageProductMain = document.querySelector('.image-product-main');
let thumbnails = document.querySelectorAll('.thumbnails');
let imageProductMain2 = document.querySelector('.image-product-main-2');
let thumbnails2 = document.querySelectorAll('.thumbnails-2');
let shadowDiv = document.querySelector('.shadow');
let lightBox = document.querySelector('.lightbox');
let closeButtonLightbox = document.querySelector('.close-btn-lightbox');
let previous = document.querySelector('.previous');
let next = document.querySelector('.next');
let previousLightbox = document.querySelector('.previous-2');
let nextLightbox = document.querySelector('.next-2');

let currentImageIndex = 0; // Variável para rastrear o índice da imagem principal atual

const mainImages = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg"
];


next.addEventListener('click', () => {
  currentImageIndex++;

  // Verifique se o índice está fora dos limites das imagens principais
  if (currentImageIndex >= mainImages.length) {
    currentImageIndex = 0; // Volte para a primeira imagem se estiver fora dos limites
  }

  // Atualize a imagem principal com a próxima imagem no array
  imageProductMain.src = mainImages[currentImageIndex];
});

previous.addEventListener('click', () => {
  currentImageIndex--;

  // Verifique se o índice está abaixo de 0
  if (currentImageIndex < 0) {
    currentImageIndex = mainImages.length - 1; // Volte para a última imagem se estiver abaixo de 0
  }

  // Atualize a imagem principal com a imagem anterior no array
  imageProductMain.src = mainImages[currentImageIndex];
});





nextLightbox.addEventListener('click', () => {
  currentImageIndex++;

  // Verifique se o índice está fora dos limites das imagens principais
  if (currentImageIndex >= mainImages.length) {
    currentImageIndex = 0; // Volte para a primeira imagem se estiver fora dos limites
  }

  // Atualize a imagem principal com a próxima imagem no array
  imageProductMain2.src = mainImages[currentImageIndex];

  // Remova a classe 'blur' de todas as miniaturas
  thumbnails2.forEach((thumbnail) => {
    thumbnail.classList.remove('blur');
  });

  // Adicione a classe 'blur' à miniatura correspondente ao índice atual
  thumbnails2[currentImageIndex].classList.add('blur');
});

previousLightbox.addEventListener('click', () => {
  currentImageIndex--;

  // Verifique se o índice está abaixo de 0
  if (currentImageIndex < 0) {
    currentImageIndex = mainImages.length - 1; // Volte para a última imagem se estiver abaixo de 0
  }

  // Atualize a imagem principal com a imagem anterior no array
  imageProductMain2.src = mainImages[currentImageIndex];

  // Remova a classe 'blur' de todas as miniaturas
  thumbnails2.forEach((thumbnail) => {
    thumbnail.classList.remove('blur');
  });

  // Adicione a classe 'blur' à miniatura correspondente ao índice atual
  thumbnails2[currentImageIndex].classList.add('blur');
});

// Restante do seu código...


closeButtonLightbox.addEventListener('click', () => {
  shadowDiv.classList.toggle('hidden');
  lightBox.classList.toggle('hidden');
});

imageProductMain.addEventListener('click', () => {
  shadowDiv.classList.toggle('hidden');
  lightBox.classList.toggle('hidden');
});

for (let i = 0; i < 4; i++) {
  thumbnails[i].addEventListener('click', changeImageProduct);
  thumbnails2[i].addEventListener('click', changeImageProductLightBox);
}

function changeImageProduct(evt) {
  let src = evt.target.src;
  src = src.replace('-thumbnail', ''); // Remove "-thumbnail" from the filename

  // Change the main image
  imageProductMain.src = src;

  // Remove the blur class from all thumbnails
  const thumbnails = document.querySelectorAll('.thumbnails');
  thumbnails.forEach((thumbnail) => {
    thumbnail.classList.remove('blur');
  });

  // Add the blur class to the clicked thumbnail
  evt.target.classList.add('blur');

  // Atualizar o índice da imagem atual com base na miniatura clicada
  currentImageIndex = Array.from(thumbnails).indexOf(evt.target);
}

function changeImageProductLightBox(evt) {
  let src = evt.target.src;
  src = src.replace('-thumbnail', ''); // Remove "-thumbnail" from the filename

  // Change the main image
  imageProductMain2.src = src;

  // Remove the blur class from all thumbnails
  const thumbnails = document.querySelectorAll('.thumbnails-2');
  thumbnails.forEach((thumbnail) => {
    thumbnail.classList.remove('blur');
  });

  // Add the blur class to the clicked thumbnail
  evt.target.classList.add('blur');

  // Atualizar o índice da imagem atual com base na miniatura clicada
  currentImageIndex = Array.from(thumbnails2).indexOf(evt.target);
}

function addItems() {
  emptyValue = emptyValue + 1;
  document.querySelector('.empty-value').textContent = emptyValue;
}

function minusItems() {
  if (emptyValue > 0) {
    emptyValue = emptyValue - 1;
    document.querySelector('.empty-value').textContent = emptyValue;
  }
}

// No início do seu script.js, declare um array para rastrear os itens do carrinho.
let cartItems = [];

// Função para adicionar um item ao carrinho.
function addItemsToCart() {
  // Obtenha o nome ou outra identificação do produto que você deseja adicionar ao carrinho.
  let productName = "Fall Limited Edition Sneakers"; // Você pode obter isso dinamicamente se necessário.
  let qtdProduct = emptyValue;
  let price = 125;
  let imageUrl = 'images/image-product-1-thumbnail.jpg';

  if (qtdProduct !== 0) {
    // Adicione o produto ao carrinho (neste caso, estamos apenas adicionando o nome).
    cartItems.push({
      name: productName,
      quantity: qtdProduct,
      price: price,
      imageUrl: imageUrl,
    });
    emptyValue = 0;
    document.querySelector('.empty-value').textContent = 0;

    // Atualize a lista de itens no carrinho.
    updateCartList();
  }
}

// Function to update the cart list.
function updateCartList() {
  const cartItemList = document.getElementById("cart-item-list");

  cartItemList.innerHTML = ""; // Clear the current list of items in the cart.

  if (cartItems.length === 0) {
    // If the cart is empty, display a message.
    cartItemList.innerHTML = "<p class='empty-cart'>Your cart is empty</p>";
    document.querySelector('.cart-btn').classList.toggle('hidden');
  } else {
    // Otherwise, create a list of items in the cart.
    cartItems.forEach((item) => {
      // Create a container for each item in the cart.
      const cartItemContainer = document.createElement("div");
      cartItemContainer.classList.add("cart-item-container");

      // Create an image element for the product image.
      const img = document.createElement("img");
      img.src = item.imageUrl; // Set the image source to the product's image URL.
      img.alt = item.name; // Set the alt text to the product's name.
      cartItemContainer.appendChild(img);

      // Create a paragraph element for displaying item details.
      const itemDetails = document.createElement("p");
      itemDetails.textContent = `${item.name}, ${item.quantity} X ${item.price}`;
      cartItemContainer.appendChild(itemDetails);

      // Append the container to the cart item list.
      cartItemList.appendChild(cartItemContainer);
    });
  }
}

function ShowCartlist() {
  cartItemsDiv.classList.toggle('hidden');
}
