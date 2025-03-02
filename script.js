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

setInterval(updateTime, 1000);
updateTime(); // Initial call

// Hero section parallax
window.addEventListener('scroll', () => {
    const text = document.querySelector('.Hero-Text');
    const scrollPosition = window.scrollY;
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

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

movers.forEach(mover => {
    appearOnScroll.observe(mover);
});

// IMAGE PREVIEW & Circle Toggle
const cells = document.querySelectorAll('.menu-contents td');
const imagePreview = document.querySelector('.image-preview');
// Declare circleContainer only once here
const circleContainer = document.querySelector('.circle-container');

const images = [
  'Assets/HUNGROOVE.png',
  'Assets/SHAKESBEAR.png',
  'Assets/GHPL.png',
  'Assets/CURRY-TIMES.png',
  'Assets/COSMO.png',
  'Assets/AMBERSAR.png',
  'Assets/MARKETING-FREAK.png',
  'Assets/CLAVIO.png'
];

cells.forEach((cell, index) => {
  cell.addEventListener('mouseover', () => {
    imagePreview.style.backgroundImage = `url(${images[index]})`;
    imagePreview.style.display = 'block';
    circleContainer.style.display = 'none';
  });
});

// When the mouse leaves the names table, show the circle again.
document.querySelector('.menu-contents').addEventListener('mouseleave', () => {
    imagePreview.style.display = 'none';
    circleContainer.style.display = 'block';
  });

// DOT ANIMATION CODE
const dot = document.querySelector('.dot');

// Calculate center and define radius based on the 300×300 circle-container
const centerX = circleContainer.offsetWidth / 2;  // should be 150
const centerY = circleContainer.offsetHeight / 2; // should be 150
const radius = 120; // Adjust this value to match your circle image

let target = { x: centerX, y: centerY };
let current = { x: centerX, y: centerY };

document.addEventListener('mousemove', (e) => {
  // Only update if circleContainer is visible
  if (getComputedStyle(circleContainer).display === 'none') return;

  const rect = circleContainer.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const dx = mouseX - centerX;
  const dy = mouseY - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance <= radius) {
    target.x = mouseX;
    target.y = mouseY;
  } else {
    target.x = centerX;
    target.y = centerY;
  }
});

function animateDot() {
  const smoothing = 0.1; // Adjust for smoother or faster movement
  current.x += (target.x - current.x) * smoothing;
  current.y += (target.y - current.y) * smoothing;
  
  dot.style.left = `${current.x}px`;
  dot.style.top = `${current.y}px`;
  
  requestAnimationFrame(animateDot);
}
animateDot();

// Update the JavaScript in script.js
document.querySelectorAll('.menu-contents tr').forEach(row => {
    let active = false;
    let timeoutId;
    
    row.addEventListener('click', function(e) {
      // Clear any existing timeouts
      clearTimeout(timeoutId);
  
      if (this.classList.contains('active')) {
        // Second tap - navigate to page
        window.location.href = this.dataset.url;
      } else {
        // First tap - activate item
        // Remove active class from all other rows
        document.querySelectorAll('.menu-contents tr').forEach(r => {
          r.classList.remove('active');
        });
        // Add active class to clicked row
        this.classList.add('active');
        active = true;
        
        // Set timeout to remove active state after 3 seconds
        timeoutId = setTimeout(() => {
          this.classList.remove('active');
          active = false;
        }, 3000);
      }
    });
    
    // Prevent multiple activations on scroll
    row.addEventListener('touchmove', () => {
      clearTimeout(timeoutId);
      this.classList.remove('active');
      active = false;
    });
  });


  document.addEventListener("DOMContentLoaded", () => {
    // Create the circle element dynamically.
    const follower = document.createElement("div");
    document.body.appendChild(follower);
  
    // Set up styles so the circle is 10px, border-only, centered at the cursor,
    // and uses mix-blend-mode: difference.
    Object.assign(follower.style, {
      width: "20px",
      height: "20px",
      border: "1.5px solid white", // white border; difference blend will invert this.
      backgroundColor: "transparent",
      borderRadius: "50%",
      position: "fixed",
      pointerEvents: "none",
      zIndex: "9999",
      transform: "translate(-50%, -50%)", // centers the circle on the pointer.
      mixBlendMode: "difference"
    });
  
    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;
  
    // Update the target mouse coordinates.
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
  
    // Smoothly animate the follower toward the mouse.
    function animateFollower() {
      posX += (mouseX - posX) * 0.2; // adjust 0.2 for more/less delay.
      posY += (mouseY - posY) * 0.2;
      follower.style.left = `${posX}px`;
      follower.style.top = `${posY}px`;
      requestAnimationFrame(animateFollower);
    }
  
    animateFollower();
  });
  


// Portfolio hover effect - Emotes now appear in a staggered manner
document.addEventListener("DOMContentLoaded", () => {
  const portfolio = document.querySelector(".hungroove-portfolio");
  const emotes = document.querySelectorAll(".hover-image .emote");

  if (emotes.length === 0) {
      console.error("No emotes found!");
      return;
  }

  portfolio.addEventListener("mouseenter", () => {
      setTimeout(() => {  // Delay the entire animation by 1 second
          emotes.forEach((emote, index) => {
              setTimeout(() => {
                  emote.style.opacity = "1";
                  emote.style.transform = "scale(1)";

                  if (index < 4) { 
                      // Move left emotes away from center (emote5)
                      emote.style.transform = `translateX(${-(100 + index * 60)}px) scale(1)`;
                  } else if (index === 4) {
                      // Keep emote5 in center and scale it
                      emote.style.transform = "scale(1.2)";
                  } else {
                      // Move right emotes away from center (emote5)
                      emote.style.transform = `translateX(${(index - 4) * 60 + 100}px) scale(1)`;
                  }
              }, index * 150); // Stagger effect (150ms per emote)
          });
      }, 1000); // 1-second delay before the animation starts
  });

  portfolio.addEventListener("mouseleave", () => {
      emotes.forEach((emote) => {
          emote.style.opacity = "0";
          emote.style.transform = "translateX(0) scale(0)";
      });
  });
});
