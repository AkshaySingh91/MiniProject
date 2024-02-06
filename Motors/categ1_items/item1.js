// showing all available seller 
const showSeller = document.querySelector(".headBar");
const check = document.getElementById("showList");
showSeller.addEventListener('click', () => {
    let hideList = document.getElementsByClassName("allSellerSection")[0];
    if (!check.checked) {
        check.checked = true
        hideList.classList.add("hideList");
        document.getElementsByClassName("content")[0].classList.add("squez")
        document.getElementById("collapseIcon").style.transform = "rotate(180deg)"
    }
    else {
        check.checked = false
        hideList.classList.remove("hideList");
        document.getElementsByClassName("content")[0].classList.remove("squez")
        document.getElementById("collapseIcon").style.removeProperty("transform");
    }
})

// selecting seller
const isSellerSellected = document.getElementsByClassName("allSellerSection")[0].firstElementChild;
const selectSeller = document.getElementsByClassName("allSellerSection")[0];
const selectedSeller = (event) => {
    let cnt = selectSeller.childElementCount;
    for (let i = 2; i < cnt; i++) {
        if (event.target.closest("." + selectSeller.children[i].className)) {
            isSellerSellected.checked = true
            return selectSeller.children[i].className;
        }
    }
}
let sellerNo;
selectSeller.addEventListener('click', (event) => { 
    sellerNo = selectedSeller(event) 
}) 

// adding current product in cart
const addItem = document.getElementById("cartButton");
const createCart = (event) => {
    let changeContent = addItem.getAttribute("value");
    if (isSellerSellected.checked === false && (changeContent !== "Go to Cart")) {
        alert("Select Seller");
        return;
    }
    if (changeContent == "Go to Cart") {
        location.href = "/Web Development/MiniProject/cart.html"
    }
    else {
        let obj = 0;
        let checkDup = document.getElementsByClassName("itemImage")[0].firstElementChild.id;
        
        while(obj < basket.length){
            if (basket[obj].sellerId === sellerNo && basket[obj].id === checkDup){
                return;
            }
            obj++;
        }

        basket.push({
            id : document.getElementsByClassName("itemImage")[0].firstElementChild.id,
            sellerId: sellerNo,
            itemHref: document.documentURI,
          
            imageSrc: document.getElementsByClassName("itemImage")[0].firstElementChild.getAttribute("src"),
            title: document.getElementsByClassName("title")[0].firstElementChild.innerText,
            descriptContent: document.getElementsByClassName("descript")[0].firstElementChild.innerText,
            sellerName: document.getElementsByClassName(sellerNo)[0].firstElementChild.children[0].innerText,
            priceValue: document.getElementsByClassName(sellerNo)[0].firstElementChild.children[1].innerText,
            sellerLoc: document.getElementsByClassName(sellerNo)[0].firstElementChild.children[2].innerText
        })
        localStorage.setItem("cartData", JSON.stringify(basket));
        addItem.setAttribute("value", "Go to Cart");
    }
}
addItem.addEventListener('click', createCart);

// check if element already present in cart
basket.find((obj)=>{
    if(obj.id === document.getElementsByClassName("itemImage")[0].firstElementChild.id){
        addItem.setAttribute("value", "Go to Cart");    return;
    }
})

