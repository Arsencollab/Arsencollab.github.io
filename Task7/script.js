document.addEventListener("DOMContentLoaded", function () {
    const slides = document.getElementById("slides");
    const images = slides.querySelectorAll("img");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const pager = document.getElementById("pager");

    let currentPage = 0;

    function getImagesPerPage() {
        if (window.innerWidth <= 600) {
            return 1;
        }

        return 3;
    }

    function getPageCount() {
        return Math.ceil(images.length / getImagesPerPage());
    }

    function createPager() {
        pager.innerHTML = "";

        const pageCount = getPageCount();

        for (let i = 0; i < pageCount; i++) {
            const button = document.createElement("button");
            button.type = "button";
            button.setAttribute("aria-label", "Страница " + (i + 1));

            button.addEventListener("click", function () {
                currentPage = i;
                updateSlider();
            });

            pager.appendChild(button);
        }
    }

    function updateSlider() {
        const imagesPerPage = getImagesPerPage();
        const pageCount = getPageCount();

        if (currentPage >= pageCount) {
            currentPage = pageCount - 1;
        }

        const shift = currentPage * (100 / imagesPerPage) * imagesPerPage;
        slides.style.transform = "translateX(-" + shift + "%)";

        const buttons = pager.querySelectorAll("button");

        buttons.forEach(function (button, index) {
            button.classList.toggle("active", index === currentPage);
        });
    }

    nextButton.addEventListener("click", function () {
        if (currentPage < getPageCount() - 1) {
            currentPage++;
        } else {
            currentPage = 0;
        }

        updateSlider();
    });

    prevButton.addEventListener("click", function () {
        if (currentPage > 0) {
            currentPage--;
        } else {
            currentPage = getPageCount() - 1;
        }

        updateSlider();
    });

    window.addEventListener("resize", function () {
        currentPage = 0;
        createPager();
        updateSlider();
    });

    createPager();
    updateSlider();
});
