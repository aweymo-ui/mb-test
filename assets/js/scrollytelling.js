document.addEventListener('DOMContentLoaded', function() {
  // Only run on scrollytelling pages
  if (!document.querySelector('.scrolly-container')) return;
  
  // Get all the triggers
  const imageTriggers = document.querySelectorAll('.image-trigger');
  const citationTriggers = document.querySelectorAll('.citation-trigger');
  
  // Get containers
  const imageContainer = document.querySelector('.image-container');
  const citationContainer = document.querySelector('.citation-container');
  const imageCitationContainer = document.querySelector('.image-citation-container');
  
  // Track active elements
  let activeImage = null;
  let activeCitation = null;
  let activeImageCitation = null;
  
  // Function to check if an element is in the center of the viewport
  function isInCenter(element) {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = viewportHeight / 2;
    
    // Check if element center is within 100px of viewport center
    return Math.abs(elementCenter - viewportCenter) < 100;
  }
  
  // Function to handle scroll events
  function handleScroll() {
    // Check image triggers
    imageTriggers.forEach(trigger => {
      const imageId = trigger.dataset.imageId;
      const image = document.getElementById(`image-${imageId}`);
      const imageCitation = document.getElementById(`image-citation-${imageId}`);
      
      if (isInCenter(trigger)) {
        if (activeImage && activeImage !== image) {
          activeImage.classList.remove('active');
        }
        if (activeImageCitation && activeImageCitation !== imageCitation) {
          activeImageCitation.classList.remove('active');
        }
        
        image.classList.add('active');
        if (imageCitation) {
          imageCitation.classList.add('active');
        }
        
        activeImage = image;
        activeImageCitation = imageCitation;
      }
    });
    
    // Check citation triggers
    citationTriggers.forEach(trigger => {
      const citationId = trigger.dataset.citationId;
      const citation = document.getElementById(`citation-${citationId}`);
      
      if (isInCenter(trigger)) {
        if (activeCitation && activeCitation !== citation) {
          activeCitation.classList.remove('active');
        }
        
        citation.classList.add('active');
        activeCitation = citation;
      }
    });
  }
  
  // Initial setup
  function setup() {
    // Process image triggers
    imageTriggers.forEach(trigger => {
      const imageId = trigger.dataset.imageId;
      const imageSrc = trigger.dataset.imageSrc;
      const imageAlt = trigger.dataset.imageAlt;
      const imageLink = trigger.dataset.imageLink;
      const zoom = trigger.dataset.zoom || 1;
      const coordinates = trigger.dataset.coordinates || '0,0';
      
      // Create image element
      const image = document.createElement('img');
      image.id = `image-${imageId}`;
      image.src = imageSrc;
      image.alt = imageAlt;
      image.style.transform = `scale(${zoom})`;
      image.style.transformOrigin = coordinates;
      
      // Make image clickable
      if (imageLink) {
        image.addEventListener('click', function() {
          window.location.href = imageLink;
        });
      }
      
      imageContainer.appendChild(image);
      
      // Create image citation if available
      const imageCitationText = trigger.dataset.imageCitation;
      if (imageCitationText) {
        const imageCitation = document.createElement('div');
        imageCitation.id = `image-citation-${imageId}`;
        imageCitation.className = 'image-citation';
        imageCitation.innerHTML = imageCitationText;
        
        imageCitationContainer.appendChild(imageCitation);
      }
    });
    
    // Process citation triggers
    citationTriggers.forEach(trigger => {
      const citationId = trigger.dataset.citationId;
      const citationText = trigger.dataset.citationText;
      
      // Create citation element
      const citation = document.createElement('div');
      citation.id = `citation-${citationId}`;
      citation.className = 'citation';
      citation.innerHTML = citationText;
      
      citationContainer.appendChild(citation);
    });
    
    // Initial check
    handleScroll();
  }
  
  // Set up and add scroll listener
  setup();
  window.addEventListener('scroll', handleScroll);
  
  // Handle full image layout
  if (document.querySelector('.scrolly-full')) {
    const fullImageContainer = document.querySelector('.full-image-container');
    const image = fullImageContainer.querySelector('img');
    const imageCitation = fullImageContainer.querySelector('.image-citation');
    
    // Create a parallax effect for the full image
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallax = image.offsetTop - (scrolled * 0.5);
      
      image.style.transform = `translateY(${parallax}px)`;
      imageCitation.style.transform = `translateY(${parallax}px)`;
    });
  }
});