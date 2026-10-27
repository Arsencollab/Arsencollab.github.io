document.addEventListener("DOMContentLoaded", function () {
    const slides = document.getElementById("slides");
    const images = slides.querySelectorAll("img");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const pager = document.getElementById("pager");

    let currentPage = 0;
    let imagesPerPage = 1;
    let pageCount = 0;

    function updateSettings() {
        if (window.innerWidth >= 768) {
            imagesPerPage = 3;
        } else {
            imagesPerPage = 1;
        }

        pageCount = Math.ceil(images.length / imagesPerPage);

        if (currentPage >= pageCount) {
            currentPage = pageCount - 1;
        }

        createPager();
        showPage();
    }

    function showPage() {
        const shift = currentPage * 100;
        slides.style.transform = "translateX(-" + shift + "%)";

        const buttons = pager.querySelectorAll("button");

        buttons.forEach(function (button, index) {
            if (index === currentPage) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });
    }

    function createPager() {
        pager.innerHTML = "";

        for (let i = 0; i < pageCount; i += 1) {
            const button = document.createElement("button");
            button.type = "button";
            button.setAttribute("aria-label", "Страница " + (i + 1));

            button.addEventListener("click", function () {
                currentPage = i;
                showPage();
            });

            pager.appendChild(button);
        }
    }

    prevButton.addEventListener("click", function () {
        if (currentPage > 0) {
            currentPage -= 1;
            showPage();
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentPage < pageCount - 1) {
            currentPage += 1;
            showPage();
        }
    });

    window.addEventListener("resize", updateSettings);

    updateSettings();
});
