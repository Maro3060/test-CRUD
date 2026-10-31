var productNameInput = document.getElementById("product-name");
var productPriceInput = document.getElementById("product-price");
var productCategoryInput = document.getElementById("product-category");
var productImageInput = document.getElementById("product-image");
var productDiscriptionInput = document.getElementById("product-discription");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
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
        Image: `../images/${productImageInput.files[0].name}`,
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

var updatedIdx;

function editProduct(idx) {
  updatedIdx = idx;
  
  productNameInput.value = productList[idx].name;
  productPriceInput.value = productList[idx].price;
  productCategoryInput.value = productList[idx].category;
  productImageInput.value = `../images/${productImageInput.files[0].name}`;
  productDiscriptionInput.value = productList[idx].discription;

  addBtn.classList.add("d-none")
  updateBtn.classList.remove("d-none")
}

function updateProduct() {
  productList[updatedIdx].name = productNameInput.value;
  productList[updatedIdx].price = productPriceInput.value;
  productList[updatedIdx].category = productCategoryInput.value;
  productList[updatedIdx].Image = `../images/${productImageInput.files[0].name}`;
  productList[updatedIdx].discription = productDiscriptionInput.value;

  displayProducts(productList);
  localStorage.setItem("productList", JSON.stringify(productList));

  clearProductInput();

  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
}

function displayProducts(list) {
    var blackBox = '';
    
    for(var i = 0; i < list.length; i++) {
        blackBox += `
        <div class="col-lg-3 col-md-6">
            <div class="card product">
              <img src="${list[i].Image}" alt="fuck" class="card-img-top" />
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
                  <button class="btn btn-warning" onclick="editProduct(${i})"><i class="fa-solid fa-pen"></i></button>
                  <button class="btn btn-danger" onclick="removeProduct(${i})"><i class="fa-solid fa-trash-can"></i></button>
                </div>
              </div>
            </div>
          </div>
        `;
    }
    
    document.getElementById('products-area').innerHTML = blackBox;
}

function removeProduct(idx) {
  productList.splice(idx, 1);
  localStorage.setItem('productList', JSON.stringify(productList));
  displayProducts(productList);
}
