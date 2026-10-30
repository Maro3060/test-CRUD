var productNameInput = document.getElementById("product-name");
var productPriceInput = document.getElementById("product-price");
var productCategoryInput = document.getElementById("product-category");
var productImageInput = document.getElementById("product-image");
var productDiscriptionInput = document.getElementById("product-discription");
var productList = [];

function addProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        Image: '../images/img.jpg',
        discription: productDiscriptionInput.value
    };
    productList.push(product);
    clearProductInput();
    console.log(productList)
}

function clearProductInput() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productImageInput.value = "";
    productDiscriptionInput.value = "";
}