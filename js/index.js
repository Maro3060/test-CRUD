var productNameInput = document.getElementById("product-name");
var productPriceInput = document.getElementById("product-price");
var productCategoryInput = document.getElementById("product-category");
var productImageInput = document.getElementById("product-image");
var productDiscriptionInput = document.getElementById("product-discription");
var productList = [];

if(localStorage.getItem("productList")) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProducts(productList);
}

function addProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        Image: '../images/img.jpg',
        discription: productDiscriptionInput.value
    };
    
    productList.push(product);
    localStorage.setItem('productList', JSON.stringify(productList));
    
    displayProducts(productList);
    
    clearProductInput();
}

function clearProductInput() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productImageInput.value = "";
    productDiscriptionInput.value = "";
}

function displayProducts(list) {
    var blackBox = '';
    
    for(var i = 0; i < list.length; i++) {
        blackBox += `
        <div class="col-lg-3 col-md-6">
            <div class="card product">
              <img src="images/img.jpg" alt="fuck" class="card-img-top" />
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div class="category badge text-bg-primary w-auto">
                    <span>${list[i].category}</span>
                  </div>
                  <div class="price text-danger">
                    <span>${list[i].price}</span>
                  </div>
                </div>
                <h2>${list[i].name}</h2>
                <p>${list[i].discription}</p>
                <div class="actions d-flex justify-content-between">
                  <button class="btn btn-warning"><i class="fa-solid fa-pen"></i></button>
                  <button class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                </div>
              </div>
            </div>
          </div>
        `;
    }
    
    document.getElementById('products-area').innerHTML = blackBox;
}