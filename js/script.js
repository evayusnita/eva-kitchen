// Sapaan otomatis
function setSapaan() {
  const now = new Date();
  const hour = now.getHours();
  let sapaan = "Selamat datang";

  if (hour >= 4 && hour < 11) sapaan = "Selamat pagi";
  else if (hour >= 11 && hour < 15) sapaan = "Selamat siang";
  else if (hour >= 15 && hour < 18) sapaan = "Selamat sore";
  else sapaan = "Selamat malam";

  const nama = "Eva Kitchen"; // Bisa dinamis nanti
  document.getElementById("sapaan") && (document.getElementById("sapaan").innerText = `${sapaan}, ${nama}`);
  document.getElementById("sapaan-mobile") && (document.getElementById("sapaan-mobile").innerText = `${sapaan}`);
}

// Jam digital
function updateWaktu() {
  const now = new Date();
  const jam = now.getHours().toString().padStart(2, '0');
  const menit = now.getMinutes().toString().padStart(2, '0');
  const detik = now.getSeconds().toString().padStart(2, '0');
  const waktu = `${jam}:${menit}:${detik}`;

  document.getElementById("waktu-jam") && (document.getElementById("waktu-jam").innerText = waktu);
  document.getElementById("waktu-jam-mobile") && (document.getElementById("waktu-jam-mobile").innerText = waktu);
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("tema", document.body.classList.contains("dark") ? "dark" : "light");
}

// Load dark mode dari localStorage
function applySavedTheme() {
  const saved = localStorage.getItem("tema");
  if (saved === "dark") document.body.classList.add("dark");
}

// Toggle mobile menu
function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu) menu.classList.toggle("hidden");
}

// Inisialisasi
document.addEventListener("DOMContentLoaded", () => {
  applySavedTheme();
  setSapaan();
  updateWaktu();
  setInterval(updateWaktu, 1000);

  document.getElementById("dark-toggle")?.addEventListener("click", toggleDarkMode);
  document.getElementById("dark-toggle-mobile")?.addEventListener("click", toggleDarkMode);
  document.getElementById("menu-toggle")?.addEventListener("click", toggleMobileMenu);
});
