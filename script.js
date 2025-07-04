// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Trip locations data
const tripLocations = [
    {
        name: 'Austin MotoGP 2019',
        lat: 30.2672,
        lng: -97.7431,
        galleryId: 'austin-gallery',
        description: 'MotoGP racing and Texas hill country'
    },
    {
        name: 'Finger Lakes, NY 2022',
        lat: 42.6526,
        lng: -76.7083,
        galleryId: 'finger-lakes-gallery',
        description: 'Scenic lakes and wine country adventures'
    },
    {
        name: 'Lake Erie 2023',
        lat: 42.1292,
        lng: -80.0851,
        galleryId: 'lake-erie-gallery',
        description: 'Great Lakes shoreline and coastal views'
    },
    {
        name: 'Tennessee 2023',
        lat: 35.5175,
        lng: -83.9438,
        galleryId: 'tennessee-gallery',
        description: 'Tail of the Dragon and mountain roads'
    },
    {
        name: 'Portugal 2024',
        lat: 38.7223,
        lng: -9.1393,
        galleryId: 'portugal-gallery',
        description: 'Exploring the beautiful coastal roads and historic streets of Portugal'
    },
    {
        name: 'Mount Washington 2024',
        lat: 44.2706,
        lng: -71.3033,
        galleryId: 'mount-washington-gallery',
        description: 'New Hampshire and Maine mountain adventures'
    },
    {
        name: 'West Virginia 2025',
        lat: 38.5976,
        lng: -80.4549,
        galleryId: 'west-virginia-gallery',
        description: 'Mountain roads and scenic overlooks'
    },
    {
        name: 'Upstate New York 2025',
        lat: 42.6526,
        lng: -73.7562,
        galleryId: 'upstate-ny-gallery',
        description: 'Adirondacks and Hudson Valley exploration'
    }
];

// Initialize the map
let map;
let markers = [];

function initMap() {
    // Create map centered on a point between the two locations
    map = L.map('trip-map').setView([39.5, -42.0], 4);

    // Use a free OpenStreetMap tile layer that doesn't require API key
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);

    // Add custom flame markers for each location (more macho than stars)
    tripLocations.forEach((location, index) => {
        // Create custom flame icon
        const flameIcon = L.divIcon({
            html: '<i class="fas fa-fire" style="color: #C5A46D; font-size: 28px; text-shadow: 0 0 10px rgba(197, 164, 109, 0.8); filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.8));"></i>',
            className: 'custom-flame-marker',
            iconSize: [28, 28],
            iconAnchor: [14, 14]
        });

        // Add marker to map with popup only
        const marker = L.marker([location.lat, location.lng], { icon: flameIcon })
            .addTo(map)
            .bindPopup(`
                <div style="text-align: center; padding: 15px; background: #F5F3EF; color: #1C1D20; border: 2px solid #C5A46D; border-radius: 10px; min-width: 200px;">
                    <h3 style="margin: 0 0 8px 0; color: #3C3F4A; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">${location.name}</h3>
                    <p style="margin: 0 0 15px 0; color: #7D4E2D; font-size: 14px; font-weight: 500;">${location.description}</p>
                    <button onclick="scrollToGallery('${location.galleryId}')" 
                            style="padding: 10px 20px; background: #545555; color: #F5F3EF; border: none; border-radius: 5px; cursor: pointer; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease;">
                        View Gallery
                    </button>
                </div>
            `);

        markers.push(marker);
    });

    // Fit map to show all markers
    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.1));
}

// Function to scroll to specific gallery
function scrollToGallery(galleryId) {
    const gallery = document.getElementById(galleryId);
    if (gallery) {
        gallery.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add highlight effect
        gallery.style.animation = 'highlight 2s ease-in-out';
        setTimeout(() => {
            gallery.style.animation = '';
        }, 2000);
    }
}

// Add highlight animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes highlight {
        0%, 100% { 
            box-shadow: 0 10px 30px rgba(197, 164, 109, 0.2);
            transform: scale(1);
        }
        50% { 
            box-shadow: 0 20px 40px rgba(197, 164, 109, 0.6);
            transform: scale(1.02);
        }
    }
    
    .custom-flame-marker {
        background: transparent;
        border: none;
    }
    
    .leaflet-popup-content-wrapper {
        background: #F5F3EF !important;
        border: 2px solid #C5A46D !important;
        border-radius: 10px !important;
    }
    
    .leaflet-popup-tip {
        background: #F5F3EF !important;
        border: 2px solid #C5A46D !important;
    }
`;
document.head.appendChild(style);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(60, 63, 74, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(197, 164, 109, 0.3)';
    } else {
        navbar.style.background = 'rgba(60, 63, 74, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.trip-gallery, .about-content, .hero-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure Leaflet is loaded
    setTimeout(() => {
        initMap();
    }, 100);
});

// Add loading animation for gallery items
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.animation = 'fadeInUp 0.6s ease forwards';
        item.style.opacity = '0';
    });
});

// Add fadeInUp animation
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInStyle);

// Add hover effects for gallery items
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const motorcycleIcon = document.querySelector('.motorcycle-icon');
    
    if (hero && motorcycleIcon) {
        const rate = scrolled * -0.5;
        motorcycleIcon.style.transform = `translateY(${rate}px)`;
    }
});

// Add counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target') || 0;
            const count = +counter.innerText.replace(/\D/g, '');
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc) + '+';
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + '+';
            }
        };
        updateCount();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Lightbox functionality
let currentImageIndex = 0;
let currentGalleryImages = [];

function openLightbox(imageSrc, imageAlt, galleryContainer) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    
    // Get all images from the current gallery
    const galleryItems = galleryContainer.querySelectorAll('.gallery-item img');
    currentGalleryImages = Array.from(galleryItems);
    currentImageIndex = currentGalleryImages.findIndex(img => img.src === imageSrc);
    
    // Set the image and caption
    lightboxImg.src = imageSrc;
    lightboxImg.alt = imageAlt;
    lightboxCaption.textContent = imageAlt;
    
    // Show the lightbox
    lightbox.style.display = 'flex';
    lightbox.style.alignItems = 'center';
    lightbox.style.justifyContent = 'center';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showImage(index) {
    if (index < 0) {
        index = currentGalleryImages.length - 1;
    } else if (index >= currentGalleryImages.length) {
        index = 0;
    }
    
    currentImageIndex = index;
    const img = currentGalleryImages[currentImageIndex];
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.alt;
}

function showNextImage() {
    showImage(currentImageIndex + 1);
}

function showPrevImage() {
    showImage(currentImageIndex - 1);
}

// Add click handlers to all gallery images
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            const galleryContainer = img.closest('.trip-gallery');
            openLightbox(img.src, img.alt, galleryContainer);
        });
    });
    
    // Lightbox controls
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    // Close button
    closeBtn.addEventListener('click', closeLightbox);
    
    // Navigation buttons
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
}); 