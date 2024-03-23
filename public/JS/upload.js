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

document.querySelectorAll('input[type="radio"]').forEach( (r) => {
    r.addEventListener('click', async (e) => {
        if (r.value === 'yes') {
            const btn = document.createElement('button')
            btn.value = "Add"
            btn.innerText = "Add"
            document.getElementsByClassName('state')[0].after(btn);

            const div = document.createElement('div');
            div.setAttribute("class", "specField"); 
            div.style.display = "inline-block"
            div.innerHTML = `
            <input type="text" maxlength="20">
            <span id= "deleteField">  &#x2715; </span>   
            `
            await document.getElementsByClassName('specification')[0].appendChild(div); 

            document.querySelector(".specification").querySelectorAll(".specField").forEach(div=>{
                div.querySelector('input').addEventListener('input', r => {
                        console.log(div.querySelector('input').value);
                        div.querySelector('input').setAttribute('name', div.querySelector('input').value)
                    })
                div.querySelector('span').addEventListener('click', e => { 
                    div.remove()
                }) 
            }) 
        }
        else {
            if (document.querySelector(".specification").querySelectorAll(".specField")) {
                document.querySelector(".specification").querySelectorAll(".specField").forEach(e => {
                    e.remove()
                })
            }
            if (document.querySelector(".specification").querySelector("button[value='Add']")) {
                document.querySelector(".specification").querySelectorAll("button[value='Add']").forEach(e => {
                    e.remove()
                })
            }
        }
    })
})
document.querySelector(".specification").addEventListener('click', async (e) => {
    if (e.target.value == "Add") {
        e.preventDefault();

        const div = document.createElement('div');
        div.setAttribute("class", "specField"); 
        div.style.display = "inline-block"
        div.innerHTML = `
        <input type="text" maxlength="20">
        <span id= "deleteField">  &#x2715; </span>   
        `
        await document.getElementsByClassName('specification')[0].appendChild(div);

        console.log(document.querySelector(".specification").querySelectorAll("input[type='text']"));

        document.querySelector(".specification").querySelectorAll(".specField").forEach(div=>{
            div.querySelector('input').addEventListener('input', r => {
                    console.log(div.querySelector('input').value);
                    div.querySelector('input').setAttribute('name', div.querySelector('input').value)
                })
            div.querySelector('span').addEventListener('click', e => { 
                div.remove()
            }) 
        }) 
    }
}) 