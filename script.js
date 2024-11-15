const cards = document.querySelector(".cards");
const fiyat = document.querySelector(".fiyat");


let urunler = [
  {
    name: "Çekirdek",
    price: 45,
    img: "cekirdek.jpg",
    id: 1,
  },
  {
    name: "Ekmek",
    img: "ekmek.jpg",
    price: 10,
    id: 2,
  },
  {
    name: "Çikolata",
    img: "cikolata.jpg",
    price: 30,
    id: 3,
  },
  {
    name: "Coca Cola",
    img: "cola.jpg",
    price: 35,
    id: 4,
  },
  {
    name: "Süt",
    img: "sut.jpg",
    price: 30,
    id: 5,
  },
  {
    name: "Cips",
    img: "cips.jpg",
    price: 50,
    id: 6,
  },
];

let sepet = [];

urunler.forEach((urun) => {
  const div = document.createElement("div");
  div.className = "card";

  const img = document.createElement("img");
  img.src = `img/${urun.img}`;

  const p = document.createElement("p");
  p.textContent = urun.name;

  const p2 = document.createElement("p");
  p2.textContent = `Fiyatı : ` + urun.price;

  const i = document.createElement("i");
  i.className = "fa-solid fa-plus";

  const i2 = document.createElement("i");
  i2.className = "fa-solid fa-minus";

  const buton1 = document.createElement("button");
  buton1.className = "btn1";
  buton1.setAttribute("data-id", urun.id);
  buton1.appendChild(i);

  const buton2 = document.createElement("button");
  buton2.className = "btn2";
  buton2.setAttribute("data-id", urun.id);
  buton2.appendChild(i2);

  const div2 = document.createElement("div");
  div2.className = "description";
  div2.appendChild(p);
  div2.appendChild(p2);

  const div3 = document.createElement("div");
  div3.className = "buttons";
  div3.appendChild(buton1);
  div3.appendChild(buton2);

  div.appendChild(img);
  div.appendChild(div2);
  div.appendChild(div3);

  cards.appendChild(div);

  buton1.addEventListener("click", (e) => {
    const urunid = e.currentTarget.getAttribute("data-id");
    const urun = urunler.find((u) => u.id == urunid);
    sepet.push(urun);
    console.log(sepet);
    guncelSepet();
  });
  buton2.addEventListener("click", (e) => {
    const urunid = parseInt(e.currentTarget.getAttribute("data-id"));
    const urunIndex = sepet.findIndex((u) => u.id === urunid);

    if (urunIndex !== -1) {
      sepet.splice(urunIndex, 1);
      console.log(sepet);
      guncelSepet();
    } else {
      console.log("Ürün sepette bulunamadı");
    }
  });

  

  function guncelSepet() {
    let total = 0;  // Toplamı her defasında sıfırlıyoruz
    for (let i = 0; i < sepet.length; i++) {
      total += sepet[i].price;  // Sepetteki her ürünün fiyatını ekliyoruz
    }
    fiyat.innerHTML = `<i class="fa-solid fa-bag-shopping"></i> Sepetim : ${total} TL`;  // Toplam fiyatı yazdırıyoruz
  }
  
  
});
