let emptyValue = Number(document.querySelector('.empty-value').textContent);

document.querySelector('.plus-sign').addEventListener('click', addItems);
document.querySelector('.minus-sign').addEventListener('click', minusItems);
document.querySelector('.add-cart-btn').addEventListener('click', addItemsToCart);
let carIcon = document.querySelector('.cart-icon');
let cartItemsDiv = document.getElementById("cart-items");
// carIcon.addEventListener('click', updateCartList);
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
let cartListBtn = document.querySelector('cart-btn');


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
  let price = 125.00;
  let imageUrl = 'images/image-product-1-thumbnail.jpg';
  let deleteIconURL = 'images/icon-delete.svg'

  if (qtdProduct !== 0) {
    // Adicione o produto ao carrinho (neste caso, estamos apenas adicionando o nome).
    cartItems.push({
      name: productName,
      quantity: qtdProduct,
      price: price,
      imageUrl: imageUrl,
      deleteIconURL: deleteIconURL
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
    document.querySelector('.cart-btn').classList.add('hidden');
  } else {
    document.querySelector('.cart-btn').classList.remove('hidden');
    // Otherwise, create a list of items in the cart.
    cartItems.forEach((item) => {
      // Create a container for each item in the cart.
      const cartItemContainer = document.createElement("div");
      cartItemContainer.classList.add("cart-item-container");

      cartItemContainer.innerHTML = `
      <img src="${item.imageUrl}" class="img-cart-list" alt="${item.name}">
      <p class='items-cart-content'>${item.name}<br>
      $${item.price.toFixed(2)} X  ${item.quantity} <strong> $${(item.quantity * item.price).toFixed(2)}<strong>
      </p>
      <img src='${item.deleteIconURL}'class='delete-icon' alt='delete-icon'> 
      
      
      `;
      // Append the container to the cart item list.
      cartItemList.appendChild(cartItemContainer);

      // Assuming you have multiple delete icons with the class 'delete-icon'
      let deleteIcons = document.querySelectorAll('.delete-icon');

      // Loop through each delete icon and attach a click event listener
      deleteIcons.forEach((deleteIcon) => {
        deleteIcon.addEventListener('click', (event) => {
          console.log(event);
          // Get the parent element of the clicked delete icon (the container div)
          let parentDeleteIcon = deleteIcon.closest('.cart-item-container');

          if (parentDeleteIcon) {
            // Hide the parent element by setting its display property to 'none'
            parentDeleteIcon.style.display = 'none';

            // Remove the item from the cartItems array
            const itemIndex = Array.from(parentDeleteIcon.parentElement.children).indexOf(parentDeleteIcon);
            if (itemIndex !== -1) {
              cartItems.splice(itemIndex, 1);
            }
          }
        });
     
      });
      
    });
  }
}

function ShowCartlist() {
  cartItemsDiv.classList.toggle('hidden');
  updateCartList()
}
