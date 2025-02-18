//* class ve id'leri çek
const harcamaInput = document.querySelector('#harcama');
const fiyatInput = document.querySelector('#fiyat');
const statusCheck = document.querySelector('#status-input');
const formBtn = document.querySelector('.ekle-btn');
const liste = document.querySelector('.liste');
const toplamBilgi = document.querySelector('#toplam-bilgi');
const selectFilter = document.querySelector('#filter-select');

//* olay izleyici ekliyoruz addEventListener ile click ile
formBtn.addEventListener('click',addExpense);
//* click ekliyoruz addEventListener ile
liste.addEventListener('click',handleClick);
selectFilter.addEventListener("change",handleFilter)


//Toplam State(durum)
let toplam = 0;


function updateToplam(fiyat){
    toplam += parseInt(fiyat);
    toplamBilgi.innerText = toplam;
}


//* Harcama oluşturma
function addExpense(e) {
    e.preventDefault();


if(fiyatInput.value && !harcamaInput.value){
    alert('Formları DOldurun');
    // Return ile fonsyonu durduruyoruz
    return;
}


    // console.log(harcamaInput.value, fiyatInput.value);
    //* Div Oluşturma createElement ile HTML elemanı oluşturuyoruz
    const harcamaDiv = document.createElement("div");

    // Class EKleme classList ve add ile
    harcamaDiv.classList.add('harcama');
    if(statusCheck.checked) {
        harcamaDiv.classList.add('payed');
    }

    // İÇERİĞİ AYARLAMA innerHTML ile
    harcamaDiv.innerHTML = `
        <h2>${harcamaInput.value}</h2>
        <h2 id="value">${fiyatInput.value}</h2>
        <div class="buttons">
            <img id="payment" src="/images/pay.png" />
            <img id="remove" src="/images/remove.png" />
        </div>
    `;

    // Oluşanb harcamayı HTML ile gönderme (listeye ekleme)
    //*appenChild kullanıyoruz
    liste.appendChild(harcamaDiv);


    // toplamı güncelle
    updateToplam(fiyatInput.value);

    // formu temizleme
    harcamaInput.value = '';
    fiyatInput.value = '';
}


// Listeye tıklanma olayını yönetme
function handleClick(e) {
    //tıklanılan sil butonunun kapsayıcısını al
 const elemant = e.target
 // eğer eleman id'si remove eşitse yani silme butonuna
 if(elemant.id === "remove"){
    // alert("Silme işlemi başlatıldı");
         const wrapperElement = elemant.parentElement.parentElement;

          // silinen elemanın fiyatını alma
          const deletedPrice = wrapperElement.querySelector("#value").innerText
          Number(deletedPrice);

          // Silinenin fiyatını toplamdan çıkarma
          updateToplam( - Number(deletedPrice));

         // kapsayıcı html'den kaldırma
         wrapperElement.remove();

        
 }
}

// FİLTRELEME İŞLEMİ
function handleFilter(e){
    const items = liste.childNodes;
    
    items.forEach((item) => {
        switch (e.target.value) {
            case 'all':
                item.style.display = 'flex';
                break;

                case 'payed':
                    if (!item.classList.contains('payed')) {
                        item.style.display = 'none';
                    } else {
                        item.style.display = 'flex';
                    }
                    break;

                    case 'not-payed':
                        if (item.classList.contains('payed')) {
                            item.style.display = 'none';
                        } else {
                            item.style.display = 'flex';
                        }
                        break;
        }
    })
}