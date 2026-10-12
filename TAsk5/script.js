document.addEventListener("DOMContentLoaded", function () {
    const quantityInput = document.getElementById("quantity");
    const productSelect = document.getElementById("product");
    const calculateButton = document.getElementById("calculate");
    const result = document.getElementById("result");

    calculateButton.addEventListener("click", function () {
        const quantity = quantityInput.value.trim();
        const quantityPattern = /^[1-9]\d*$/;

        if (!quantityPattern.test(quantity)) {
            result.textContent = "Ошибка: введите целое положительное количество товара.";
            return;
        }

        const price = parseInt(productSelect.value, 10);
        const count = parseInt(quantity, 10);
        const total = price * count;

        result.textContent = "Стоимость заказа: " + total + " руб.";
    });
});о
