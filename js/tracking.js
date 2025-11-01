// === Ambil data user login dari localStorage ===
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
const greetingText = document.getElementById("greetingText");
const userInfo = document.getElementById("userInfo");

// Jika belum login, arahkan ke login.html
if (!loggedUser) {
  alert("Silakan login terlebih dahulu!");
  window.location.href = "index.html";
} else {
  // Greeting berdasarkan waktu
  const jam = new Date().getHours();
  let sapaan = "Selamat datang";
  if (jam >= 5 && jam < 11) sapaan = "Selamat pagi";
  else if (jam >= 11 && jam < 15) sapaan = "Selamat siang";
  else if (jam >= 15 && jam < 18) sapaan = "Selamat sore";
  else sapaan = "Selamat malam";

  greetingText.textContent = `${sapaan}, ${loggedUser.nama}! 👋`;
  userInfo.textContent = `${loggedUser.role} - ${loggedUser.lokasi}`;
}

// === Elemen HTML ===
const doInput = document.getElementById("doInput");
const searchBtn = document.getElementById("searchBtn");
const trackingResult = document.getElementById("trackingResult");

const namaMahasiswa = document.getElementById("namaMahasiswa");
const nomorDO = document.getElementById("nomorDO");
const statusPengiriman = document.getElementById("statusPengiriman");
const ekspedisi = document.getElementById("ekspedisi");
const tanggalKirim = document.getElementById("tanggalKirim");
const jenisPaket = document.getElementById("jenisPaket");
const totalPembayaran = document.getElementById("totalPembayaran");
const progressBar = document.getElementById("progressBar");
const listPerjalanan = document.getElementById("listPerjalanan");

// === Fungsi pencarian DO ===
searchBtn.addEventListener("click", () => {
  const nomorDOInput = doInput.value.trim();
  if (nomorDOInput === "") {
    alert("Masukkan nomor DO terlebih dahulu!");
    return;
  }

  const data = dataTracking[nomorDOInput];
  if (!data) {
    alert("Nomor DO tidak ditemukan!");
    trackingResult.style.display = "none";
    return;
  }

  // Menampilkan data tracking
  namaMahasiswa.textContent = data.nama;
  nomorDO.textContent = data.nomorDO;
  statusPengiriman.textContent = data.status;
  ekspedisi.textContent = data.ekspedisi;
  tanggalKirim.textContent = data.tanggalKirim;
  totalPembayaran.textContent = data.total;

  // Cari nama bahan ajar dari dataBahanAjar
  const paket = dataBahanAjar.find((item) => item.kodeLokasi === data.paket);
  jenisPaket.textContent = paket
    ? `${paket.namaBarang} (${paket.jenisBarang} Edisi ${paket.edisi})`
    : "Tidak diketahui";

  // Hitung progress pengiriman
  const tahap = data.perjalanan.length;
  const progressValue = Math.min((tahap / 6) * 100, 100);
  progressBar.value = progressValue;

  // Riwayat perjalanan
  listPerjalanan.innerHTML = "";
  data.perjalanan.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = `${step.waktu} — ${step.keterangan}`;
    listPerjalanan.appendChild(li);
  });

  trackingResult.style.display = "block";
});
