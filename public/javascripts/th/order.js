// Event listener for checkboxes
document.querySelectorAll('.menu-box').forEach(checkbox => {
    checkbox.addEventListener('click', function () {
        eventCheckbox(checkbox.id);
    });
});

// Store the IDs of active checkboxes Topping
var activeCheckboxesTopping= [];

function eventCheckboxTopping(topping_id) {
    const checkbox = document.getElementById(topping_id);
    let num = topping_id.slice(8);
    let menu_box = "menu-box-topping-" + num;
    const td = document.getElementById(menu_box);

    // If the checkbox is already checked and the limit is reached, prevent activation
    if (checkbox.checked && activeCheckboxesTopping.length >= 3) {
        checkbox.checked = false;
        return;
    }

    // If the checkbox is checked
    if (checkbox.checked) {
        // Add the newly activated checkbox to the active list
        activeCheckboxesTopping.push(topping_id); //topping-x

        // Add the 'menu-box-check' class and remove the 'menu-box' class
        td.classList.add('menu-box-check');
        td.classList.remove('menu-box');

    } else {
        // If the checkbox is unchecked, remove it from the active list
        activeCheckboxesTopping = activeCheckboxesTopping.filter(id => id !== topping_id);

        // Remove the 'menu-box-check' class and add the 'menu-box' class
        td.classList.remove('menu-box-check');
        td.classList.add('menu-box');
    }

    // Disable all checkboxes if the maximum limit is reached
    const allCheckboxes = document.querySelectorAll('.menu-box');
    allCheckboxes.forEach(cb => {
        cb.disabled = activeCheckboxesTopping.length >= 3 && !cb.checked;
    });
}

/***************************************************************************************************************/

// Store the IDs of active checkboxes Sauce
var activeCheckboxesSauce= [];

function eventCheckboxSauce(sauce_id) {
    const checkbox = document.getElementById(sauce_id);
    let num = sauce_id.slice(6);
    let menu_box = "menu-box-sauce-" + num;
    const td = document.getElementById(menu_box);

    // If the checkbox is already checked and the limit is reached, prevent activation
    if (checkbox.checked && activeCheckboxesSauce.length >= 2) {
        checkbox.checked = false;
        return;
    }

    // If the checkbox is checked
    if (checkbox.checked) {
        // Add the newly activated checkbox to the active list
        activeCheckboxesSauce.push(sauce_id);

        // Add the 'menu-box-check' class and remove the 'menu-box' class
        td.classList.add('menu-box-check');
        td.classList.remove('menu-box');

    } else {
        // If the checkbox is unchecked, remove it from the active list
        activeCheckboxesSauce = activeCheckboxesSauce.filter(id => id !== sauce_id);

        // Remove the 'menu-box-check' class and add the 'menu-box' class
        td.classList.remove('menu-box-check');
        td.classList.add('menu-box');
    }

    // Disable all checkboxes if the maximum limit is reached
    const allCheckboxes = document.querySelectorAll('.menu-box');
    allCheckboxes.forEach(cb => {
        cb.disabled = activeCheckboxesSauce.length >= 2 && !cb.checked;
    });
}

/***************************************************************************************************************/

// Store the IDs of active checkboxes Package
var activeCheckboxesPackage= [];

function eventCheckboxPackage(package_id) {
    const checkbox = document.getElementById(package_id);
    let num = package_id.slice(8);
    let menu_box = "menu-box-package-" + num;
    const td = document.getElementById(menu_box);

    // If the checkbox is already checked and the limit is reached, prevent activation
    if (checkbox.checked && activeCheckboxesPackage.length >= 1) {
        checkbox.checked = false;
        return;
    }

    // If the checkbox is checked
    if (checkbox.checked) {
        // Add the newly activated checkbox to the active list
        activeCheckboxesPackage.push(package_id);

        // Add the 'menu-box-check' class and remove the 'menu-box' class
        td.classList.add('menu-box-check');
        td.classList.remove('menu-box');

    } else {
        // If the checkbox is unchecked, remove it from the active list
        activeCheckboxesPackage = activeCheckboxesPackage.filter(id => id !== package_id);

        // Remove the 'menu-box-check' class and add the 'menu-box' class
        td.classList.remove('menu-box-check');
        td.classList.add('menu-box');
    }

    // Disable all checkboxes if the maximum limit is reached
    const allCheckboxes = document.querySelectorAll('.menu-box');
    allCheckboxes.forEach(cb => {
        cb.disabled = activeCheckboxesPackage.length >= 1 && !cb.checked;
    });
}

/***************************************************************************************************************/

// Adding - Removing Partition
var total_icecream = 0;

function add(id) {

    let num = id.slice(4);

    let field = "field-" + num;

    var element = document.getElementById(field);

    if (element) {

        let value = parseInt(element.value);


        if (value < 3 && total_icecream < 3) {
            // alert("Pass");
            total_icecream += 1;
            value += 1;
        }

        element.value = value;

    }
}

function remove(id) {

    let num = id.slice(7);

    let field = "field-" + num;

    var element = document.getElementById(field);

    if (element) {

        let value = parseInt(element.value);

        if (value > 0 && total_icecream > 0) {
            total_icecream -= 1;
            value -= 1;
        }
        element.value = value;

    }
}

/***************************************************************************************************************/