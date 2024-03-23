// check if element already present in cart
const isSellerSellected = document.getElementsByClassName("sellerList")[0].firstElementChild;
(function (){
    console.log(basket);
    basket.find((obj)=>{
        let id = document.getElementsByClassName("itemImage")[0].firstElementChild.id;
        if(obj.id == id){
            isSellerSellected.checked = true; return;
        }
    })
})();

const addItem = document.getElementById("cartButton");
if(isSellerSellected.checked === true){
    addItem.setAttribute("value", "Go to Cart");
} 

// adding current product in cart
const createCart = (event) => {
    
    if(isSellerSellected.checked === true){
        location.href = "/Web Development/MiniProject/cart.html";
        return;
    }       
    isSellerSellected.checked = true;
    basket.push({
        id : document.getElementsByClassName("itemImage")[0].firstElementChild.id,
        sellerId: document.getElementsByClassName("sellerList")[0].lastElementChild.id,
        itemHref: document.documentURI,
        
        imageSrc: document.getElementsByClassName("itemImage")[0].firstElementChild.getAttribute("src"),
        title: document.getElementsByClassName("title")[0].firstElementChild.innerText,
        descriptContent: document.getElementsByClassName("descript")[0].firstElementChild.innerText,
        sellerName: document.getElementById("motorSeller1Details").children[0].innerText,
        priceValue: document.getElementById("motorSeller1Details").children[0].innerText,
        sellerLoc: document.getElementById("motorSeller1Details").children[0].innerText
    })    
    localStorage.setItem("cartData", JSON.stringify(basket));
}    
addItem.addEventListener('click', createCart);

