function getTelNum(id) {
    const tel_button = document.getElementById(id);
    const text_field = document.getElementById("result");

    if (tel_button != null) {
        let inputValue = text_field.value;

        inputValue = inputValue.replace(/\D/g, "");

        if (tel_button.value === "<") {
            inputValue = inputValue.replace(/.$/, "");
        } else {
            if (inputValue.length >= 10) return;

            inputValue += tel_button.value;
        }

        if (inputValue.length > 0) {
            inputValue = inputValue.replace(/(\d{1,3})(\d{0,3})(\d{0,4})/,
                function (match, p1, p2, p3) {
                    let formattedNumber = "";
                    if (p1) formattedNumber += p1;
                    if (p2) formattedNumber += "-" + p2;
                    if (p3) formattedNumber += "-" + p3;
                    return formattedNumber;
                }
            );
        }

        text_field.value = inputValue;
    } else {
        console.log("Cannot get element");
    }
}

function backToPayment(){
    window.location.href = "/th/order/payment";
}

function backToPrevious(){
    window.history.back();
}

