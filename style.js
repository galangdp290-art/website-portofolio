/**
 * Dhanu Creative Studio - Interactive JavaScript
 * Menangani SPA Page Navigation (Beranda Utama & Navigasi Antar Halaman),
 * Animasi Counter, Mobile Menu, dan Interaksi Kartu
 */

document.addEventListener('DOMContentLoaded', () => {

  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const pageSections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('nav a, .footer-links a');

  // ========================================================
  // 1. Fungsi Ganti Halaman (SPA Navigation)
  // Halaman pertama yang muncul adalah Beranda.
  // Halaman lain hanya akan muncul saat tombol navigasi diklik.
  // ========================================================
  const switchPage = (targetId) => {
    // Validasi target ID, jika tidak ditemukan default ke 'home'
    let targetSection = document.getElementById(targetId);
    if (!targetSection || !targetSection.classList.contains('page-section')) {
      targetId = 'home';
      targetSection = document.getElementById('home');
    }

    // Sembunyikan semua section dan tampilkan hanya section yang dipilih
    pageSections.forEach(section => {
      section.classList.remove('active-section');
    });

    if (targetSection) {
      targetSection.classList.add('active-section');
    }

    // Perbarui indikator tombol aktif pada navbar & footer
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${targetId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Otomatis scroll kembali ke paling atas halaman dengan mulus
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Jika menu mobile sedang terbuka, tutup secara otomatis
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      if (menuToggle) {
        const icon = menuToggle.querySelector('i');
        if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
      }
    }

    // Jika masuk ke halaman Tentang ('about'), jalankan animasi angka
    if (targetId === 'about') {
      setTimeout(runCounters, 200);
    }
  };

  // Tangkap semua klik tautan anchor (#home, #about, #tools, dll)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      const targetId = hash.replace('#', '');
      
      if (targetId && document.getElementById(targetId)) {
        e.preventDefault();
        // Ubah URL Hash tanpa lompatan instan browser
        if (history.pushState) {
          history.pushState(null, null, hash);
        } else {
          window.location.hash = hash;
        }
        switchPage(targetId);
      }
    });
  });

  // Dengarkan perubahan hash (misal saat klik tombol browser Back / Forward)
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    switchPage(hash);
  });

  // Inisialisasi awal saat website dibuka:
  // Jika URL tidak memiliki hash atau user baru pertama buka, tampilkan BERANDA saja
  const initialPage = window.location.hash.replace('#', '') || 'home';
  switchPage(initialPage);

  // ========================================================
  // 2. Toggle Menu Navigasi Mobile (Hamburger)
  // ========================================================
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
          icon.classList.replace('fa-xmark', 'fa-bars');
        }
      }
    });
  }

  // ========================================================
  // 3. Animasi Angka Berjalan (Counter Animation) pada Tentang
  // ========================================================
  const counters = document.querySelectorAll('.counter');
  let isCounting = false;

  const runCounters = () => {
    if (isCounting) return;
    isCounting = true;

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const increment = Math.ceil(target / 35);

      counter.innerText = '0';

      const updateCounter = () => {
        count += increment;
        if (count >= target) {
          counter.innerText = target + (target === 100 ? '' : '+');
          isCounting = false;
        } else {
          counter.innerText = count;
          setTimeout(updateCounter, 30);
        }
      };
      updateCounter();
    });
  };

  // ========================================================
  // 4. Efek Interaksi Sentuh/Klik pada Kartu Software
  // ========================================================
  const toolCards = document.querySelectorAll('.tool-card');
  toolCards.forEach(card => {
    card.addEventListener('click', () => {
      card.style.transform = 'scale(0.97)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
    });
  });

});