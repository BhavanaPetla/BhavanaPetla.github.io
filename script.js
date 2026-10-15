

// PORTFOLIO INTERACTIONS



// Update the copyright year automatically.

const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// Reveal project cards, skills, and achievements
// smoothly as they enter the screen.

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }
            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -25px 0px"
        }
    );

    revealElements.forEach((element, index) => {

        // Slightly stagger the animations for a polished effect.
        element.style.transitionDelay =
            `${(index % 3) * 80}ms`;

        revealObserver.observe(element);
    });

} else {

    // Fallback for browsers without IntersectionObserver.
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


// Highlight the floating navigation icon
// based on the section currently being viewed.

const dockLinks = document.querySelectorAll(".dock-link");
const sections = document.querySelectorAll("main section[id]");

if (
    "IntersectionObserver" in window &&
    dockLinks.length &&
    sections.length
) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                dockLinks.forEach((link) => {

                    const isCurrent =
                        link.getAttribute("href") ===
                        `#${entry.target.id}`;

                    link.classList.toggle("active", isCurrent);
                });
            });

        },
        {
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


// Respect accessibility settings for reduced motion.

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    revealElements.forEach((element) => {

        element.classList.add("visible");
        element.style.transitionDelay = "0ms";
    });
}
