// == LOGIN VALIDATION == //
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const pengguna = dataPengguna.find(
    (user) => user.email === email && user.password === password
  );

  if (pengguna) {
    // Simpan data pengguna yang login ke localStorage
    localStorage.setItem("loggedUser", JSON.stringify(pengguna));

    alert("Login berhasil! Selamat datang, " + pengguna.nama);
    window.location.href = "dashboard.html";
  } else {
    alert("Email atau password yang Anda masukkan salah!");
  }
});

// === MODAL FUNCTIONALITY ===
const forgotModal = document.getElementById("forgotModal");
const registerModal = document.getElementById("registerModal");
const forgotBtn = document.getElementById("forgotBtn");
const registerBtn = document.getElementById("registerBtn");
const closeForgot = document.getElementById("closeForgot");
const closeRegister = document.getElementById("closeRegister");

// Buka modal
forgotBtn.onclick = () => (forgotModal.style.display = "block");
registerBtn.onclick = () => (registerModal.style.display = "block");

// Tutup modal
closeForgot.onclick = () => (forgotModal.style.display = "none");
closeRegister.onclick = () => (registerModal.style.display = "none");

// Tutup modal saat klik di luar
window.onclick = function (event) {
  if (event.target === forgotModal) forgotModal.style.display = "none";
  if (event.target === registerModal) registerModal.style.display = "none";
};
