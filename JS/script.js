const menuToggle = () => {
    
    let mainMenu = document.getElementById("mainMenu");
    
    if (mainMenu.style.left === "-120rem") {
        mainMenu.style.left = "0"
    }
    else {
        mainMenu.style.left = "-120rem"
    }
}
