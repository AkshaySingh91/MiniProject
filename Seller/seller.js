// Array.from(document.querySelectorAll("input[class $= 'Image']")).forEach(element => {

//     let dropArea = element.closest("div[class ^= 'upload']")
//     dropArea.addEventListener('click', (e) => {
//         element.click();
//     })
//     element.addEventListener('change', () => {
//         let eve = new Event('dragover')
//         dropArea.dispatchEvent(eve);
//         showThumbnail(dropArea, element.files[0])
//     })

//     dropArea.addEventListener('dragover', (e) => {
//         e.preventDefault();
//         dropArea.classList.add("dragOver");
//     })

//     dropArea.addEventListener('dragleave', () => {
//         if(!element.files.length){
//             dropArea.classList.remove("dragOver");
//         }
//     })

//     dropArea.addEventListener('drop', (e) => {
//         e.preventDefault();
//         if (e.dataTransfer.files.length) {
//             element.files = e.dataTransfer.files;
//             showThumbnail(dropArea, element.files[0]);
//         }
//         else if(!element.files.length){
//             dropArea.classList.remove("dragOver");
//         }
//     })
// })

// function showThumbnail(parent, file) {

//     if (parent.getElementsByTagName("span")[0] && parent.getElementsByTagName("span")[0].id == "instruct") {
//         parent.getElementsByTagName("span")[0].remove();
//     }
//     if (!parent.getElementsByClassName("thumbnail")[0]) {
//         const thumbnail = document.createElement('div');
//         thumbnail.classList.add("thumbnail");
//         parent.appendChild(thumbnail);
//         const title = document.createElement('span');
//         title.id = "title";
//         title.innerText = file.name;
//         thumbnail.appendChild(title)
//     }
//     if (file.type.startsWith('image/')) {
//         const showImg = new FileReader();
//         showImg.readAsDataURL(file);
//         console.log(showImg);
//         console.log(URL.createObjectURL(file))
//         showImg.onload = () => {
//             parent.getElementsByClassName("thumbnail")[0].style.background = `url(${showImg.result})`;
//             parent.getElementsByClassName("thumbnail")[0].style.backgroundSize = "contain";
//         }
//     }
//     else {
//         parent.getElementsByClassName("thumbnail")[0].style.background = "#cccccc";
//     }
//     // for(let i=1; i<document.getElementsByClassName("getProductImage")[0].files.length; i++){
//     // console.log(parent.querySelector("input[class $= 'Image']").files);
//     // }
// }

module.exports = 13213;