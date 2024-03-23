document.querySelector("#openEye").addEventListener('mousedown', (event) => {
    document.querySelector("#Password").setAttribute('type', 'text');
})
document.querySelector("#openEye").addEventListener('mouseup', (event) => {
    document.querySelector("#Password").setAttribute('type', 'password');
})

document.querySelector("#confirmPassword").addEventListener("focusout", (event) => {
    let pass = document.querySelector("#Password");
    let confPass = document.querySelector("#confirmPassword");
    if (pass.value !== confPass.value) {
        if (!document.querySelector("#alert")) {
            let alert = document.createElement("div");
            alert.id = "alert";
            alert.innerText = "Password field not same"
            document.querySelector(".container").firstElementChild.after(alert);
        }
    }
    else {
        if (document.querySelector("#alert")) {
            document.querySelector("#alert").remove()
        }
    }
})
