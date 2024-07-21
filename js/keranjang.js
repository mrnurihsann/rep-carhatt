// Ambil data dari localStorage
const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

// Fungsi untuk menampilkan keranjang
function tampilkanKeranjang() {
  const tabelKeranjang = document.getElementById("tabel-keranjang");
  let totalHarga = 0; // Reset total harga

  // Filter produk yang ada di keranjang
  const produkKeranjang = keranjang.filter((produk) => produk.jumlah > 0);

  produkKeranjang.forEach((produk, index) => {
    const row = tabelKeranjang.insertRow();
    const noCell = row.insertCell(0);
    const gambarCell = row.insertCell(1);
    const namaCell = row.insertCell(2);
    const hargaCell = row.insertCell(3);
    const jumlah = row.insertCell(4);

    noCell.textContent = index + 1;
    namaCell.textContent = produk.nama;
    hargaCell.textContent = produk.harga;
    jumlah.textContent = produk.jumlah;

    // Menambahkan elemen img dengan src sesuai dengan gambar produk
    const img = document.createElement("img");
    img.src = produk.gambar;
    img.alt = produk.nama;
    img.style.width = "50px"; // Sesuaikan ukuran gambar sesuai kebutuhan
    gambarCell.appendChild(img);

    totalHarga =
      totalHarga +
      parseInt(produk.harga.replace(/\D/g, ""), 10) * produk.jumlah;
    // Tampilkan total harga
    const totalHargaElement = document.getElementById("total-harga");
    totalHargaElement.textContent = `Total Harga: Rp. ${totalHarga.toLocaleString()}`;
  });
}

// Panggil fungsi untuk menampilkan keranjang
tampilkanKeranjang();

function prosesPembayaran() {
  const jumlahPembayaranInput = document.getElementById("inputPembayaran");
  const jumlahPembayaran = parseInt(jumlahPembayaranInput.value);

  if (isNaN(jumlahPembayaran) || jumlahPembayaran < 0) {
    alert("Jumlah pembayaran tidak valid.");
    return;
  }

  const totalHarga = hitungTotalHarga();

  if (jumlahPembayaran >= totalHarga) {
    // Proses pembayaran berhasil
    alert("Pembayaran berhasil!");

    // Hapus semua produk dari keranjang
    keranjang.forEach((produk) => {
      produk.jumlah = 0;
    });

    // Simpan perubahan ke localStorage
    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    // Perbarui tampilan keranjang
    window.location.href = "index.html";
  } else {
    alert("Jumlah pembayaran kurang. Mohon masukkan jumlah yang mencukupi.");
  }
}

function hapusPembayaran() {
  alert("Keranjang berhasil di hapus!");

  // Hapus semua produk dari keranjang
  keranjang.forEach((produk) => {
    produk.jumlah = 0;
  });

  // Simpan perubahan ke localStorage
  localStorage.setItem("keranjang", JSON.stringify(keranjang));

  // Perbarui tampilan keranjang
  window.location.href = "index.html";
}

function hitungTotalHarga() {
  let totalHarga = 0;
  keranjang.forEach((produk) => {
    totalHarga += parseInt(produk.harga.replace(/\D/g, ""), 10) * produk.jumlah;
  });
  return totalHarga;
}
