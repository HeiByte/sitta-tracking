// === Ambil data user login dari localStorage ===
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
const greetingText = document.getElementById("greetingText");
const userInfo = document.getElementById("userInfo");

// Jika tidak login, arahkan ke halaman login
if (!loggedUser) {
  alert("Silakan login terlebih dahulu!");
  window.location.href = "login.html";
}

// === Greeting berdasarkan waktu ===
const jam = new Date().getHours();
let greet = "";
if (jam < 12) greet = "Selamat pagi";
else if (jam < 15) greet = "Selamat siang";
else if (jam < 19) greet = "Selamat sore";
else greet = "Selamat malam";

greetingText.textContent = `${greet}, ${loggedUser.nama}! 👋`;
userInfo.textContent = `${loggedUser.role} - ${loggedUser.lokasi}`;

// === Ringkasan Statistik Pengiriman ===
const totalDO = Object.keys(dataTracking).length;
const selesaiDO = Object.values(dataTracking).filter(t => t.status.toLowerCase() === "selesai").length;
const dalamProsesDO = Object.values(dataTracking).filter(t => t.status.toLowerCase().includes("perjalanan")).length;

const totalDOMeter = document.getElementById("totalDO");
const selesaiDOMeter = document.getElementById("selesaiDO");
const prosesDOMeter = document.getElementById("prosesDO");

if (totalDOMeter) totalDOMeter.textContent = totalDO;
if (selesaiDOMeter) selesaiDOMeter.textContent = selesaiDO;
if (prosesDOMeter) prosesDOMeter.textContent = dalamProsesDO;

// === Ringkasan Stok Bahan Ajar ===
const totalBahan = dataBahanAjar.length;
const totalStok = dataBahanAjar.reduce((acc, item) => acc + item.stok, 0);

const totalBahanMeter = document.getElementById("totalBahan");
const totalStokMeter = document.getElementById("totalStok");

if (totalBahanMeter) totalBahanMeter.textContent = totalBahan;
if (totalStokMeter) totalStokMeter.textContent = totalStok;

// === Recent Tracking (tampilkan 3 terbaru) ===
const recentTrackingList = document.getElementById("recentTrackingList");
if (recentTrackingList) {
  const recent = Object.values(dataTracking)
    .sort((a, b) => new Date(b.tanggalKirim) - new Date(a.tanggalKirim))
    .slice(0, 3);

  recentTrackingList.innerHTML = "";
  recent.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `DO ${t.nomorDO} → ${t.status} (${t.nama})`;
    recentTrackingList.appendChild(li);
  });
}

// === Info & Pengumuman Otomatis untuk user login ===
const infoList = document.getElementById("infoList");
if (infoList) {
  infoList.innerHTML = "";

  // Cari DO yang terkait dengan user yang login
  const userDOs = Object.values(dataTracking)
    .filter(t => t.nama === loggedUser.nama)
    .sort((a, b) => new Date(b.tanggalKirim) - new Date(a.tanggalKirim));

  if (userDOs.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Belum ada pengiriman untuk Anda.";
    infoList.appendChild(li);
  } else {
    userDOs.forEach(t => {
      const li = document.createElement("li");
      li.textContent = `DO ${t.nomorDO} (${t.status}) dikirim pada ${t.tanggalKirim}`;
      infoList.appendChild(li);
    });
  }

  // Tambahan pengumuman global
  const liGlobal = document.createElement("li");
  liGlobal.textContent = "Periksa stok bahan ajar terbaru di menu Informasi Bahan Ajar.";
  infoList.appendChild(liGlobal);
}
