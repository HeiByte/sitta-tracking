// Ambil user login
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
const greetingText = document.getElementById("greetingText");
const userInfo = document.getElementById("userInfo");

// Greeting berdasarkan waktu
if (loggedUser) {
  const jam = new Date().getHours();
  let sapaan = "Selamat datang";
  if (jam >= 5 && jam < 11) sapaan = "Selamat pagi";
  else if (jam >= 11 && jam < 15) sapaan = "Selamat siang";
  else if (jam >= 15 && jam < 18) sapaan = "Selamat sore";
  else sapaan = "Selamat malam";

  greetingText.textContent = `${sapaan}, ${loggedUser.nama}! 👋`;
  userInfo.textContent = `${loggedUser.role} - ${loggedUser.lokasi}`;
} else {
  alert("Silakan login terlebih dahulu!");
  window.location.href = "index.html";
}

// Tampilkan data stok
const tabelBody = document.querySelector("#tabelStok tbody");

function tampilkanStok() {
  tabelBody.innerHTML = "";
  dataBahanAjar.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td><img src="${item.cover}" alt="${item.namaBarang}" width="50"></td>
      <td>${item.kodeLokasi}</td>
      <td>${item.kodeBarang}</td>
      <td>${item.namaBarang}</td>
      <td>${item.jenisBarang}</td>
      <td>${item.edisi}</td>
      <td>${item.stok}</td>
    `;
    tabelBody.appendChild(tr);
  });
}


tampilkanStok();
