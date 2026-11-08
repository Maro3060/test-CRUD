var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productImageInput = document.getElementById("product-image");
var productDiscriptionInput = document.getElementById("productDiscription");
var searchProductInput = document.getElementById("search-product");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var productList = [];

if(localStorage.getItem("productList")) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProducts(productList);
}

function addProduct() {
  var valid = validateInput(productNameInput) && validateInput(productCategoryInput) && validateInput(productDiscriptionInput) && validateInput(productPriceInput);
  
  console.log(valid);
  if(valid) {
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
              <img src="${list[i].Image}" alt="fuck" class="card-img-top object-fit-contain" />
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div class="category badge text-bg-primary w-auto">
                    <span>${list[i].category}</span>
                  </div>
                  <div class="price text-danger">
                    <span>${list[i].price}</span>
                  </div>
                </div>
                <h2>${list[i].hightlighted ? list[i].hightlighted : list[i].name}</h2>
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

function searchProduct() {
  var keyword = searchProductInput.value.toLowerCase().trim();
  var matched = [];

  for(var i = 0; i < productList.length; i++) {
    if(productList[i].name.toLowerCase().includes(keyword)) {
      matched.push(productList[i]);
      productList[i].hightlighted = productList[i].name.toLowerCase().replaceAll(keyword, `<span class="text-danger">${keyword}</span>`);
    }

    if(matched.length > 0) {
      displayProducts(matched)
    } else {
      document.getElementById("products-area").innerHTML = `<div class="alert alert-warning text-center" role="alert">Not found</div>`;
    }
  }
}

function validateInput(inputElement) {
  var regex = {
    productName : /^[A-Z][a-z]{2,19}/,
    productPrice: /^[1-9][0-9]{2,5}$/,
    productCategory: /^(TV|Mobile|Iphone|Watches|Playstation|Labtop)$/,
    productDiscription: /^[A-Za-z0-9\s]{4,250}$/
  }

  valid = regex[inputElement.id].test(inputElement.value)

  if(valid) {
    inputElement.classList.add("is-valid");
    inputElement.classList.remove("is-invalid");
    inputElement.nextElementSibling.classList.replace("d-block","d-none");
  }
  else {
    inputElement.classList.remove("is-valid");
    inputElement.classList.add("is-invalid");
    inputElement.nextElementSibling.classList.replace("d-none","d-block");
  }

  return valid;
}
