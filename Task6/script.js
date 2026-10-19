document.addEventListener("DOMContentLoaded", function () {
    const quantityInput = document.getElementById("quantity");
    const serviceRadios = document.querySelectorAll('input[name="service"]');
    const optionsBlock = document.getElementById("options-block");
    const optionSelect = document.getElementById("option");
    const propertyBlock = document.getElementById("property-block");
    const propertyCheckbox = document.getElementById("property");
    const result = document.getElementById("result");

    const prices = {
        1: 500,
        2: 1000,
        3: 1500
    };

    function calculate() {
        let quantity = parseInt(quantityInput.value, 10);

        if (isNaN(quantity) || quantity < 1) {
            result.textContent = "Ошибка: введите корректное количество.";
            return;
        }

        const selectedService = document.querySelector(
            'input[name="service"]:checked'
        );

        const serviceType = selectedService.value;
        let price = prices[serviceType];

        if (serviceType === "2") {
            price += parseInt(optionSelect.value, 10);
        }

        if (serviceType === "3" && propertyCheckbox.checked) {
            price += 300;
        }

        const total = price * quantity;

        result.textContent = "Стоимость: " + total + " руб.";
    }

    function updateForm() {
        const selectedService = document.querySelector(
            'input[name="service"]:checked'
        ).value;

        optionsBlock.style.display = "none";
        propertyBlock.style.display = "none";

        if (selectedService === "2") {
            optionsBlock.style.display = "block";
        }

        if (selectedService === "3") {
            propertyBlock.style.display = "block";
        }

        calculate();
    }

    quantityInput.addEventListener("input", calculate);

    serviceRadios.forEach(function (radio) {
        radio.addEventListener("change", updateForm);
    });

    optionSelect.addEventListener("change", calculate);
    propertyCheckbox.addEventListener("change", calculate);

    updateForm();
});
