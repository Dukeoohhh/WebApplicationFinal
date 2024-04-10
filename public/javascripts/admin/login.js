function userCheck(){
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    if(username.value === "admin" && password.value === "admin"){
        window.location.href = "administrator/order";
    } else {
        alert("Please input correct urername or password!");
        username.value = "";
        password.value = "";
    }
}