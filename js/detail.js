function dapatkanNilaiID() {
  const urlParams = new URLSearchParams(window.location.search);
  const nilaiID = urlParams.get("id");
  return nilaiID;
}

const nilaiID = dapatkanNilaiID();

const containerDetail = document.getElementById("container-detail");

fetch("../data.json")
  .then((response) => response.json())
  .then((dataProduk) => {
    // Filter produk berdasarkan jenis
    produkTampil = nilaiID
      ? dataProduk.filter((produk) => produk.id.toString() == nilaiID)
      : dataProduk;
    // Tampilkan produk pada container
    produkTampil.forEach((produk) => {
      const detailImage = document.createElement("div");
      detailImage.className = "detail-image";

      detailImage.innerHTML = `
        <img src="${produk.gambar}" alt="" />
    `;

      const detailDesk = document.createElement("div");
      detailDesk.className = "deskripsi";

      detailDesk.innerHTML = `
        <h1>${produk.nama}</h1>
        <div class="d-flex">
          <p style="margin-right: 15px">[ ${produk.warna} ]</p>
          <p>${produk.jenis} - ${produk.tipe}</p>
        </div>
        <h6 style="text-align: justify">
        ${produk.deskripsi}
        </h6>
        <h5 style="padding-top: 10px"><b>${produk.harga}</b></h5>
        <button class="add-cards" onclick="tambahKeKeranjang('${produk.id}', '${produk.nama}', '${produk.harga}', '${produk.hargaAsli}', '${produk.gambar}')">TAMBAH KERANJANG</button>
    `;

      containerDetail.appendChild(detailImage);
      containerDetail.appendChild(detailDesk);
    });
  });

function tambahKeKeranjang(id, nama, harga, hargaAsli, gambar) {
  // Ambil data keranjang dari local storage
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

  // Cari apakah produk dengan ID sudah ada di keranjang
  const produkDiKeranjang = keranjang.find((produk) => produk.id === id);

  if (!produkDiKeranjang) {
    // Jika produk belum ada di keranjang, tambahkan
    keranjang.push({
      id: id,
      jumlah: 1,
      nama: nama,
      harga: harga,
      hargaAsli: parseInt(hargaAsli),
      gambar: gambar,
    });

    // Simpan data keranjang kembali ke local storage
    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    alert("Produk berhasil ditambahkan ke keranjang!");
  } else {
    // Jika produk sudah ada di keranjang, tambahkan jumlah
    produkDiKeranjang.jumlah += 1;
    produkDiKeranjang.hargaAsli += produkDiKeranjang.hargaAsli;
    // Simpan data keranjang kembali ke local storage
    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    alert("Jumlah produk di keranjang berhasil ditambahkan!");
  }
}
