const cards = document.querySelector(".cards");
const fiyat = document.querySelector(".fiyat");
const detay = document.querySelector(".popup");
const overlay = document.querySelector("#overlay");
const closeButton = document.querySelector("#clsbtn")
const description = document.querySelector(".description");

let urunler = [
  { name: "Çekirdek", price: 45, img: "cekirdek.jpg", id: 1 },
  { name: "Ekmek", price: 10, img: "ekmek.jpg", id: 2 },
  { name: "Çikolata", price: 30, img: "cikolata.jpg", id: 3 },
  { name: "Coca Cola", price: 35, img: "cola.jpg", id: 4 },
  { name: "Süt", price: 30, img: "sut.jpg", id: 5 },
  { name: "Cips", price: 50, img: "cips.jpg", id: 6 },
];

// Sepeti başlat ve kontrol et
let sepet = JSON.parse(localStorage.getItem("basket")) || [];
if (!Array.isArray(sepet)) {
  sepet = [];
  localStorage.setItem("basket", JSON.stringify(sepet));
}
guncelSepet();

// Ürünleri sayfaya ekleme
urunler.forEach((urun) => {
  const div = document.createElement("div");
  div.className = "card";

  const img = document.createElement("img");
  img.src = `img/${urun.img}`;

  const p = document.createElement("p");
  p.textContent = urun.name;

  const p2 = document.createElement("p");
  p2.textContent = `Fiyatı: ${urun.price} TL`;

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

  // Ürün Ekleme
  buton1.addEventListener("click", (e) => {
    const urunid = e.currentTarget.getAttribute("data-id");
    const urun = urunler.find((u) => u.id == urunid);
    const mevcutUrun = sepet.find((u) => u.id == urunid);

    if (mevcutUrun) {
      mevcutUrun.quantity += 1; // Miktarı artır
    } else {
      sepet.push({ ...urun, quantity: 1 }); // Yeni ürün ekle
    }
    addToLS();
    guncelSepet();
  });

  // Ürün Çıkarma
  buton2.addEventListener("click", (e) => {
    const urunid = parseInt(e.currentTarget.getAttribute("data-id"));
    const urunIndex = sepet.findIndex((u) => u.id === urunid);

    if (urunIndex !== -1) {
      if (sepet[urunIndex].quantity > 1) {
        sepet[urunIndex].quantity -= 1; // Miktarı azalt
      } else {
        sepet.splice(urunIndex, 1); // Sepetten çıkar
      }
      addToLS();
      guncelSepet();
    } else {
      console.log("Ürün sepette bulunamadı");
    }
  });
});

// Güncel Sepeti Gösterme
function guncelSepet() {
  let total = sepet.reduce((acc, item) => acc + item.price * item.quantity, 0);
  fiyat.innerHTML = `<i class="fa-solid fa-bag-shopping"></i> Sepetim: ${total} TL`;
}

// Sepeti LocalStorage'a Kaydetme
function addToLS() {
  localStorage.setItem("basket", JSON.stringify(sepet));
}

// Sepet Detaylarını Gösterme
fiyat.addEventListener("click", () => {
  const pop = JSON.parse(localStorage.getItem("basket"));
  detay.style.display = "block"
  overlay.style.display = "block"

  pop.forEach((e)=>{

    const popup = document.createElement("p");
    const plus = document.createElement("button");
    const minus = document.createElement("button");
    const mbtn = document.createElement("i");
    const pbtn = document.createElement("i");
    const popdiv = document.createElement("div");
    const content = document.createElement("div");
    const toplam = document.createElement("p");
    toplam.innerHTML = `${e.quantity}`

    content.innerHTML = `${e.name} : ${e.price*e.quantity} TL`
    popdiv.className = "popdiv";
    popdiv.appendChild(plus)
    popdiv.appendChild(toplam)
    popdiv.appendChild(minus);
    popdiv.appendChild(content)
    pbtn.className = "fa-solid fa-plus";
    mbtn.className = "fa-solid fa-minus";
    plus.className = "btn1";
    minus.className ="btn2";
    plus.appendChild(pbtn);
    minus.appendChild(mbtn);
    popup.appendChild(popdiv);
    description.appendChild(popup)
    detay.appendChild(description)

    plus.addEventListener("click", () => {
      e.quantity++;
      toplam.innerHTML = `${e.quantity}`;
      content.innerHTML = `${e.name} : ${e.price * e.quantity} TL`;
      localStorage.setItem("basket", JSON.stringify(pop));
      
    });

    
    minus.addEventListener("click", () => {
      if (e.quantity > 1) {
        e.quantity--;
        toplam.innerHTML = `${e.quantity}`;
        content.innerHTML = `${e.name} : ${e.price * e.quantity} TL`;
        localStorage.setItem("basket", JSON.stringify(pop));
        
      }
    });

    
    
  })



});

closeButton.addEventListener("click",overlayClose);


function overlayClose(){
  detay.style.display = "none";
  overlay.style.display = "none";
  description.textContent = "";
 
  
}
