const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");


let getMode = localStorage.getItem("mode");

if(getMode && getMode ==="dark"){
    //body.classList.toggle("dark");
    //body.classList.toggle("dark2");
}

if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches && getMode === "light"){
    //
} else {
    body.classList.toggle("dark");
}


modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");
    //body.classList.toggle("dark2");
    if(body.classList.contains("dark")){
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
});