
function addItemsInCart() {
    // show all item that added in cart
    if (basket.length > 0) {
        let cnt = 1;
        let newEle = document.createElement("div");
        newEle.innerHTML = `<div class="cartElementCol"></div>`

        document.body.appendChild(newEle.firstElementChild);
        newEle.innerHTML = `
        <div class="fixed"> 
        <div class="totalPriceCol">
           <h1>Total Cart Price</h1><hr>
           <div class="selectedName"></div>
           <hr>
           <article id="totalPrice">
               <span>Total Price: </span>
           </article>
           <a href=""><input id="buyAll" type="submit" value="Buy All"></a>
           </div> 
           </div> 
           `
        document.body.appendChild(newEle.firstElementChild);
        let container = document.getElementsByClassName("cartElementCol")[0];
        let sum = 0;
        basket.forEach((obj) => {
            sum += Number.parseInt(obj.priceValue)
            newEle.innerHTML = `
                    <div class= ${"item" + (cnt)}>
                        <div id= ${"image" + (cnt)}>
                            <a href=${obj.itemHref}>
                                <img id= ${obj.id} src= ${(obj.imageSrc).substring(obj.imageSrc.indexOf("all"), obj.imageSrc.length)} alt="">
                            </a>
                        </div>
                    <div class= ${"textCol" + (cnt)}>  
                        <div id= ${"decript" + (cnt)}>
                            <p>
                                ${obj.descriptContent}
                            </p>
                        </div>
                        <div id= ${"price" + (cnt)}>
                            <span>Price:  &#8377;</span><span id = ${"priceValue" + (cnt)}>${obj.priceValue}</span>
                        </div>
                        <div class= ${"sellerInfo" + (cnt)}>
                            <div  id= ${"name" + (cnt)}>
                                <span >Seller:   </span><span id= ${"item" + (cnt)}>${obj.sellerName}</span>
                            </div>
                            <div  id= ${"loc" + (cnt)}>
                                <span >location:    </span><span id=  ${"sellerLoc" + (cnt)}>${obj.sellerLoc}</span>
                            </div>
                        </div>
                    </div>
                    </div>
            `
            container.appendChild(newEle.firstElementChild);
            newEle.innerHTML = `
            <article id="${"productOnCounter" + cnt}">
                <span id=${"productOnCounterTitle" + cnt}>${obj.title}</span>
                <span id=${"productOnCounterPrice" + cnt}>&#8377;${obj.priceValue}</span>
            </article>`
            
            document.getElementsByClassName("selectedName")[0].appendChild(newEle.firstElementChild);
            cnt++;
        })
        newEle.innerHTML = `<span>&#8377; ${sum}</span>`
        document.getElementById("totalPrice").appendChild(newEle.firstElementChild);
    }
    else {
        // Show Empty Cart Page
        document.body.innerHTML = `
            <div class="emptyCart">
                <div class="box">
                    <h1>Cart</h1>
                    <h2>Your Cart is empty!</h2>
                    <input type="button" value="Explore">
                </div>
            </div>`
    }
}
addItemsInCart();

if(!basket.length){
    const goHome = document.getElementsByClassName("box")[0].lastElementChild;
    goHome.addEventListener('click',(e)=>{
        location.href = './index.html'
    });
}
