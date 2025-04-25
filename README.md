# Romantic Birthday Gift Website

A beautiful, responsive single-page website created as a special birthday gift. The website features a romantic design with soft animations, interactive elements, and a timeline of memories.

## Features

- Responsive design that works on all devices
- Soft pastel color palette
- Animated floating hearts background
- Interactive timeline of memories
- "Reasons Why I Love You" section with heart button
- Digital scrapbook/gallery
- Birthday countdown timer
- Confetti animation
- Background music toggle

## How to Customize

### 1. Images and Photos

Place your images in the following directories:
- Timeline photos: `assets/timeline/`
- Gallery photos: `assets/gallery/`
- Background music: `assets/background-music.mp3`

### 2. Timeline Section

Edit the `timelineData` array in `js/timeline.js` to add your own memories:

```javascript
const timelineData = [
    {
        date: "First Met",
        image: "assets/timeline/first-met.jpg",
        caption: "The day our story began..."
    },
    // Add more entries here
];
```

### 3. Reasons Section

Edit the `reasons` array in `js/reasons.js` to add your own reasons:

```javascript
const reasons = [
    "You always make me feel safe.",
    "Your laugh is contagious.",
    // Add more reasons here
];
```

### 4. Gallery Section

Edit the `galleryData` array in `js/gallery.js` to add your own photos:

```javascript
const galleryData = [
    {
        image: "assets/gallery/memory1.jpg",
        caption: "Our first date"
    },
    // Add more entries here
];
```

### 5. Birthday Countdown

Edit the target date in `js/birthday.js`:

```javascript
const targetDate = new Date('2024-03-15T00:00:00'); // Change this to your desired date
```

### 6. Birthday Message

Edit the `birthdayMessage` in `js/birthday.js` to add your personal message.

## Hosting

You can host this website on:
- GitHub Pages
- Vercel
- Netlify
- Any static hosting service

## Browser Compatibility

The website works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Credits

- Fonts: Google Fonts (Dancing Script, Poppins)
- Icons: Font Awesome
- Background Music: Add your own royalty-free music

## License

Feel free to use and modify this template for personal use.

## Note

Remember to replace all placeholder images and text with your own content before sharing the website. 