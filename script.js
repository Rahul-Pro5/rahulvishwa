// Menu toggle for mobile version

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

// copy to clipboard

function copyToClipboard() {
    const textToCopy = "hi@clavio.studio";
    navigator.clipboard.writeText(textToCopy).then(() => {
        const button = document.querySelector('.animate-button');
        button.classList.add('copied-state');
        button.querySelector('.text').style.display = 'none';
        button.querySelector('.arrow').style.display = 'none';
        button.querySelector('.copied').style.display = 'flex';
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Time on header

function updateTime() {
    const now = new Date();

      // Chennai time (UTC+5:30)
    const chennaiTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    document.getElementById("chennaiTime").innerText = chennaiTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

    // New York time (UTC-5 or UTC-4 for daylight saving)
    const newYorkTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
    document.getElementById("newYorkTime").innerText = newYorkTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    }

    // Update time every second
    setInterval(updateTime, 1000);
    updateTime(); // Initial call to display time immediately




    //Hero section parallax
    window.addEventListener('scroll', () => {
        const text = document.querySelector('.Hero-Text');
        const scrollPosition = window.scrollY;
      
        // Parallax Effect
        text.style.transform = `translate(-50%, calc(-50% + ${scrollPosition * 0.3}px))`;
      });


// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade-in and move-in effect for elements as they come into view
const faders = document.querySelectorAll('.fade-in');
const movers = document.querySelectorAll('.move-in');
const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

movers.forEach(mover => {
    appearOnScroll.observe(mover);
});

// IMAGE PREVIEW
document.querySelectorAll('.menu-contents td').forEach((cell, index) => {
    cell.addEventListener('mouseover', () => {
      const imagePreview = document.querySelector('.image-preview');
      const images = [
        'HUNGROOVE.png',
        'Assets/SHAKESBEAR.png',
        'Assets/GHPL.png',
        'Assets/CURRY-TIMES.png',
        'Assets/COSMO.png',
        'Assets/AMBERSAR.png',
        'Assets/MARKETING-FREAK.png',
        'Assets/CLAVIO.png'
      ];
      imagePreview.style.backgroundImage = `url(${images[index]})`;
    });
  });
