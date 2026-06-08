/* --- START OF FILE: 00-opening.js --- */
document.addEventListener('DOMContentLoaded', () => {

/* --- END OF FILE: 00-opening.js --- */

/* --- START OF FILE: 01-smooth-scroll.js --- */
// ==========================================
// ==========================================
  // 1. INITIALIZE LENIS SMOOTH SCROLL
// ==========================================
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // Sync ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);
  
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  
  gsap.ticker.lagSmoothing(0);

/* --- END OF FILE: 01-smooth-scroll.js --- */

/* --- START OF FILE: 02-projector.js --- */
// ==========================================
// ==========================================
  // 2. PROJECTOR LIGHT TRACKER
// ==========================================
  const projectorGlow = document.querySelector('.projector-glow');
  window.addEventListener('mousemove', (e) => {
    const xPercent = (e.clientX / window.innerWidth) * 100;
    const yPercent = (e.clientY / window.innerHeight) * 100;
    
    // Smooth pointer tracking using GSAP
    gsap.to(projectorGlow, {
      duration: 0.8,
      '--mouse-x': `${xPercent}%`,
      '--mouse-y': `${yPercent}%`,
      ease: 'power2.out'
    });
  });

/* --- END OF FILE: 02-projector.js --- */

/* --- START OF FILE: 02.5-images_data.js --- */
// Auto-generated file containing image resources from local directory
const SHOWREEL_URL = "https://www.youtube.com/embed/coYw-Nirh_U?autoplay=1&mute=0";

const IMAGES_DATA = [
  {
    "folderName": "KickOff_GD_2_Daimond_Paragon_BG",
    "displayName": "Kickoff Gd 2 Daimond Paragon Bg",
    "category": "corporate",
    "images": [
      "assets/images/KickOff_GD_2_Daimond_Paragon_BG/Ban_sao_Kickoff_Diamond_Paragon-08983.jpg",
      "assets/images/KickOff_GD_2_Daimond_Paragon_BG/Ban_sao_Kickoff_Diamond_Paragon-09059.jpg",
      "assets/images/KickOff_GD_2_Daimond_Paragon_BG/Ban_sao_Kickoff_Diamond_Paragon-09233.jpg",
      "assets/images/KickOff_GD_2_Daimond_Paragon_BG/Ban_sao_Kickoff_Diamond_Paragon-09262.jpg",
      "assets/images/KickOff_GD_2_Daimond_Paragon_BG/Kickoff_Diamond_Paragon-08991.jpg",
      "assets/images/KickOff_GD_2_Daimond_Paragon_BG/Kickoff_Diamond_Paragon-09183.jpg",
      "assets/images/KickOff_GD_2_Daimond_Paragon_BG/Kickoff_Diamond_Paragon-09288.jpg",
      "assets/images/KickOff_GD_2_Daimond_Paragon_BG/Kickoff_Diamond_Paragon-09362.jpg"
    ]
  },
  {
    "folderName": "Golf",
    "displayName": "Golf",
    "category": "sports",
    "images": [
      "assets/images/Golf/481158877_1182955373274902_118307908177925426_n.jpg",
      "assets/images/Golf/481277035_1182955446608228_8635055377612117543_n.jpg",
      "assets/images/Golf/_MGL9331.jpeg",
      "assets/images/Golf/_MGL9338.jpg",
      "assets/images/Golf/_MGL9349.jpg",
      "assets/images/Golf/_MGL9352.jpg",
      "assets/images/Golf/_MGL9353.jpeg",
      "assets/images/Golf/_MGL9354.jpeg"
    ]
  },
  {
    "folderName": " 𝐒𝐢𝐦𝐨𝐧𝐚 𝐇𝐞𝐢𝐠𝐡𝐭𝐬",
    "displayName": "𝐒𝐢𝐦𝐨𝐧𝐚 𝐇𝐞𝐢𝐠𝐡𝐭𝐬",
    "category": "others",
    "images": [
      "assets/images/ 𝐒𝐢𝐦𝐨𝐧𝐚 𝐇𝐞𝐢𝐠𝐡𝐭𝐬/494049066_1225201112383661_3632762217730638423_n.jpg",
      "assets/images/ 𝐒𝐢𝐦𝐨𝐧𝐚 𝐇𝐞𝐢𝐠𝐡𝐭𝐬/494264790_1225201099050329_7930934990531146167_n.jpg"
    ]
  },
  {
    "folderName": "JCI_HANOI",
    "displayName": "Jci Hanoi",
    "category": "others",
    "images": [
      "assets/images/JCI_HANOI/BBE03542-2.jpg",
      "assets/images/JCI_HANOI/IMG_6256.jpg",
      "assets/images/JCI_HANOI/NHAN5772.jpg",
      "assets/images/JCI_HANOI/NHAN5799.jpg",
      "assets/images/JCI_HANOI/NHAN6564.jpg",
      "assets/images/JCI_HANOI/NHAN6861_2.jpg"
    ]
  },
  {
    "folderName": "alluvia",
    "displayName": "Alluvia",
    "category": "others",
    "images": [
      "assets/images/alluvia/Ban_sao_DSC_4640.jpg",
      "assets/images/alluvia/Ban_sao_DSC_4706.jpg",
      "assets/images/alluvia/Ban_sao_DSC_4845.jpg",
      "assets/images/alluvia/Ban_sao_DSC_4890.jpg",
      "assets/images/alluvia/Ban_sao_DSC_4891.jpg",
      "assets/images/alluvia/DSC_4761.jpg",
      "assets/images/alluvia/DSC_4849.jpg",
      "assets/images/alluvia/DSC_4887.jpg"
    ]
  },
  {
    "folderName": "DIC_Victory_Can_Tho",
    "displayName": "Dic Victory Can Tho",
    "category": "others",
    "images": [
      "assets/images/DIC_Victory_Can_Tho/MGH00598.jpg",
      "assets/images/DIC_Victory_Can_Tho/MGH00776.jpg",
      "assets/images/DIC_Victory_Can_Tho/MGH00777.jpg",
      "assets/images/DIC_Victory_Can_Tho/MGH00891.jpg",
      "assets/images/DIC_Victory_Can_Tho/MGH00959.jpg",
      "assets/images/DIC_Victory_Can_Tho/MGH01022.jpg",
      "assets/images/DIC_Victory_Can_Tho/MGH01068.jpg",
      "assets/images/DIC_Victory_Can_Tho/MGH01075.jpg"
    ]
  },
  {
    "folderName": "kickoff_phu_gia",
    "displayName": "Kickoff Phu Gia",
    "category": "corporate",
    "images": [
      "assets/images/kickoff_phu_gia/NTCS0001_(136_of_604).jpg",
      "assets/images/kickoff_phu_gia/NTCS0001_(203_of_604).jpg",
      "assets/images/kickoff_phu_gia/NTCS0001_(382_of_604).jpg",
      "assets/images/kickoff_phu_gia/NTCS0001_(419_of_604).jpg",
      "assets/images/kickoff_phu_gia/NTCS0001_(430_of_604).jpg",
      "assets/images/kickoff_phu_gia/NTCS0001_(437_of_604).jpg",
      "assets/images/kickoff_phu_gia/NTCS0001_(472_of_604).jpg"
    ]
  },
  {
    "folderName": "eximbank",
    "displayName": "Eximbank",
    "category": "others",
    "images": [
      "assets/images/eximbank/DSC_8631.jpg",
      "assets/images/eximbank/DSC_8634.jpg",
      "assets/images/eximbank/DSC_8638.jpg",
      "assets/images/eximbank/DSC_8639.jpg",
      "assets/images/eximbank/DSC_8648.jpg",
      "assets/images/eximbank/DSC_8665.jpg",
      "assets/images/eximbank/DSC_8707.jpg",
      "assets/images/eximbank/DSC_8715.jpg",
      "assets/images/eximbank/DSC_8715_(1).jpg",
      "assets/images/eximbank/DSC_8723.jpg",
      "assets/images/eximbank/DSC_8928.jpg",
      "assets/images/eximbank/DSC_9739.jpg",
      "assets/images/eximbank/DSC_9762.jpg",
      "assets/images/eximbank/DSC_9929.jpg"
    ]
  },
  {
    "folderName": "VAGO",
    "displayName": "Vago",
    "category": "others",
    "images": [
      "assets/images/VAGO/532327878_1251247913684258_17043892267958463_n.jpg",
      "assets/images/VAGO/535034659_1251248120350904_3375414392724952023_n.jpg",
      "assets/images/VAGO/536267782_1251247903684259_6484793863645343754_n.jpg",
      "assets/images/VAGO/HPM01292.jpg",
      "assets/images/VAGO/HPM01295.jpg",
      "assets/images/VAGO/HPM01305.jpg",
      "assets/images/VAGO/HPM01311.jpg",
      "assets/images/VAGO/HPM01313.jpg"
    ]
  },
  {
    "folderName": "giao_luu_van_hoa_Viet_Nhat",
    "displayName": "Giao Luu Van Hoa Viet Nhat",
    "category": "cultural",
    "images": [
      "assets/images/giao_luu_van_hoa_Viet_Nhat/LINH3014.jpg",
      "assets/images/giao_luu_van_hoa_Viet_Nhat/LINH3102.jpg",
      "assets/images/giao_luu_van_hoa_Viet_Nhat/LINH3109.jpg",
      "assets/images/giao_luu_van_hoa_Viet_Nhat/LINH3261.jpg",
      "assets/images/giao_luu_van_hoa_Viet_Nhat/LINH3264.jpg",
      "assets/images/giao_luu_van_hoa_Viet_Nhat/MEOW1461.jpg",
      "assets/images/giao_luu_van_hoa_Viet_Nhat/_DSC9093.jpg",
      "assets/images/giao_luu_van_hoa_Viet_Nhat/_DSC9239.jpg",
      "assets/images/giao_luu_van_hoa_Viet_Nhat/_DSC9254.jpg"
    ]
  },
  {
    "folderName": "Hoi_lang",
    "displayName": "Hoi Lang",
    "category": "others",
    "images": [
      "assets/images/Hoi_lang/IMG_8705.jpg",
      "assets/images/Hoi_lang/IMG_8707.jpg",
      "assets/images/Hoi_lang/IMG_8708.jpg",
      "assets/images/Hoi_lang/IMG_8710.jpg",
      "assets/images/Hoi_lang/IMG_8727.jpg",
      "assets/images/Hoi_lang/IMG_8743.jpg",
      "assets/images/Hoi_lang/IMG_8744.jpg",
      "assets/images/Hoi_lang/anh_toan.jpeg"
    ]
  },
  {
    "folderName": "Press Cup 2025",
    "displayName": "Press Cup 2025",
    "category": "others",
    "images": [
      "assets/images/Press Cup 2025/498733583_1240657557504683_619734786750634430_n.jpg",
      "assets/images/Press Cup 2025/499153925_1240657560838016_4082801394901757391_n.jpg",
      "assets/images/Press Cup 2025/499186803_1240657617504677_778117871055436173_n.jpg",
      "assets/images/Press Cup 2025/499228437_1240657497504689_4447720040074965892_n.jpg",
      "assets/images/Press Cup 2025/499577488_1240657667504672_8636426153663741308_n.jpg",
      "assets/images/Press Cup 2025/499752892_1240657590838013_3736113795354039419_n.jpg"
    ]
  },
  {
    "folderName": "Ay_Lounge",
    "displayName": "Ay Lounge",
    "category": "others",
    "images": [
      "assets/images/Ay_Lounge/290397829_5203316596411969_4314753202550025142_n.JPEG",
      "assets/images/Ay_Lounge/291099401_5203320456411583_2540015361042299358_n.JPEG",
      "assets/images/Ay_Lounge/291442366_5203316949745267_9110523114295119319_n.JPEG",
      "assets/images/Ay_Lounge/IMG_7751.jpg"
    ]
  },
  {
    "folderName": "Anh_Sun_Festo_Town",
    "displayName": "Anh Sun Festo Town",
    "category": "others",
    "images": [
      "assets/images/Anh_Sun_Festo_Town/QT_0153.jpg",
      "assets/images/Anh_Sun_Festo_Town/QT_0171.jpg",
      "assets/images/Anh_Sun_Festo_Town/QT_0259.jpg",
      "assets/images/Anh_Sun_Festo_Town/QT_0360.jpg",
      "assets/images/Anh_Sun_Festo_Town/QT_0474.jpg",
      "assets/images/Anh_Sun_Festo_Town/QT_0490.jpg",
      "assets/images/Anh_Sun_Festo_Town/QT_0514.jpg"
    ]
  },
  {
    "folderName": "anh_heiwa_peace_Tay_Ho_2023",
    "displayName": "Anh Heiwa Peace Tay Ho 2023",
    "category": "others",
    "images": [
      "assets/images/anh_heiwa_peace_Tay_Ho_2023/MEOW1461.jpg"
    ]
  },
  {
    "folderName": "mc_truyen_hinh",
    "displayName": "Mc Truyen Hinh",
    "category": "others",
    "images": [
      "assets/images/mc_truyen_hinh/IMG_0269.jpg",
      "assets/images/mc_truyen_hinh/IMG_1501.PNG",
      "assets/images/mc_truyen_hinh/IMG_4782.jpg",
      "assets/images/mc_truyen_hinh/IMG_6242.jpg",
      "assets/images/mc_truyen_hinh/IMG_8429.jpg"
    ]
  },
  {
    "folderName": "VUG",
    "displayName": "Vug",
    "category": "others",
    "images": [
      "assets/images/VUG/481249051_1183393616564411_8490100841142159310_n.jpg",
      "assets/images/VUG/IMG_0200.jpg",
      "assets/images/VUG/TRG00566.jpg",
      "assets/images/VUG/TRG00618.jpg",
      "assets/images/VUG/TRG00817.jpg",
      "assets/images/VUG/TRG09944.jpg"
    ]
  },
  {
    "folderName": "ecogarden",
    "displayName": "Ecogarden",
    "category": "others",
    "images": [
      "assets/images/ecogarden/DRE05589.jpg",
      "assets/images/ecogarden/DRE05591.jpg",
      "assets/images/ecogarden/DRE05595.jpg",
      "assets/images/ecogarden/DRE05752.jpg",
      "assets/images/ecogarden/DRE05782.jpg",
      "assets/images/ecogarden/DRE05787.jpg",
      "assets/images/ecogarden/DRE05811.jpg",
      "assets/images/ecogarden/Su_Kien_Kickoff_Eco_Garden-44.jpg",
      "assets/images/ecogarden/Su_Kien_Kickoff_Eco_Garden-90.jpg"
    ]
  },
  {
    "folderName": "Glory_Sol_1125",
    "displayName": "Glory Sol 1125",
    "category": "others",
    "images": [
      "assets/images/Glory_Sol_1125/H2O_4196.jpg",
      "assets/images/Glory_Sol_1125/H2O_4237.jpg",
      "assets/images/Glory_Sol_1125/H2O_4270.jpg",
      "assets/images/Glory_Sol_1125/H2O_4501.jpg",
      "assets/images/Glory_Sol_1125/IMG_6837.jpg",
      "assets/images/Glory_Sol_1125/IMG_6937.jpg"
    ]
  },
  {
    "folderName": "dao_tao_BHS",
    "displayName": "Dao Tao Bhs",
    "category": "others",
    "images": [
      "assets/images/dao_tao_BHS/BHS00104.jpg",
      "assets/images/dao_tao_BHS/BHS00105.jpg",
      "assets/images/dao_tao_BHS/BHS00114.jpg",
      "assets/images/dao_tao_BHS/BHS00116.jpg",
      "assets/images/dao_tao_BHS/BHS00119.jpg",
      "assets/images/dao_tao_BHS/BHS00120.jpg",
      "assets/images/dao_tao_BHS/BHS00121.jpg",
      "assets/images/dao_tao_BHS/Ban_sao_IMG_1302.jpg",
      "assets/images/dao_tao_BHS/Ban_sao_IMG_1303.jpg",
      "assets/images/dao_tao_BHS/Ban_sao_IMG_1304.jpg",
      "assets/images/dao_tao_BHS/Ban_sao_IMG_1305.jpg",
      "assets/images/dao_tao_BHS/Ban_sao_IMG_1324.jpg",
      "assets/images/dao_tao_BHS/Ban_sao_IMG_1325.jpg"
    ]
  },
  {
    "folderName": "Hoa_hau_Viet_Nam_2022",
    "displayName": "Hoa Hau Viet Nam 2022",
    "category": "others",
    "images": [
      "assets/images/Hoa_hau_Viet_Nam_2022/307017905_637329037837541_6014113850508808760_n.jpg",
      "assets/images/Hoa_hau_Viet_Nam_2022/474079517_1156224735947966_1502395780282481117_n.jpg",
      "assets/images/Hoa_hau_Viet_Nam_2022/HAN_1463.jpg",
      "assets/images/Hoa_hau_Viet_Nam_2022/HAN_1555_3.jpg",
      "assets/images/Hoa_hau_Viet_Nam_2022/HAN_2245.jpg",
      "assets/images/Hoa_hau_Viet_Nam_2022/HAN_2249.jpg",
      "assets/images/Hoa_hau_Viet_Nam_2022/HAN_2322.jpg",
      "assets/images/Hoa_hau_Viet_Nam_2022/IMG_9780_2.jpg",
      "assets/images/Hoa_hau_Viet_Nam_2022/IMG_9788.jpg",
      "assets/images/Hoa_hau_Viet_Nam_2022/IMG_9848_3.jpg",
      "assets/images/Hoa_hau_Viet_Nam_2022/VVT_0081.jpg",
      "assets/images/Hoa_hau_Viet_Nam_2022/VVT_0092.jpeg",
      "assets/images/Hoa_hau_Viet_Nam_2022/VVT_0472.jpg",
      "assets/images/Hoa_hau_Viet_Nam_2022/VVT_0513_2.jpg",
      "assets/images/Hoa_hau_Viet_Nam_2022/VVT_0545.jpeg",
      "assets/images/Hoa_hau_Viet_Nam_2022/VVT_0580.jpeg",
      "assets/images/Hoa_hau_Viet_Nam_2022/VVT_0916.jpg"
    ]
  },
  {
    "folderName": "Giai_bong_ro",
    "displayName": "Giai Bong Ro",
    "category": "sports",
    "images": [
      "assets/images/Giai_bong_ro/IMG_3648.jpg",
      "assets/images/Giai_bong_ro/IMG_5810.jpg",
      "assets/images/Giai_bong_ro/IMG_8775.jpg",
      "assets/images/Giai_bong_ro/_DSC0560.jpg",
      "assets/images/Giai_bong_ro/_DSC0575.jpg"
    ]
  },
  {
    "folderName": "kY_UNG_HAO_HUNMG",
    "displayName": "Ky Ung Hao Hunmg",
    "category": "others",
    "images": [
      "assets/images/kY_UNG_HAO_HUNMG/IMG_3379.jpg",
      "assets/images/kY_UNG_HAO_HUNMG/IMG_3380.jpg",
      "assets/images/kY_UNG_HAO_HUNMG/IMG_3381.jpg",
      "assets/images/kY_UNG_HAO_HUNMG/IMG_3382.jpg",
      "assets/images/kY_UNG_HAO_HUNMG/IMG_3457.jpg",
      "assets/images/kY_UNG_HAO_HUNMG/IMG_3471.jpg",
      "assets/images/kY_UNG_HAO_HUNMG/IMG_3472.jpg"
    ]
  }
];

const PORTRAIT_IMAGES = [
  "assets/images/chan_dung/IMG_5586_2.jpg",
  "assets/images/chan_dung/IMG_5670.jpg",
  "assets/images/chan_dung/IMG_5671.jpg",
  "assets/images/chan_dung/IMG_5688.jpg"
];

const PARTNER_LOGOS = [
  "assets/images/don_vi_tung_cong_tac/298666733_525335772725677_801369374600470638_n.png",
  "assets/images/don_vi_tung_cong_tac/5972522_vieclam24h_1589513044.png",
  "assets/images/don_vi_tung_cong_tac/DOHA LAND.png",
  "assets/images/don_vi_tung_cong_tac/HPA_LOGO.png",
  "assets/images/don_vi_tung_cong_tac/IMG_MYDXNM578B7N3MMY.png",
  "assets/images/don_vi_tung_cong_tac/Logo-GOSUNGOLD.png",
  "assets/images/don_vi_tung_cong_tac/Logo-Hai-Phong-khong-tagline.png",
  "assets/images/don_vi_tung_cong_tac/Logo-Tong-Cong-Ty-Cp-Dau-Tu-Phat-Trien-Xay-Dung-DIC.webp",
  "assets/images/don_vi_tung_cong_tac/Logo_Petrovietnam.svg.png",
  "assets/images/don_vi_tung_cong_tac/Miss_Vietnam_-_Logo.png",
  "assets/images/don_vi_tung_cong_tac/Remove-bg.ai_1705285184903.png",
  "assets/images/don_vi_tung_cong_tac/Sun-group-logo.png",
  "assets/images/don_vi_tung_cong_tac/TÂN LONG LAND.png",
  "assets/images/don_vi_tung_cong_tac/VRA-Logo.jpg",
  "assets/images/don_vi_tung_cong_tac/VTC.png",
  "assets/images/don_vi_tung_cong_tac/VTC_News_logo.svg.png",
  "assets/images/don_vi_tung_cong_tac/VTV.svg.png",
  "assets/images/don_vi_tung_cong_tac/anh-giao-dien-evnnpc.jpg",
  "assets/images/don_vi_tung_cong_tac/antuongdulich.png",
  "assets/images/don_vi_tung_cong_tac/bb30acbfa9cfbc26964e88b65dc679b9.png",
  "assets/images/don_vi_tung_cong_tac/channels4_profile.jpg",
  "assets/images/don_vi_tung_cong_tac/flamingo.png",
  "assets/images/don_vi_tung_cong_tac/images được xóa nền.png",
  "assets/images/don_vi_tung_cong_tac/images_(1).png",
  "assets/images/don_vi_tung_cong_tac/images_(2).png",
  "assets/images/don_vi_tung_cong_tac/jw-marriott-logo-freelogovectors.net_.png",
  "assets/images/don_vi_tung_cong_tac/logo-alluvia-city.png",
  "assets/images/don_vi_tung_cong_tac/logo-baoson-group.png",
  "assets/images/don_vi_tung_cong_tac/logo-eximbank.png",
  "assets/images/don_vi_tung_cong_tac/logo-footer.png",
  "assets/images/don_vi_tung_cong_tac/logo-intech-group.png",
  "assets/images/don_vi_tung_cong_tac/logo-sun-feliza-suites.png",
  "assets/images/don_vi_tung_cong_tac/logo-tlc_516d1c9b8b7548cd8d074527ac3ef60a.png",
  "assets/images/don_vi_tung_cong_tac/logo_web.jpg",
  "assets/images/don_vi_tung_cong_tac/long_bien_logo_(2).png",
  "assets/images/don_vi_tung_cong_tac/t_bao_to_quoc(2).png",
  "assets/images/don_vi_tung_cong_tac/vago.png",
  "assets/images/don_vi_tung_cong_tac/viettime.png"
];

/* --- END OF FILE: 02.5-images_data.js --- */

/* --- START OF FILE: 03-marquee.js --- */
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

/* --- END OF FILE: 03-marquee.js --- */

/* --- START OF FILE: 04-gallery.js --- */
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

/* --- END OF FILE: 04-gallery.js --- */

/* --- START OF FILE: 05-lightbox.js --- */
// ==========================================
// ==========================================
  // CINEMATIC GALLERY LIGHTBOX MODAL
// ==========================================
  const galleryModal = document.getElementById('galleryModal');
  const closeGalleryModalBtn = document.getElementById('closeGalleryModal');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');
  const lightboxMainImg = document.getElementById('lightbox-main-img');
  const lightboxMainVideo = document.getElementById('lightbox-main-video');
  const lightboxAlbumCategory = document.getElementById('lightbox-album-category');
  const lightboxAlbumTitle = document.getElementById('lightbox-album-title');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxFilmstrip = document.getElementById('lightbox-filmstrip');
  const lightboxSlideshowBtn = document.getElementById('lightbox-slideshow-btn');
  const lightboxPlayIcon = document.getElementById('lightbox-play-icon');
  const lightboxSlideshowText = document.getElementById('lightbox-slideshow-text');

  let activeAlbumIndex = -1;
  let activeImageIndex = -1;
  let slideshowInterval = null;
  let isSlideshowPlaying = false;

  let activeImagesList = [];

  // Expose data to global window object so inline showcase section scripts can access them
  if (typeof IMAGES_DATA !== 'undefined') {
    window.IMAGES_DATA = IMAGES_DATA;
  }
  if (typeof PORTRAIT_IMAGES !== 'undefined') {
    window.PORTRAIT_IMAGES = PORTRAIT_IMAGES;
  }
  if (typeof PARTNER_LOGOS !== 'undefined') {
    window.PARTNER_LOGOS = PARTNER_LOGOS;
  }

  window.openLightbox = function(albumIndex, startImageIndex = 0, customImagesList = null) {
    if (typeof IMAGES_DATA === 'undefined' || !galleryModal) return;
    
    activeAlbumIndex = albumIndex;
    activeImageIndex = startImageIndex;
    
    const album = activeAlbumIndex !== -1 ? IMAGES_DATA[activeAlbumIndex] : null;

    // Use custom list if provided (e.g. only images rendered on the web page)
    activeImagesList = customImagesList || (album ? album.images : []);
    if (!activeImagesList || activeImagesList.length === 0) return;
    
    // Show modal & stop page scroll
    galleryModal.classList.remove('hidden');
    if (typeof lenis !== 'undefined') lenis.stop();

    // Populate album metadata
    if (album) {
      const categoryMap = {
        'corporate': 'GALA DOANH NGHIỆP',
        'cultural': 'LỄ HỘI VĂN HÓA',
        'sports': 'ĐẤU TRƯỜNG THỂ THAO',
        'weddings': 'TIỆC CƯỚI CAO CẤP',
        'others': 'HẬU TRƯỜNG & KHÁC'
      };
      lightboxAlbumCategory.textContent = categoryMap[album.category] || album.category;
      lightboxAlbumTitle.textContent = album.displayName;
    } else {
      lightboxAlbumCategory.textContent = 'HỒ SƠ HÌNH ẢNH';
      lightboxAlbumTitle.textContent = 'CHÂN DUNG & HẬU TRƯỜNG';
    }

    // Generate filmstrip thumbnails
    lightboxFilmstrip.innerHTML = '';
    activeImagesList.forEach((imgSrc, idx) => {
      const isVideo = imgSrc.endsWith('.mp4') || imgSrc.endsWith('.mov') || imgSrc.endsWith('.webm');
      let thumb;
      if (isVideo) {
        thumb = document.createElement('video');
        thumb.src = imgSrc;
        thumb.preload = 'metadata';
        thumb.muted = true;
        thumb.playsInline = true;
      } else {
        thumb = document.createElement('img');
        thumb.src = imgSrc;
      }
      thumb.alt = `Thumbnail ${idx + 1}`;
      thumb.className = 'lightbox-thumb';
      thumb.addEventListener('click', () => {
        stopSlideshow();
        showSlide(idx);
      });
      lightboxFilmstrip.appendChild(thumb);
    });

    showSlide(activeImageIndex);
  };

  function closeLightbox() {
    if (!galleryModal) return;
    stopSlideshow();
    if (lightboxMainVideo) {
      lightboxMainVideo.pause();
      lightboxMainVideo.src = "";
    }
    galleryModal.classList.add('hidden');
    if (typeof lenis !== 'undefined') lenis.start();
  }

  function showSlide(index) {
    const album = activeAlbumIndex !== -1 ? IMAGES_DATA[activeAlbumIndex] : null;
    if (index < 0 || index >= activeImagesList.length) return;

    activeImageIndex = index;
    const newSrc = activeImagesList[activeImageIndex];
    const isVideo = newSrc.endsWith('.mp4') || newSrc.endsWith('.mov') || newSrc.endsWith('.webm');

    if (isVideo) {
      // Hide Image, Show Video
      lightboxMainImg.classList.add('hidden');
      lightboxMainVideo.classList.remove('hidden');
      
      lightboxMainVideo.src = newSrc;
      lightboxMainVideo.play().catch(e => console.log("Video autoplay blocked or interrupted."));
      
      // Auto advance slideshow when video ends
      lightboxMainVideo.onended = () => {
        if (isSlideshowPlaying) {
          nextSlide();
        }
      };

      if (isSlideshowPlaying) {
        // Pause timer while video plays, onended will resume
        clearInterval(slideshowInterval);
        slideshowInterval = null;
      }
    } else {
      // Hide Video, Show Image
      lightboxMainVideo.pause();
      lightboxMainVideo.src = "";
      lightboxMainVideo.classList.add('hidden');
      lightboxMainImg.classList.remove('hidden');

      // Cinematic fade-out & fade-in transition
      gsap.killTweensOf(lightboxMainImg);
      gsap.fromTo(lightboxMainImg, 
        { opacity: 0.3, filter: 'blur(4px)', scale: 0.98 },
        { 
          opacity: 1, 
          filter: 'blur(0px)', 
          scale: 1, 
          duration: 0.4, 
          ease: 'power2.out',
          onStart: () => {
            lightboxMainImg.src = newSrc;
          }
        }
      );

      if (isSlideshowPlaying) {
        resetSlideshowInterval();
      }
    }

    // Update Counter
    lightboxCounter.textContent = `HÌNH ${activeImageIndex + 1} / ${activeImagesList.length}`;

    // Highlight filmstrip thumbnail
    const thumbnails = lightboxFilmstrip.children;
    Array.from(thumbnails).forEach((thumb, idx) => {
      if (idx === activeImageIndex) {
        thumb.classList.add('active');
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        thumb.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    if (activeImagesList.length === 0) return;
    let nextIdx = activeImageIndex + 1;
    if (nextIdx >= activeImagesList.length) nextIdx = 0;
    showSlide(nextIdx);
  }

  function prevSlide() {
    if (activeImagesList.length === 0) return;
    let prevIdx = activeImageIndex - 1;
    if (prevIdx < 0) prevIdx = activeImagesList.length - 1;
    showSlide(prevIdx);
  }

  function toggleSlideshow() {
    if (isSlideshowPlaying) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  }

  // Handle click on slide to next slide
  if (lightboxMainImg) {
    lightboxMainImg.style.cursor = 'zoom-in';
  }

  function resetSlideshowInterval() {
    clearInterval(slideshowInterval);
    slideshowInterval = setInterval(() => {
      nextSlide();
    }, 3000);
  }

  function startSlideshow() {
    if (isSlideshowPlaying) return;
    isSlideshowPlaying = true;
    lightboxSlideshowText.textContent = "TẠM DỪNG TRÌNH CHIẾU";
    lightboxPlayIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`;
    
    if (activeImagesList.length > 0) {
      const currentSrc = activeImagesList[activeImageIndex];
      const isVideo = currentSrc.endsWith('.mp4') || currentSrc.endsWith('.mov') || currentSrc.endsWith('.webm');
      if (!isVideo) {
        resetSlideshowInterval();
      }
    }
  }

  function stopSlideshow() {
    if (!isSlideshowPlaying) return;
    isSlideshowPlaying = false;
    lightboxSlideshowText.textContent = "BẮT ĐẦU TRÌNH CHIẾU";
    lightboxPlayIcon.innerHTML = `<path d="M8 5v14l11-7z"/>`;
    
    clearInterval(slideshowInterval);
    slideshowInterval = null;
  }

  if (closeGalleryModalBtn) closeGalleryModalBtn.addEventListener('click', closeLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', () => { stopSlideshow(); prevSlide(); });
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', () => { stopSlideshow(); nextSlide(); });
  if (lightboxSlideshowBtn) lightboxSlideshowBtn.addEventListener('click', toggleSlideshow);

  if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (galleryModal && !galleryModal.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        stopSlideshow();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        stopSlideshow();
        prevSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleSlideshow();
      }
    }
  });

  window.getSectionImages = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return [];
    const images = [];
    
    // Find all img tags
    section.querySelectorAll('img[src]').forEach(img => {
      const src = img.getAttribute('src');
      if (src && !images.includes(src)) images.push(src);
    });
    
    // Find all background-images
    section.querySelectorAll('[style*="background-image"]').forEach(el => {
      if (el.classList.contains('poster-bg')) return;
      const style = el.getAttribute('style');
      const match = style.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (match && match[1]) {
        const src = match[1];
        if (!images.includes(src)) {
          images.push(src);
        }
      }
    });
    
    return images;
  };

  // ==========================================
  // FULLSCREEN IMAGE ZOOM OVERLAY IMPLEMENTATION
  // ==========================================
  let fullscreenOverlay = document.getElementById('imageFullscreenOverlay');
  if (!fullscreenOverlay) {
    fullscreenOverlay = document.createElement('div');
    fullscreenOverlay.id = 'imageFullscreenOverlay';
    fullscreenOverlay.className = 'fixed inset-0 bg-black/98 z-[60] hidden flex items-center justify-center cursor-zoom-out opacity-0';
    fullscreenOverlay.style.transition = 'opacity 0.3s ease';
    fullscreenOverlay.innerHTML = `
      <img id="fullscreen-overlay-img" class="max-w-[98vw] max-h-[98vh] object-contain select-none transition-transform duration-300 scale-95" src="" alt="Fullscreen Image">
      <div class="absolute top-4 right-4 text-white/70 hover:text-white font-condensed text-xs tracking-widest bg-black/40 hover:bg-black/60 px-3 py-1.5 rounded border border-white/10 transition-all">
        BẤM ĐỂ THOÁT
      </div>
    `;
    document.body.appendChild(fullscreenOverlay);
    
    fullscreenOverlay.addEventListener('click', closeFullscreenImg);
  }

  function openFullscreenImg(src) {
    const img = document.getElementById('fullscreen-overlay-img');
    if (img) {
      img.src = src;
      // Slight scale-up animation
      setTimeout(() => {
        img.classList.remove('scale-95');
        img.classList.add('scale-100');
      }, 50);
    }
    fullscreenOverlay.classList.remove('hidden');
    stopSlideshow();
    
    // Fade in
    setTimeout(() => {
      fullscreenOverlay.style.opacity = '1';
    }, 10);
  }

  function closeFullscreenImg() {
    fullscreenOverlay.style.opacity = '0';
    const img = document.getElementById('fullscreen-overlay-img');
    if (img) {
      img.classList.remove('scale-100');
      img.classList.add('scale-95');
    }
    setTimeout(() => {
      fullscreenOverlay.classList.add('hidden');
    }, 300);
  }

  // Setup click event on the main lightbox image to trigger zoom
  if (lightboxMainImg) {
    lightboxMainImg.style.cursor = 'zoom-in';
    lightboxMainImg.classList.add('transition-transform', 'duration-300', 'hover:scale-[1.01]');
    lightboxMainImg.addEventListener('click', () => {
      const src = lightboxMainImg.getAttribute('src');
      if (src) {
        openFullscreenImg(src);
      }
    });
  }

  // Handle ESC key to exit fullscreen image zoom if open
  document.addEventListener('keydown', (e) => {
    if (fullscreenOverlay && !fullscreenOverlay.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        closeFullscreenImg();
        e.stopPropagation(); // Avoid closing the main lightbox modal
      }
    }
  });

/* --- END OF FILE: 05-lightbox.js --- */

/* --- START OF FILE: 07-showreel.js --- */
// ==========================================
// ==========================================
  // 4. SHOWREEL VIDEO MODAL
// ==========================================
  const playBtn = document.getElementById('playShowreelBtn');
  const modal = document.getElementById('videoModal');
  const closeModalBtn = document.getElementById('closeModal');
  const iframe = document.getElementById('videoIframe');
  
  // Premium YouTube event lighting demo video
  const showreelUrl = "https://www.youtube.com/embed/coYw-Nirh_U?autoplay=1&mute=0";

  if (playBtn && modal) {
    playBtn.addEventListener('click', () => {
      iframe.src = showreelUrl;
      modal.classList.remove('hidden');
      lenis.stop(); // Disable page scrolling
    });

    closeModalBtn.addEventListener('click', () => {
      iframe.src = "";
      modal.classList.add('hidden');
      lenis.start(); // Enable page scrolling
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        iframe.src = "";
        modal.classList.add('hidden');
        lenis.start();
      }
    });
  }

/* --- END OF FILE: 07-showreel.js --- */

/* --- START OF FILE: 08-animations.js --- */
// ==========================================
// ==========================================
  // 5. GSAP SCROLL-TRIGGER PARALLAX & ENTRIES
// ==========================================
  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  const sections = document.querySelectorAll('section');

  sections.forEach((section) => {
    const bg = section.querySelector('.poster-bg');
    const content = section.querySelector('.poster-content');
    const title = section.querySelector('h1, h2, h3');
    
    // Parallax background effect (works perfectly across all browsers)
    if (bg) {
      gsap.fromTo(bg, 
        { yPercent: -15, scale: 1.15 }, 
        { 
          yPercent: 15, 
          scale: 1.02,
          ease: 'none', 
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }

    // Content fade and slight scroll reveal
    if (content) {
      gsap.fromTo(content,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Dramatic cinematic title text-spacing reveal
    if (title && !title.closest('#hero-poster')) {
      gsap.fromTo(title,
        { letterSpacing: '0.05em', filter: 'blur(4px)', opacity: 0.6 },
        {
          letterSpacing: '0.15em',
          filter: 'blur(0px)',
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  });

  // Hero Section Specific Cinematic Opening Timeline
  const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  
  heroTl.fromTo('#hero-poster .poster-bg', 
    { scale: 1.3, opacity: 0 }, 
    { scale: 1.15, opacity: 0.35, duration: 2.5 }
  );

  heroTl.fromTo('#hero-poster .text-cinematic-title',
    { opacity: 0, y: 100, filter: 'blur(10px)', letterSpacing: '-0.05em' },
    { opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '0em', duration: 1.8 },
    '-=2.0'
  );

  heroTl.fromTo('#hero-poster .text-cinematic-subtitle',
    { opacity: 0, scale: 0.8, letterSpacing: '0.1em' },
    { opacity: 1, scale: 1, letterSpacing: '0.4em', duration: 1.2 },
    '-=1.0'
  );

  heroTl.fromTo('#hero-poster p, #hero-poster italic, #hero-poster .animate-bounce',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1.0, stagger: 0.2 },
    '-=0.8'
  );

/* --- END OF FILE: 08-animations.js --- */

/* --- START OF FILE: 99-closing.js --- */
});
/* --- END OF FILE: 99-closing.js --- */

