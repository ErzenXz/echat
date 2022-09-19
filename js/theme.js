const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");


let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark" || window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches){
    body.classList.toggle("dark");
    //body.classList.toggle("dark2");
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
