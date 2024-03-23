
// to see next or previous availabe page on productlist
function checkAvailPage(e){
    const productPerPage = 3;
    if(e.target.id === "leftSidePage"){
        let currfirstPage = e.target.nextElementSibling 
        
        if(Number.parseInt(currfirstPage.innerText) >1 ){
            // add previous page link 
            const href = new URL(currfirstPage.href)
            const pgno = Number.parseInt(href.searchParams.get("page"));
            href.searchParams.set("page", `${pgno - 1}`) 
            
            // remove last available page
            document.querySelector("#rightSidePage").previousElementSibling.remove();            
            const prevPage  = `<a  href="${href.pathname + href.search}">${pgno - 1}</a>`
            e.target.insertAdjacentHTML('afterend', prevPage);
        }
    }
    else if(e.target.id === "rightSidePage"){
        let currlastPage = e.target.previousElementSibling 
        const totalNoOfProduct = Number.parseInt(document.querySelector("#totalNoOfProduct").innerText);
        const totalNoOfPages = Math.ceil(totalNoOfProduct/productPerPage);

        if(Number.parseInt(currlastPage.innerText) < totalNoOfPages ){
            // add previous page link 
            const href = new URL(currlastPage.href)
            const pgno = Number.parseInt(href.searchParams.get("page"));
            href.searchParams.set("page", `${pgno + 1}`) 

            // remove last available page
            document.querySelector("#leftSidePage").nextElementSibling.remove();            
            const nextPage  = `<a  href="${href.pathname + href.search}">${pgno + 1}</a>`
            e.target.insertAdjacentHTML('beforebegin', nextPage);
        }
    }
}

document.querySelector(".pagination").querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", checkAvailPage)
})  

// it change content of page 
function setPage(otherpagedata){
    const newProductsOnPage  = document.createElement("div");
    let {productsOnPage, totalNoOfProduct, wholepath, page, productPerPage} = otherpagedata
    for(let i=0; i<productsOnPage.length; i++){
        let singleProd = 
        `<a href="${wholepath}/productlist">
            <div class="product-card">
                <img class="product-image" src="${productsOnPage[i].productImage[0]}" 
                    alt="Product 1">
                <div class="product-details">
                    <div class="product-title">
                        ${productsOnPage[i].title}
                    </div>
                    <div class="price-container">
                        <div class="product-price">
                            &#x20B9;${productsOnPage[i].price.toLocaleString("en-IN")}
                        </div> 
                    </div>
                    <div class="product-review-stars">★★★★</div>
                    <div class="product-descript">
                        ${productsOnPage[i].description}
                    </div>
                </div>
            </div>
        </a>
        `
        newProductsOnPage.innerHTML += singleProd;
    } 
    page = Number.parseInt(page);
    productPerPage = Number.parseInt(productPerPage); 
    let startFrom =  (page-1) * productPerPage + 1;
    let endOn = startFrom + productsOnPage.length - 1; 

    document.querySelector(".product-grid").innerHTML = newProductsOnPage.innerHTML;
    document.getElementById("startProductNo").innerText = startFrom;
    document.getElementById("endProductNo").innerText = endOn;
}

// on newly created a tag event will not applied we applied therefore event listner on is .pagination 
// it fetch data of particular page
document.querySelector(".pagination").addEventListener('click', (e)=>{
    // we had disable a tag default behaviour
    e.preventDefault(); 
    if(e.target.tagName === "A"){ 
        const p = e.target;
        // removing className active from every a tag so that only on that a tag which has clicked css will apply 
        document.querySelector(".pagination").querySelectorAll("a").forEach((anch)=>{
            anch.classList.remove("active");
        })
        // adding class so that we can unsderstand that it has selected
        p.classList.add("active");
        
        const route = p.href;  
        fetch(route, {method: "get"})
        .then(async (res) => {
            return await res.json();
        }) 
        .then(setPage)
        .catch((err) => {console.log(err.message);})
    }        
}) 
admin can add categories, seller can list product, product list page has divided in different page(pagination)  
document.addEventListener('DOMContentLoaded', (e)=>{
    // we selected first page as default 
    document.querySelector("#leftSidePage").nextElementSibling
    .classList.add("active");
})