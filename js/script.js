tampilkanSemua();
// Fungsi untuk menampilkan semua produk
function tampilkanSemua() {
  tampilkanProduk("");
}

function pindahKeranjang() {
  window.location.href = "keranjang.html";
}

// Fungsi untuk menampilkan produk berdasarkan jenis
function tampilkanProduk(jenis) {
  const containerProduk = document.getElementById("produk-container");

  ubahJenis(jenis);

  // Kosongkan container produk sebelum menambahkan produk baru
  containerProduk.innerHTML = "";
  fetchData(jenis, containerProduk, null);
}

function ubahJenis(jenis) {
  var judul = document.getElementById("judul");
  var semua = document.getElementById("Semua");
  var hoodie = document.getElementById("Hoodie");
  var celana = document.getElementById("Celana");
  var kaos = document.getElementById("Kaos");
  var jaket = document.getElementById("Jaket");

  semua.classList.remove("active");
  hoodie.classList.remove("active");
  celana.classList.remove("active");
  kaos.classList.remove("active");
  jaket.classList.remove("active");

  semua.classList.remove("border-bottom");
  hoodie.classList.remove("border-bottom");
  celana.classList.remove("border-bottom");
  kaos.classList.remove("border-bottom");
  jaket.classList.remove("border-bottom");

  if (jenis != "") {
    var nav = document.getElementById(jenis);
    judul.innerHTML = jenis;
    nav.classList.add("active");
    nav.classList.add("border-bottom");
  } else {
    var nav = document.getElementById("Semua");
    nav.classList.add("active");
    nav.classList.add("border-bottom");
    judul.innerHTML = "Semua";
  }
}

function cariProduk() {
  var judul = document.getElementById("judul");
  judul.innerHTML = "Pencarian";
  const cari = document.getElementById("cari");
  var value = cari.value;

  const containerProduk = document.getElementById("produk-container");
  containerProduk.innerHTML = "";

  fetchData(value, containerProduk, "cari");
}

function fetchData(value, containerProduk, desk) {
  var jumlah = document.getElementById("jumlah");
  // Ambil data dari file JSON
  var i = 0;
  var produkTampil = "";
  fetch("../data.json")
    .then((response) => response.json())
    .then((dataProduk) => {
      // Filter produk berdasarkan jenis

      if (desk == "cari") {
        produkTampil = value
          ? dataProduk.filter((produk) =>
              produk.nama.includes(value.toUpperCase())
            )
          : dataProduk;
      } else {
        // Filter produk berdasarkan jenis
        produkTampil = value
          ? dataProduk.filter((produk) => produk.jenis === value)
          : dataProduk;
      }

      // Tampilkan produk pada container
      produkTampil.forEach((produk) => {
        i += 1;
        const cardProduk = document.createElement("a");
        cardProduk.className = "produk";

        // Buat href sesuai dengan ID produk dari JSON
        const detailUrl = `detail.html?id=${produk.id}`;
        cardProduk.setAttribute("href", detailUrl);

        cardProduk.innerHTML = `
            <img src="${produk.gambar}" alt="" />
            <p>${produk.tipe}</p>
            <h7>${produk.nama}</h7>
            <p><b>${produk.harga}</b></p>
        `;

        containerProduk.appendChild(cardProduk);
      });

      jumlah.innerHTML = "[" + i + "]";
      i = 0;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
