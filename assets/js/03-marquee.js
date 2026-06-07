// ==========================================
// ==========================================
  // PARTNERS LOGO MARQUEE (DYNAMIC POPULATE)
// ==========================================
  const marqueeContainer = document.getElementById('partners-marquee');
  if (marqueeContainer && typeof PARTNER_LOGOS !== 'undefined') {
    // Triple the logo list to guarantee a seamless wrap on wide screens
    const tripleLogos = [...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS];
    tripleLogos.forEach(logoPath => {
      const img = document.createElement('img');
      img.src = logoPath;
      img.alt = 'Partner Logo';
      marqueeContainer.appendChild(img);
    });
  }
