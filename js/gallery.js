/* ============================================
   JUMABEEL CREATIONS — Gallery Filter JS
   gallery.js
   Used on: crochet.html, henna.html, resin.html
============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Filter Tabs Logic ----
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card[data-category]');
  const emptyState = document.querySelector('.gallery-empty');

  if (filterTabs.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {

        // Update active tab
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');
        let visibleCount = 0;

        productCards.forEach(card => {
          const category = card.getAttribute('data-category');

          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            visibleCount++;

            // Re-trigger animation
            card.style.animation = 'none';
            card.offsetHeight; // reflow
            card.style.animation = '';
          } else {
            card.classList.add('hidden');
          }
        });

        // Show empty state if no results
        if (emptyState) {
          emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
      });
    });
  }

  // ---- Lightbox / Image Expand (simple) ----
  // Clicking a product image shows it larger in an overlay
  const overlay = document.createElement('div');
  overlay.id = 'img-overlay';
  overlay.style.cssText = `
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.88);
    z-index: 9999;
    align-items: center;
    justify-content: center;
    cursor: zoom-out;
    backdrop-filter: blur(6px);
  `;

  const overlayImg = document.createElement('img');
  overlayImg.style.cssText = `
    max-width: 90vw;
    max-height: 88vh;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.6);
    animation: scaleIn 0.25s ease;
    object-fit: contain;
  `;

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.cssText = `
    position: absolute;
    top: 20px;
    right: 28px;
    background: none;
    border: none;
    color: white;
    font-size: 2.5rem;
    cursor: pointer;
    line-height: 1;
    opacity: 0.8;
    transition: opacity 0.2s;
  `;
  closeBtn.onmouseover = () => closeBtn.style.opacity = '1';
  closeBtn.onmouseout  = () => closeBtn.style.opacity = '0.8';

  overlay.appendChild(overlayImg);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  // Open lightbox on product image click
  document.querySelectorAll('.product-img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      overlayImg.src = img.src;
      overlayImg.alt = img.alt;
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox
  function closeLightbox() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });

  closeBtn.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

});

/* ============================================
   PRODUCT CARD LIGHTBOX
   For crochet, henna, resin pages
   Clicking a product card image opens a full-screen view
============================================ */
document.addEventListener('DOMContentLoaded', () => {

  // Build lightbox overlay
  const lb = document.createElement('div');
  lb.id = 'product-lightbox';
  lb.style.cssText = `
    display:none; position:fixed; inset:0; z-index:9999;
    background:rgba(0,0,0,0.92); backdrop-filter:blur(8px);
    align-items:center; justify-content:center; flex-direction:column;
    padding:2rem; cursor:zoom-out;
  `;

  const lbImg = document.createElement('img');
  lbImg.style.cssText = `
    max-width:90vw; max-height:78vh; border-radius:16px;
    box-shadow:0 20px 60px rgba(0,0,0,0.7);
    object-fit:contain; animation:scaleIn 0.25s ease;
  `;

  const lbTitle = document.createElement('div');
  lbTitle.style.cssText = `
    color:white; font-family:'Poppins',sans-serif; font-size:1.1rem;
    font-weight:600; margin-top:1.2rem; text-align:center;
  `;

  const lbPrice = document.createElement('div');
  lbPrice.style.cssText = `
    color:#F07020; font-size:1.3rem; font-weight:700;
    font-family:'Playfair Display',serif; margin-top:0.3rem;
  `;

  const lbClose = document.createElement('button');
  lbClose.innerHTML = '&times;';
  lbClose.style.cssText = `
    position:absolute; top:20px; right:28px; background:none;
    border:none; color:white; font-size:2.8rem; cursor:pointer;
    line-height:1; opacity:0.8; transition:opacity 0.2s;
  `;
  lbClose.onmouseover = () => lbClose.style.opacity = '1';
  lbClose.onmouseout  = () => lbClose.style.opacity = '0.8';

  lb.appendChild(lbClose);
  lb.appendChild(lbImg);
  lb.appendChild(lbTitle);
  lb.appendChild(lbPrice);
  document.body.appendChild(lb);

  function openLightbox(imgSrc, title, price, isPlaceholder) {
    if (isPlaceholder) return; // don't open for emoji placeholders
    lbImg.src = imgSrc;
    lbTitle.textContent = title;
    lbPrice.textContent = price;
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.style.display = 'none';
    document.body.style.overflow = '';
  }

  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  lbClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // Attach click to all product cards
  document.querySelectorAll('.product-card').forEach(card => {
    const img = card.querySelector('.product-img');
    const placeholder = card.querySelector('.product-img-placeholder');
    const title = card.querySelector('h3')?.textContent || '';
    const price = card.querySelector('.product-price')?.childNodes[0]?.textContent?.trim() || '';

    if (img) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => openLightbox(img.src, title, price, false));
    }

    // Make placeholder also show a "no image yet" message on click
    if (placeholder) {
      placeholder.style.cursor = 'pointer';
      placeholder.addEventListener('click', () => {
        // Just highlight card briefly — no lightbox for placeholders
        card.style.outline = '3px solid #F07020';
        setTimeout(() => card.style.outline = '', 800);
      });
    }
  });

});