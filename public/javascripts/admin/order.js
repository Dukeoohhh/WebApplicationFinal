function paid(id){
    const checkbox = document.getElementById(id);
    checkbox.classList.remove("button");
    checkbox.classList.add("button-active");
}