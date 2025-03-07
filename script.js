document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".insight-item");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    let currentIndex = 0;

    function showItems() {
        items.forEach((item, index) => {
            item.style.display = (index >= currentIndex && index < currentIndex + 2) ? "block" : "none";
        });

        prevBtn.style.display = currentIndex === 0 ? "none" : "block";
        nextBtn.style.display = currentIndex >= items.length - 2 ? "none" : "block";
    }

    prevBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex -= 2;
            showItems();
        }
    });

    nextBtn.addEventListener("click", function () {
        if (currentIndex < items.length - 2) {
            currentIndex += 2;
            showItems();
        }
    });

    showItems();

    // Mega Menu Fixes
    const dropdownLinks = document.querySelectorAll(".nav-item");
    const dropdownContents = document.querySelectorAll(".mega-dropdown");

    dropdownLinks.forEach(link => {
        link.addEventListener("mouseenter", function () {
            closeAllDropdowns();
            const targetDropdown = document.getElementById(this.getAttribute("data-target"));
            if (targetDropdown) {
                targetDropdown.classList.add("show");
            }
        });
    });

    document.querySelectorAll(".mega-dropdown a").forEach(link => {
        link.addEventListener("mouseenter", function () {
            this.classList.add("hovered");
        });

        link.addEventListener("mouseleave", function () {
            this.classList.remove("hovered");
        });
    });

    document.addEventListener("mousemove", function (event) {
        if (![...dropdownLinks, ...dropdownContents].some(el => el.contains(event.target))) {
            closeAllDropdowns();
        }
    });

    function closeAllDropdowns() {
        dropdownContents.forEach(dropdown => {
            dropdown.classList.remove("show");
        });
    }
});

const video = document.querySelector('.hero-video');
const heroContent = document.querySelector('.hero-content');
const h1 = document.querySelector('.hero-content h1');
const p = document.querySelector('.hero-content p');

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

function calculateBrightness() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let totalBrightness = 0;

    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        totalBrightness += (r + g + b) / 3;
    }

    return totalBrightness / (pixels.length / 4);
}

function adjustTextColor() {
    const brightness = calculateBrightness();
    h1.style.color = brightness < 128 ? '#D49139' : 'black';
    h1.style.fontSize = '52px';
    h1.style.textShadow = brightness < 128 ? '3px 3px 6px rgba(0, 0, 0, 0.8)' : '#D49139';
    p.style.color = brightness < 128 ? '#D49139' : 'black';
    p.style.fontSize = '30px';
    p.style.textShadow = brightness < 128 ? '2px 2px 4px rgba(0, 0, 0, 0.7)' : '#D49139';
}

setInterval(adjustTextColor, 500);

// Mega Dropdown Details (Including "About Us")
const detailsContent = {
    // Existing "What We Do" sections
    "academy": { title: "Acumen Academy", description: "Acumen Academy equips social entrepreneurs with the knowledge and skills to drive change.", image: "academy.jpg" },
    "ventures": { title: "Acumen Ventures", description: "Investing in early-stage companies that bring scalable solutions to the poor.", image: "ventures.jpg" },
    "approach": { title: "Our Approach", description: "A unique approach that blends philanthropy and impact investing.", image: "approach.jpg" },
    "impact": { title: "Impact", description: "Measuring our impact to ensure long-lasting change.", image: "impact.jpg" },
    "capital": { title: "Patient Capital", description: "Deploying philanthropic capital to high-impact enterprises.", image: "capital.jpg" },
    "portfolio": { title: "Investment Portfolio", description: "A diverse portfolio of investments tackling global challenges.", image: "portfolio.jpg" },

    // **Newly Added About Us Sections**
    "mission": { title: "Our Mission", description: "We aim to create sustainable solutions that impact communities worldwide.", image: "mission.jpg" },
    "vision": { title: "Our Vision", description: "To be a leading force in innovation and positive global change.", image: "vision.jpg" },
    "values": { title: "Core Values", description: "Integrity, Excellence, and Innovation drive everything we do.", image: "values.jpg" },
    "team": { title: "Our Team", description: "Meet our dedicated professionals making a difference.", image: "team.jpg" },
    "history": { title: "Our History", description: "Discover our journey from inception to where we are today.", image: "history.jpg" },
    "partners": { title: "Our Partners", description: "We collaborate with trusted organizations for greater impact.", image: "partners.jpg" },

    // Projects sections (newly added for example)
    "current-projects": { title: "Current Projects", description: "Explore the current projects we're working on.", image: "current-projects.jpg" },
    "past-projects": { title: "Past Projects", description: "Look back at our past initiatives and their outcomes.", image: "past-projects.jpg" },
    "upcoming-initiatives": { title: "Upcoming Initiatives", description: "Check out what we have in the pipeline for the future.", image: "upcoming-initiatives.jpg" },

    // Where We Work sections
    "africa": { title: "Africa", description: "Discover our impact in Africa.", image: "africa.jpg" },
    "asia": { title: "Asia", description: "Our projects across Asia.", image: "asia.jpg" },
    "latin-america": { title: "Latin America", description: "Exploring the impact we are making in Latin America.", image: "latin-america.jpg" },

    // Knowledge Hub sections
    "reports": { title: "Reports & Publications", description: "Access our reports and publications on various topics.", image: "reports.jpg" },
    "case-studies": { title: "Case Studies", description: "Detailed case studies on our work and its impact.", image: "case-studies.jpg" },
    "research": { title: "Research", description: "Explore the latest research in our knowledge hub.", image: "research.jpg" }
};

// Function to show details on hover
function showDetails(section, container) {
    const detailsDiv = container.querySelector('#details-content'); // Find the specific details-content container
    const data = detailsContent[section];

    if (data) {
        detailsDiv.innerHTML = `
            <h2>${data.title}</h2>
            <p>${data.description}</p>
            <img src="${data.image}" alt="${data.title}" style="width:100%; max-height:300px; object-fit: cover;">
        `;
    }
}

// Event listeners for **all** the links across the mega menu
document.querySelectorAll(".mega-menu-parent .links a").forEach(item => {
    item.addEventListener("mouseenter", function () {
        const section = this.getAttribute("data-section"); // Get section name
        if (section) {
            const parentMenu = this.closest('.mega-menu-parent'); // Get the parent section
            showDetails(section, parentMenu); // Pass the parent section to the showDetails function
        }
    });
});

// Select the navbar links and the mega dropdown section
const navLinks = document.querySelectorAll(".nav-item");
const megaMenu = document.getElementById("mega-dropdown");

// Show dropdown on hover
navLinks.forEach(link => {
    link.addEventListener("mouseenter", function () {
        megaMenu.style.display = "block"; // Show mega menu
    });
});

// Keep dropdown open when hovering over it
megaMenu.addEventListener("mouseenter", function () {
    megaMenu.style.display = "block"; // Stay open
});

// Hide dropdown when moving mouse away
megaMenu.addEventListener("mouseleave", function () {
    megaMenu.style.display = "none"; // Hide when mouse leaves
});

navLinks.forEach(link => {
    link.addEventListener("mouseleave", function () {
        setTimeout(() => {
            if (!megaMenu.matches(":hover")) {
                megaMenu.style.display = "none"; // Hide if not hovering over mega menu
            }
        }, 300); // Delay to allow moving mouse into the dropdown
    });
});


// Function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < window.innerHeight * 0.85 &&  // Trigger slightly before full visibility
        rect.bottom > 0
    );
}

// Function to handle scroll and apply the animation
function handleScroll() {
    document.querySelectorAll('section').forEach(section => {
        if (!section.classList.contains('section-slide-in')) {
            section.classList.add('section-slide-in'); // Add animation class to all sections
        }
        if (isElementInViewport(section)) {
            section.classList.add('visible');
        }
    });
}

// Run animation on scroll and on page load
window.addEventListener('scroll', handleScroll);
window.addEventListener('DOMContentLoaded', handleScroll);




