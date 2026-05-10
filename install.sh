#!/bin/bash
echo " Yeşil Şehir Projesi - Bağımlılıklar Yükleniyor..."

# Ana dizindeki bağımlılıkları kur
npm install

# Client (React) bağımlılıklarını kur
cd "$(dirname "$0")/client" && npm install

# Server (Express) bağımlılıklarını kur
cd ../server && npm install

echo " Tüm kurulumlar tamamlandı! Uygulamayı başlatmak için 'npm run dev' yazabilirsiniz."
