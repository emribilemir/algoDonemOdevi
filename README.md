# Yeşil Şehir Projesi — Algoritma Tasarımı ve Analizi

**Canlı Önizleme:** Projeyi yerel bilgisayarınıza kurmadan doğrudan test etmek için aşağıdaki adresi ziyaret edebilirsiniz:
[https://yesil-sehir-projesi.onrender.com](https://yesil-sehir-projesi.onrender.com)

**GitHub Deposu:** [https://github.com/emribilemir/yesil-sehir-projesi](https://github.com/emribilemir/yesil-sehir-projesi)

Bu proje, bir şehrin sürdürülebilirlik hedeflerine ulaşması için geliştirilmiş tam yığın (full-stack) bir karar destek sistemidir. Projede, bütçe kısıtlamaları altında enerji tasarrufu ve çevresel etkiyi maksimize etmek amacıyla **0-1 Knapsack (Sırt Çantası)** dinamik programlama algoritması kullanılmıştır.

## Kurulum ve Çalıştırma

Proje, hem backend (Express.js) hem de frontend (React + Vite) kısımlarından oluşmaktadır ve tek komutla aynı anda çalıştırılacak şekilde yapılandırılmıştır.

### Gereksinimler

- [Node.js](https://nodejs.org/en/) (v16 veya daha yeni bir sürüm)
- npm (Node Package Manager)

### Adımlar

1. **Bağımlılıkları Yükleme:**
   Ana klasörde terminali açarak öncelikle aşağıdaki komutu çalıştırın. Bu komut, sunucu ve istemci tarafları için tüm paketleri tek seferde kuracaktır.

   ```bash
   # Gerekli kütüphaneleri hem client hem server için kurmak üzere
   npm install && cd client && npm install && cd ../server && npm install && cd ..
   ```
   *(Alternatif olarak bash destekli ortamdaysanız `./install.sh` komutunu kullanabilirsiniz.)*

2. **Uygulamayı Başlatma:**
   Ana dizindeyken tek bir komutla hem backend hem de frontend sunucusunu çalıştırabilirsiniz:

   ```bash
   npm run dev
   ```

3. **Uygulamaya Erişim:**
   Tarayıcınız üzerinden **http://localhost:5173** adresine giderek arayüzü görüntüleyebilirsiniz. Backend API ise **http://localhost:3001** portunda çalışacaktır.

## Teknolojiler

- **Backend:** Node.js, Express.js (REST API, 0-1 Knapsack algoritmasının entegrasyonu)
- **Frontend:** React, Vite (Hızlı derleme, modern UI, filtreleme)
- **Veri Kümesi:** Çeşitli sürdürülebilir enerji, yalıtım ve akıllı şehir çözümlerini içeren 50 farklı cihaz `data.json` dosyasında tanımlıdır.

## Nasıl Çalışır?

Kullanıcı bütçesini belirlediğinde, sistem arkaplanda dinamik programlama ile 0-1 Knapsack algoritmasını çalıştırır ve aşağıdaki matematiksel modele göre, eldeki bütçeyle en verimli yatırımı sunar:

**Amaç Fonksiyonu (Maksimum Kazanç):**
$$Maximize\ Z = \sum_{i=1}^{n} (E_i \times S_i \times x_i)$$

- $E_i$: Tahmini yıllık enerji tasarrufu (kWh)
- $S_i$: Sürdürülebilirlik puanı (1-5)
- $x_i$: Karar değişkeni (cihaz seçilmişse 1, seçilmemişse 0)

**Bütçe Kısıtı:**
$$\sum_{i=1}^{n} (C_i \times x_i) \leq B$$

- $C_i$: Cihazın maliyeti (Cost)
- $B$: Toplam ayrılan bütçe

---
*Bu çalışma, algoritma ve çevre teknolojileri kesişimi bir dönem ödevi çalışması olarak sunulmuştur.*
