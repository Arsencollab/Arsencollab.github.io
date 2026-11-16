
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const form = document.getElementById("feedback-form");
    const openButton = document.getElementById("open-form");
    const closeButton = document.getElementById("close-form");
    const result = document.getElementById("result");

    const storageKey = "feedbackDraft";
    const fields = form.querySelectorAll("input, textarea");

    function saveForm() {
        const data = {};

        fields.forEach(function (field) {
            data[field.name] = field.type === "checkbox"
                ? field.checked
                : field.value;
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

    function updateModal() {
        const isOpen = window.location.hash === "#feedback";

        modal.hidden = !isOpen;
        document.body.style.overflow = isOpen ? "hidden" : "";
    }

    function openModal() {
        if (window.location.hash !== "#feedback") {
            history.pushState({ modalOpen: true }, "", "#feedback");
        }

        updateModal();
    }

    function closeModal() {
        if (window.location.hash === "#feedback") {
            history.back();
        } else {
            updateModal();
        }
    }

    openButton.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    window.addEventListener("popstate", updateModal);
    window.addEventListener("hashchange", updateModal);

    fields.forEach(function (field) {
        field.addEventListener("input", saveForm);
        field.addEventListener("change", saveForm);
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
    updateModal();
});
