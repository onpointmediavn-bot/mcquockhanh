// ==========================================
// ==========================================
  // SCREENING ROOM (EVENT GALLERY & FILTERS)
// ==========================================
  // Filter out the requested Ban_sao_IMG images from the dao_tao_BHS album to keep only the BHS... images in the archive
  if (typeof IMAGES_DATA !== 'undefined') {
    const bhsAlbum = IMAGES_DATA.find(album => album.folderName === 'dao_tao_BHS');
    if (bhsAlbum && bhsAlbum.images) {
      bhsAlbum.images = bhsAlbum.images.filter(img => !img.includes('Ban_sao_IMG_'));
    }
  }
  const galleryGrid = document.getElementById('gallery-grid');
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const loadMoreContainer = document.getElementById('load-more-container');
  
  let currentCategory = 'all';
  let visibleCount = 8; // Number of albums to show initially
  let filteredAlbums = [];

  function initGallery() {
    if (!galleryGrid || typeof IMAGES_DATA === 'undefined') return;

    filterAlbums();
    
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category');
        visibleCount = 8;
        filterAlbums();
      });
    });

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        visibleCount += 8;
        renderGrid();
      });
    }
  }

  function filterAlbums() {
    if (currentCategory === 'all') {
      filteredAlbums = IMAGES_DATA;
    } else {
      filteredAlbums = IMAGES_DATA.filter(album => album.category === currentCategory);
    }
    renderGrid();
  }

  function renderGrid() {
    galleryGrid.innerHTML = '';
    
    const albumsToShow = filteredAlbums.slice(0, visibleCount);
    
    albumsToShow.forEach((album, index) => {
      const previewImg = (album.images && album.images.length > 0) ? album.images[0] : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200';
      const numPhotos = album.images ? album.images.length : 0;
      
      const categoryMap = {
        'corporate': 'GALA DOANH NGHIỆP',
        'cultural': 'LỄ HỘI VĂN HÓA',
        'sports': 'ĐẤU TRƯỜNG THỂ THAO',
        'weddings': 'TIỆC CƯỚI CAO CẤP',
        'others': 'HẬU TRƯỜNG & KHÁC'
      };
      const categoryVietnamese = categoryMap[album.category] || album.category.toUpperCase();

      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.setAttribute('data-index', IMAGES_DATA.indexOf(album));
      
      card.innerHTML = `
        <div class="gallery-card-img" style="background-image: url('${previewImg}')"></div>
        <div class="gallery-card-overlay">
          <div class="gallery-card-play">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <div class="gallery-card-info">
            <div class="gallery-card-category">${categoryVietnamese}</div>
            <h4 class="gallery-card-title">${album.displayName}</h4>
            <div class="gallery-card-meta">
              <span>THỂ LOẠI: ${categoryVietnamese}</span>
              <span class="gallery-card-count">${numPhotos} HÌNH ẢNH</span>
            </div>
          </div>
        </div>
      `;
      
      card.addEventListener('click', () => {
        if (typeof openLightbox === 'function') {
          openLightbox(IMAGES_DATA.indexOf(album));
        }
      });

      galleryGrid.appendChild(card);
      
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(card, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: (index % 4) * 0.1,
            ease: 'power2.out',
            clearProps: 'transform'
          }
        );
      }
    });
    
    if (loadMoreContainer) {
      if (filteredAlbums.length > visibleCount) {
        loadMoreContainer.classList.remove('hidden');
      } else {
        loadMoreContainer.classList.add('hidden');
      }
    }
  }

  // Real Estate Archive Grid Rendering
  const realEstateGrid = document.getElementById('real-estate-grid');
  
  function initRealEstateGallery() {
    if (!realEstateGrid || typeof IMAGES_DATA === 'undefined') return;
    
    // Display 'ecogarden', 'bo sung/Felia suits', 'dao_tao_BHS', and ' 𝐒𝐢𝐦𝐨𝐧𝐚 𝐇𝐞𝐢𝐠𝐡𝐭𝐬' in the specified order
    const realEstateFolders = ['ecogarden', 'bo sung/Felia suits', 'dao_tao_BHS', ' 𝐒𝐢𝐦𝐨𝐧𝐚 𝐇𝐞𝐢𝐠𝐡𝐭𝐬'];
    
    const realEstateAlbums = IMAGES_DATA.filter(album => realEstateFolders.includes(album.folderName));
    
    // Maintain the custom order specified in the array
    realEstateAlbums.sort((a, b) => realEstateFolders.indexOf(a.folderName) - realEstateFolders.indexOf(b.folderName));
    
    realEstateGrid.innerHTML = '';
    
    realEstateAlbums.forEach((album, index) => {
      let previewImg = (album.images && album.images.length > 0) ? album.images[0] : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200';
      const numPhotos = album.images ? album.images.length : 0;
      
      // Customize title and slogan
      let displayName = '';
      let tagline = '';
      let customBgPosition = '';
      
      if (album.folderName === 'ecogarden') {
        displayName = 'Sự Kiện KickOff Dự Án Eco Garden Bắc Ninh';
        tagline = '“Tinh hoa hội tụ - Khai mở sống xanh”';
      } else if (album.folderName === 'bo sung/Felia suits') {
        displayName = 'Sự Kiện Giới Thiệu Dự Án Sun Feliza Suites';
        tagline = '“Tuyệt tác không gian sống thượng lưu”';
        
        // Find and set the requested custom thumbnail image
        const customThumb = album.images.find(img => img.includes('1R9A0699 (1).JPG'));
        if (customThumb) {
          previewImg = customThumb;
        }
      } else if (album.folderName === 'dao_tao_BHS') {
        displayName = 'Đào tạo Thực chiến Parasol Premium – CaraWorld Cam Ranh';
        tagline = '“Đào tạo thực chiến chiến binh kinh doanh”';
        
        // Find and set the requested custom thumbnail image
        const customThumb = album.images.find(img => img.includes('BHS00114.jpg'));
        if (customThumb) {
          previewImg = customThumb;
        }
      } else if (album.folderName === ' 𝐒𝐢𝐦𝐨𝐧𝐚 𝐇𝐞𝐢𝐠𝐡𝐭𝐬') {
        displayName = 'Sự Kiện “Hòa Ca Phố Biển” | Giới Thiệu Dự Án Simona Heights';
        tagline = '“Hòa ca phố biển - Kiệt tác thượng lưu Quy Nhơn”';
        customBgPosition = 'background-position: left center;';
        
        // Use the first image as thumbnail or specify one
        const customThumb = album.images.find(img => img.includes('494264790'));
        if (customThumb) {
          previewImg = customThumb;
        }
      }
      
      const card = document.createElement('div');
      card.className = 'gallery-card flex-shrink-0 w-[280px] md:w-[340px] snap-start';
      card.setAttribute('data-index', IMAGES_DATA.indexOf(album));
      
      card.innerHTML = `
        <div class="gallery-card-img" style="background-image: url('${previewImg}'); ${customBgPosition}"></div>
        <div class="gallery-card-overlay">
          <div class="gallery-card-play">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <div class="gallery-card-info">
            <div class="gallery-card-category" style="font-size: 9px; font-weight: normal; color: var(--amber); letter-spacing: 0.05em; line-height: 1.3; text-transform: none; margin-bottom: 4px;">
              ${tagline}
            </div>
            <h4 class="gallery-card-title" style="margin-top: 4px; font-size: 1.1rem; line-height: 1.2;">${displayName}</h4>
            <div class="gallery-card-meta">
              <span>SỰ KIỆN</span>
              <span class="gallery-card-count">${numPhotos} HÌNH ẢNH</span>
            </div>
          </div>
        </div>
      `;
      
      card.addEventListener('click', () => {
        if (typeof openLightbox === 'function') {
          openLightbox(IMAGES_DATA.indexOf(album));
        }
      });
      
      realEstateGrid.appendChild(card);
      
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: (index % 4) * 0.1,
            ease: 'power2.out',
            clearProps: 'transform'
          }
        );
      }
    });
  }

  // Sports & Entertainment Archive Grid Rendering
  const sportsArchiveGrid = document.getElementById('sports-archive-grid');
  
  function initSportsArchiveGallery() {
    if (!sportsArchiveGrid || typeof IMAGES_DATA === 'undefined') return;
    
    // Create/inject the cloned eximbank sports album if it doesn't exist
    let eximbankSports = IMAGES_DATA.find(album => album.folderName === 'eximbank_sports');
    if (!eximbankSports) {
      eximbankSports = {
        folderName: 'eximbank_sports',
        displayName: 'Hội thao Eximbank Khu vực Miền Bắc 2025',
        category: 'sports',
        images: [
          'assets/images/eximbank/DSC_8639.jpg',
          'assets/images/eximbank/DSC_8707.jpg',
          'assets/images/eximbank/DSC_8715.jpg',
          'assets/images/eximbank/DSC_8723.jpg',
          'assets/images/eximbank/DSC_9929.jpg',
          'assets/images/eximbank/DSC_9739.jpg',
          'assets/images/eximbank/DSC_8648.jpg'
        ]
      };
      IMAGES_DATA.push(eximbankSports);
    }

    const sportsFolders = ['Golf', 'Hoa_hau_Viet_Nam_2022', 'eximbank_sports', 'Ay_Lounge'];
    
    const sportsAlbums = IMAGES_DATA.filter(album => sportsFolders.includes(album.folderName));
    
    // Sort in specified order
    sportsAlbums.sort((a, b) => sportsFolders.indexOf(a.folderName) - sportsFolders.indexOf(b.folderName));
    
    sportsArchiveGrid.innerHTML = '';
    
    sportsAlbums.forEach((album, index) => {
      let previewImg = '';
      
      let displayName = '';
      let tagline = '';
      let customBgPosition = '';
      
      if (album.folderName === 'Hoa_hau_Viet_Nam_2022') {
        displayName = 'Tour Tuyển sinh Hoa hậu Việt Nam tại các trường đại học Hà Nội';
        tagline = '“Đại sứ Nhan sắc & Bản lĩnh sinh viên”';
        
        // Filter to keep only the requested 9 images
        const requestedImages = [
          'IMG_9780_2.jpg',
          'IMG_9788.jpg',
          'VVT_0081.jpg',
          'VVT_0092.jpeg',
          'VVT_0472.jpg',
          'VVT_0513_2.jpg',
          'VVT_0545.jpeg',
          'VVT_0580.jpeg',
          'VVT_0916.jpg'
        ];
        album.images = album.images.filter(img => requestedImages.some(req => img.includes(req)));
        
        // Choose IMG_9780_2.jpg as thumbnail
        const customThumb = album.images.find(img => img.includes('IMG_9780_2.jpg'));
        if (customThumb) {
          previewImg = customThumb;
        }
      } else if (album.folderName === 'eximbank_sports') {
        displayName = 'Hội thao Eximbank "Vượt giới hạn, Chạm Vinh Quang"';
        tagline = '“Vượt giới hạn – Chạm vinh quang”';
        
        // Choose DSC_8639.jpg as thumbnail
        const customThumb = album.images.find(img => img.includes('DSC_8639.jpg'));
        if (customThumb) {
          previewImg = customThumb;
        }
      } else if (album.folderName === 'Golf') {
        displayName = 'Giải golf Vòng tay nhân ái tranh cup Gia đình Việt Nam';
        tagline = '“Dẫn dắt sân golf • Năng lượng hòa bình”';
        
        // Filter to keep only the 4 requested images
        const requestedImages = [
          '_MGL9352.jpg',
          '481158877_1182955373274902_118307908177925426_n.jpg',
          '481277035_1182955446608228_8635055377612117543_n.jpg',
          '_MGL9349.jpg'
        ];
        album.images = album.images.filter(img => requestedImages.some(req => img.includes(req)));
        
        // Choose _MGL9352.jpg as thumbnail
        const customThumb = album.images.find(img => img.includes('_MGL9352.jpg'));
        if (customThumb) {
          previewImg = customThumb;
        }
      } else if (album.folderName === 'Ay_Lounge') {
        displayName = 'Đêm nhạc kỷ niệm 10 năm Ấy Lounge';
        tagline = '“Không gian âm nhạc nghệ thuật đầy xúc cảm”';
        
        // Choose IMG_7751.jpg as thumbnail
        const customThumb = album.images.find(img => img.includes('IMG_7751.jpg'));
        if (customThumb) {
          previewImg = customThumb;
        }
      }
      
      if (!previewImg && album.images && album.images.length > 0) {
        previewImg = album.images[0];
      }
      
      const numPhotos = album.images ? album.images.length : 0;
      
      const card = document.createElement('div');
      card.className = 'gallery-card flex-shrink-0 w-[280px] md:w-[340px] snap-start';
      card.setAttribute('data-index', IMAGES_DATA.indexOf(album));
      
      card.innerHTML = `
        <div class="gallery-card-img" style="background-image: url('${previewImg}'); ${customBgPosition}"></div>
        <div class="gallery-card-overlay">
          <div class="gallery-card-play">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <div class="gallery-card-info">
            <div class="gallery-card-category" style="font-size: 9px; font-weight: normal; color: var(--amber); letter-spacing: 0.05em; line-height: 1.3; text-transform: none; margin-bottom: 4px;">
              ${tagline}
            </div>
            <h4 class="gallery-card-title" style="margin-top: 4px; font-size: 1.1rem; line-height: 1.2;">${displayName}</h4>
            <div class="gallery-card-meta">
              <span>SỰ KIỆN</span>
              <span class="gallery-card-count">${numPhotos} HÌNH ẢNH</span>
            </div>
          </div>
        </div>
      `;
      
      card.addEventListener('click', () => {
        if (typeof openLightbox === 'function') {
          openLightbox(IMAGES_DATA.indexOf(album));
        }
      });
      
      sportsArchiveGrid.appendChild(card);
      
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: (index % 4) * 0.1,
            ease: 'power2.out',
            clearProps: 'transform'
          }
        );
      }
    });
  }

  // Initialize galleries on load
  initGallery();
  initRealEstateGallery();
  initSportsArchiveGallery();
