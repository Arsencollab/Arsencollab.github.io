
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("feedback-form");
    const result = document.getElementById("result");
    const storageKey = "feedbackDraft";
    const fields = form.querySelectorAll("input, textarea");

    function saveForm() {
        const data = {};

        fields.forEach(function (field) {
            if (field.type === "checkbox") {
                data[field.name] = field.checked;
            } else {
                data[field.name] = field.value;
            }
        });

        localStorage.setItem(storageKey, JSON.stringify(data));
    }

    function restoreForm() {
        const saved = localStorage.getItem(storageKey);

        if (!saved) {
            return;
        }

        try {
            const data = JSON.parse(saved);

            fields.forEach(function (field) {
                if (Object.prototype.hasOwnProperty.call(data, field.name)) {
                    if (field.type === "checkbox") {
                        field.checked = data[field.name];
                    } else {
                        field.value = data[field.name];
                    }
                }
            });
        } catch (error) {
            localStorage.removeItem(storageKey);
        }
    }

    function updateHistory() {
        if (window.location.hash !== "#feedback") {
            history.pushState({ formOpen: true }, "", "#feedback");
        }
    }

    fields.forEach(function (field) {
        field.addEventListener("input", saveForm);
        field.addEventListener("change", saveForm);
    });

    window.addEventListener("popstate", function () {
        if (window.location.hash !== "#feedback") {
            form.hidden = true;
            result.textContent = "";
        } else {
            form.hidden = false;
        }
    });

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        result.textContent = "Отправка...";

        const formData = new FormData(form);

        try {
            const response = await fetch(
                "https://formcarry.com/s/REPLACE_WITH_FORM_ID",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Ошибка сервера");
            }

            result.textContent = "Сообщение успешно отправлено!";
            form.reset();
            localStorage.removeItem(storageKey);
        } catch (error) {
            result.textContent = "Ошибка отправки. Попробуйте ещё раз.";
        }
    });

    restoreForm();
    updateHistory();
});

