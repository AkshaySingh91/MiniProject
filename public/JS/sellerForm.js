Array.from(document.querySelectorAll("input[class $= 'Image']")).forEach(element => {
    
    let dropArea = element.closest("div[class ^= 'upload']")
    dropArea.addEventListener('click', (e) => {
        element.click();
    })
    element.addEventListener('change', () => {
        let eve = new Event('dragover')
        dropArea.dispatchEvent(eve);
        showThumbnail(dropArea, element.files[0])
    })

    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add("dragOver");
    })

    dropArea.addEventListener('dragleave', () => {
        if (!element.files.length) {
            dropArea.classList.remove("dragOver");
        }
    })

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
            element.files = e.dataTransfer.files;
            showThumbnail(dropArea, element.files[0]);
        }
        else if (!element.files.length) {
            dropArea.classList.remove("dragOver");
        }
    })
})

function showThumbnail(parent, file) {

    if (parent.getElementsByTagName("span")[0] && parent.getElementsByTagName("span")[0].id == "instruct") {
        parent.getElementsByTagName("span")[0].remove();
    }
    if (!parent.getElementsByClassName("thumbnail")[0]) {
        const thumbnail = document.createElement('div');
        thumbnail.classList.add("thumbnail");
        parent.appendChild(thumbnail);
        const title = document.createElement('span');
        title.id = "title";
        title.innerText = file.name;
        thumbnail.appendChild(title)
    }
    if (file.type.startsWith('image/')) {
        const showImg = new FileReader();
        showImg.readAsDataURL(file);
        console.log(showImg);
        console.log(URL.createObjectURL(file))
        showImg.onload = () => {
            parent.getElementsByClassName("thumbnail")[0].style.background = `url(${showImg.result})`;
            parent.getElementsByClassName("thumbnail")[0].style.backgroundSize = "contain";
        }
    }
    else {
        parent.getElementsByClassName("thumbnail")[0].style.background = "#cccccc";
    }
    // for(let i=1; i<document.getElementsByClassName("getProductImage")[0].files.length; i++){
    // console.log(parent.querySelector("input[class $= 'Image']").files);
    // }
}



document.addEventListener("DOMContentLoaded", function () {
    let select = document.querySelector("#getParentCategory")
    let selectedOption = select.options[select.selectedIndex];
    let id = selectedOption.value;
    if (id === 'none') {
        document.querySelector(".catPathToogle").classList.remove("catPath")
    }
    document.querySelector(".constSpecification").classList.remove("constSpecificationToogle")
    // 
    document.getElementById("title").value = "TempTitle"
    document.getElementById("price").value = 101
    document.getElementById("description").value = "this is description"
    document.getElementById("gurrantee").value = 2
    const e = new Event("click");
    document.getElementById("yes").dispatchEvent(e)  
    document.getElementById("quantity").value = "pack of 12";  
 
    // 
    select.addEventListener(("change"), async (e) => {
       
        selectedOption = select.options[select.selectedIndex];
        id = selectedOption.value;
        document.querySelector(".catPathToogle").classList.add("catPath")
        
        document.querySelector("#getParentCategory").setAttribute("name", id);
        document.querySelector("#getParentCategory").querySelector('option[value="none"]').checked = false

        fetch(`/seller/form?category=${id}`, { method: "get" })
        .then(async (res) => { return await res.json(); })
        .then(async (data) => {
                console.log(data);
                // showing all categories to user
                const show = `<span class="selectedCategories"> ${selectedOption.innerText}</span>`
                document.querySelector(".catPath").insertAdjacentHTML('afterbegin', show);
                // removing previous unselected categories 
                let preOpt = select.options.length, pos = 1;
                for (let i = 1; i < preOpt; i++) {
                    if (data.length != 0 || select.options[pos].value != id) {
                        await select.options[pos].remove();
                    }
                    else {
                        pos++
                    }
                }
                // to update all options tag to sub-catergories of selected categories
                let wrap = '';
                // data.length-1 becuase ladt elem is parent categ
                for (let i = 0; i < data.length - 1; i++) {
                    wrap += `<option value="${data[i]._id}">${data[i].name}</option>`
                }
                document.getElementById("getParentCategory").insertAdjacentHTML('beforeend', wrap)

                // generating compulsuary spec
                const mainSpec = data[data.length - 1];
                console.log(mainSpec);
                if (mainSpec.constSpec.length) {
                    const constSpecification = document.querySelector(".constSpecification")
                    constSpecification.classList.add("constSpecificationToogle");

                    if (mainSpec._id == id) {
                        if (constSpecification.childElementCount) {
                            constSpecification.innerHTML = ''
                        }
                        constSpecification.insertAdjacentHTML('afterbegin', `<h3>Enter Some defineSpecification of product</h3>`)
                        let allSpec = '';
                        mainSpec.constSpec.forEach(singleSpec => {
                            allSpec += `<lable for="${singleSpec}">${singleSpec.toUpperCase()}</lable>
                                <input name="const-${singleSpec}" class="allConstSpec" id="${singleSpec}"  type="text" "/>
                            `})
                        constSpecification.insertAdjacentHTML('beforeend', allSpec);
                    //   
                        document.getElementById("Rem").value = "const spec for rem"
                        document.getElementById("Power").value = "const spec for power"
                    // 
                    }
                } else {
                    document.querySelector(".constSpecification").classList.remove("constSpecificationToogle")
                }

            })
            .catch((err) => console.log(err.message))
    })
})

document.querySelector(".constSpecification").addEventListener('input', e=>{
   console.log(e.target);
    // singleSpec.addEventListener('input', e => { 
    //     const key = singleSpec.querySelector("input[class = 'key']")
    //     const val = singleSpec.querySelector("input[class = 'value']")
    //     if (e.target.classList.contains('key')) {
    //         key.setAttribute("name", "key-" + key.value);
    //     }
    //     else if (e.target.classList.contains('value')) {
    //         val.setAttribute("name", "value-" + key.value);
    //     }
    // })
})  


document.querySelector(".defineSpecification").querySelectorAll('input[type="radio"]').forEach((r) => {
    r.addEventListener('click', async (e) => {
        const btn = document.createElement('button')
        btn.value = "Add"
        btn.innerText = "Add"
        await document.querySelector('.state').after(btn);

            let wrap = `
            <div class="keyPair"> 
                <div class="partition"> 
                    <h3> defineSpecification </h3>
                    <h3> Value </h3>
                </div>
                <div class="specField">
                    <input  class="key" type="text" maxlength="20">
                    <input  class="value" type="text" maxlength="20">
                    <span class= "deleteField">  &#x2715; </span>   
                </div>
            </div>
            `
            await document.querySelector(".defineSpecification").insertAdjacentHTML('beforeend', wrap);
 //           
            document.querySelector(".key").value = "this is key"
            document.querySelector(".value").value = "this is value "
//
            if (r.value === 'yes') {
            Array.from(document.querySelector(".keyPair").querySelectorAll(".specField")).forEach(singleSpec => {
                singleSpec.addEventListener('input', e => { 
                    const key = singleSpec.querySelector("input[class = 'key']")
                    const val = singleSpec.querySelector("input[class = 'value']")
                    if (e.target.classList.contains('key')) {
                        key.setAttribute("name", "key-" + key.value);
                    }
                    else if (e.target.classList.contains('value')) {
                        val.setAttribute("name", "value-" + key.value);
                    }
                })
            })
            document.querySelector(".defineSpecification").querySelectorAll(".specField").forEach(div => {
                div.querySelector('input').addEventListener('input', r => {
                    div.querySelector('input').setAttribute('name', div.querySelector('input').value)
                })
                div.querySelector('span').addEventListener('click', e => {
                    div.remove()
                })
            })
        }   
        if (e.target.value === 'no' && document.querySelector(".keyPair")) {
            document.querySelector(".keyPair").remove()
            document.querySelector("button[value='Add']").remove()
        }
        else if (document.querySelector(".keyPair") ) { 
            document.querySelector(".deleteField").addEventListener('click', e => {
            document.querySelector(".keyPair").remove()
            document.querySelector("button[value='Add']").remove()
        })
        } 
    })
})

document.querySelector(".defineSpecification").addEventListener('click', async (e) => {
    if (e.target.value == "Add") {
        e.preventDefault() 
        wrap = `
                <div class="specField">
                    <input  class="key" type="text" maxlength="20">
                    <input  class="value" type="text" maxlength="20">
                    <span class= "deleteField">  &#x2715; </span>   
                </div>`
        await document.querySelector(".keyPair").insertAdjacentHTML('beforeend', wrap);

        Array.from(document.querySelector(".keyPair").querySelectorAll(".specField")).forEach(singleSpec => {
            singleSpec.addEventListener('input', e => {
                const key = singleSpec.querySelector("input[class = 'key']")
                const val = singleSpec.querySelector("input[class = 'value']")
                if (e.target.classList.contains('key')) {
                    key.setAttribute("name", "key-" + key.value);
                }
                else if (e.target.classList.contains('value')) {
                    val.setAttribute("name", "value-" + key.value);
                }
            })
        })
        document.querySelector(".defineSpecification").querySelectorAll(".specField").forEach(div => {
            div.querySelector('input').addEventListener('input', r => {
                div.querySelector('input').setAttribute('name', div.querySelector('input').value)
            })
            div.querySelector('span').addEventListener('click', e => {
                div.remove()
            })
        })
    }
})

