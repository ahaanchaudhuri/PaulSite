# Paulo Costa - Motorcycle Adventures Website

A beautiful, responsive website showcasing Paulo Costa's motorcycle trips and adventures. Built with modern web technologies and featuring an interactive map with trip locations.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Map**: Leaflet.js powered map with star markers for trip locations
- **Smooth Scrolling**: Click on map markers to scroll to corresponding trip galleries
- **Modern UI**: Clean, professional design with smooth animations
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Trip Galleries**: Organized photo galleries for each location
- **About Section**: Personal introduction and motorcycle journey highlights

## Trip Locations

Currently featuring two sample locations:
- **Lisbon, Portugal** (38.7223, -9.1393)
- **Poconos Mountains** (41.0451, -75.3200)

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript**: Interactive functionality
- **Leaflet.js**: Interactive maps
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## File Structure

```
PaulSite/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## Getting Started

1. Clone or download the project files
2. Open `index.html` in a web browser
3. The website will load with all features working

## Customization

### Adding New Trip Locations

To add new trip locations, edit the `tripLocations` array in `script.js`:

```javascript
const tripLocations = [
    {
        name: 'Location Name',
        lat: latitude,
        lng: longitude,
        galleryId: 'gallery-id',
        description: 'Trip description'
    }
    // Add more locations here
];
```

### Adding Trip Galleries

1. Add a new gallery section in `index.html`:
```html
<div id="gallery-id" class="trip-gallery">
    <h3 class="trip-title">Location Name</h3>
    <p class="trip-description">Trip description</p>
    <div class="gallery-grid">
        <!-- Add gallery items here -->
    </div>
</div>
```

2. Replace placeholder images with actual photos by replacing the `image-placeholder` divs with `<img>` tags.

### Styling Customization

The website uses a modern color scheme that can be easily customized in `styles.css`:
- Primary Blue: `#2563eb`
- Secondary Purple: `#667eea`
- Accent Yellow: `#fbbf24`
- Dark Gray: `#1e293b`

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Features in Detail

### Interactive Map
- Star markers for each trip location
- Click markers to scroll to corresponding galleries
- Popup information with trip details
- Responsive design that works on all devices

### Smooth Animations
- Fade-in animations for content sections
- Hover effects on gallery items
- Parallax scrolling effects
- Smooth transitions throughout

### Mobile Responsive
- Hamburger navigation menu
- Responsive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## Future Enhancements

Potential features to add:
- Photo lightbox for gallery images
- Trip timeline feature
- Weather integration for trip planning
- Social media sharing
- Trip blog/journal entries
- Route planning tools

## License

This project is created for personal use. Feel free to modify and customize for your own motorcycle adventures!

---

**Created for Paulo Costa's Motorcycle Adventures** 🏍️ 