(function () {
    const links = [...document.querySelectorAll(".nav-links a")];
    const currentSeg = location.pathname.replace(/^\/+/, "").split("/")[0];

    let activeLink = null;
    links.forEach(link => {
        const linkSeg = link.pathname.replace(/^\/+/, "").split("/")[0];
        if (linkSeg && linkSeg === currentSeg) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
            activeLink = link;
        }
    });

    const nav = document.querySelector(".nav-links");
    const slider = document.createElement("div");
    slider.className = "nav-slider";
    nav.appendChild(slider);

    function moveSlider(target, animate) {
        slider.style.transition = animate ? "left 0.3s ease, width 0.3s ease" : "none";
        slider.style.left = target.offsetLeft + "px";
        slider.style.width = target.offsetWidth + "px";
        slider.style.opacity = "1";
    }

    function initSlider() {
        if (!activeLink) {
            slider.style.opacity = "0";
            return;
        }
        moveSlider(activeLink, false);
        setTimeout(() => moveSlider(activeLink, false), 100);
    }

    if (document.readyState === "complete") {
        initSlider();
    } else {
        window.addEventListener("load", initSlider);
    }

    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const href = link.href;

            if (!activeLink) {
                slider.style.transition = "none";
                slider.style.left = "-300px";
                slider.style.width = link.offsetWidth + "px";
                slider.style.opacity = "1";
                requestAnimationFrame(() => {
                    slider.style.transition = "left 0.3s ease";
                    slider.style.left = link.offsetLeft + "px";
                });
            } else {
                // Normal zwischen Tabs
                moveSlider(link, true);
            }

            setTimeout(() => { window.location.href = href; }, 300);
        });
    });

    const logoLink = document.querySelector(".nav-left a");
    if (logoLink) {
        logoLink.addEventListener("click", e => {
            if (!activeLink) return;
            e.preventDefault();
            slider.style.transition = "left 0.3s ease";
            slider.style.left = "-300px";
            setTimeout(() => { window.location.href = logoLink.href; }, 300);
        });
    }

    document.querySelectorAll(".button-grid a").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const href = link.href;

            const targetSeg = link.pathname.replace(/^\/+/, "").split("/")[0];
            const matchingNavLink = links.find(l =>
                l.pathname.replace(/^\/+/, "").split("/")[0] === targetSeg
            );

            slider.style.transition = "none";
            slider.style.left = "-300px";
            slider.style.width = matchingNavLink ? matchingNavLink.offsetWidth + "px" : "80px";
            slider.style.opacity = "1";

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    slider.style.transition = "left 0.3s ease, width 0.3s ease";
                    if (matchingNavLink) {
                        slider.style.left = matchingNavLink.offsetLeft + "px";
                        slider.style.width = matchingNavLink.offsetWidth + "px";
                    }
                });
            });

            setTimeout(() => { window.location.href = href; }, 300);
        });
    });
})();