# PAYU GIVEAWAY - Kurulum Kılavuzu

## 📦 İçerik

Bu ZIP dosyası, Payu Squid Game Giveaway uygulamasının **%100 çalışır halde** tüm kaynak kodlarını içerir.

## 🚀 Kurulum Adımları

### 1. Gereksinimler

**Backend:**
- Python 3.8+
- MongoDB

**Frontend:**
- Node.js 16+
- Yarn

### 2. Backend Kurulumu

```bash
cd backend
pip install -r requirements.txt
```

**Ortam Değişkenleri (backend/.env):**
```
MONGO_URL=mongodb://localhost:27017/
DB_NAME=payu_giveaway
CORS_ORIGINS=http://localhost:3000
```

**Backend'i Çalıştır:**
```bash
python server.py
```

Backend: `http://localhost:8001`

### 3. Frontend Kurulumu

```bash
cd frontend
yarn install
```

**Ortam Değişkenleri (frontend/.env):**
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

**Frontend'i Çalıştır:**
```bash
yarn start
```

Frontend: `http://localhost:3000`

## 🎯 Özellikler

### ✅ Tamamlanan Özellikler

1. **Ana Sayfa (Home.js)**
   - Squid Game temalı tasarım
   - "JOIN THE GIVEAWAY" butonu
   - Otomatik cüzdan bağlantısı
   - Otomatik kayıt sistemi
   - Geri sayım sayacı

2. **Cüzdan Entegrasyonu**
   - RainbowKit ile çoklu cüzdan desteği
   - MetaMask
   - WalletConnect
   - Coinbase Wallet
   - Rainbow Wallet

3. **Otomatik Kayıt Sistemi**
   - Kullanıcı cüzdan bağladığında otomatik kayıt
   - Blockchain smart contract entegrasyonu
   - Backend'e kayıt
   - Toast bildirimleri

4. **Görevler Sayfası (Join.js)**
   - Kayıt durumu gösterimi
   - Bilet numarası
   - Sosyal medya görevleri:
     - Telegram
     - Twitter (X)
     - Instagram
   - Görev tamamlama takibi

5. **My Entries Sayfası**
   - Kullanıcı bilet bilgileri
   - Transaction hash
   - Kayıt detayları

6. **Admin Paneli**
   - Tüm kayıtları görüntüleme
   - Görev istatistikleri
   - Giveaway yönetimi

7. **Çoklu Dil Desteği**
   - İngilizce
   - Türkçe
   - Fransızca
   - Almanca
   - İspanyolca
   - Portekizce
   - Rusça
   - Arapça
   - Çince
   - Endonezce

## 🛠 Teknolojiler

### Frontend
- React
- Tailwind CSS
- RainbowKit
- Wagmi (v1)
- React Router
- i18next
- Sonner (Toast)

### Backend
- FastAPI
- MongoDB
- Motor (async MongoDB driver)
- Pydantic

### Blockchain
- Smart Contract entegrasyonu
- BSC Mainnet
- Web3 işlemleri

## 📝 Önemli Notlar

### Smart Contract Ayarları

`frontend/src/config/wagmi.js` dosyasında:
```javascript
export const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS'
export const REGISTRATION_FEE = '1000000000000000' // 0.001 BNB
```

### Admin Cüzdanı

`backend/server.py` dosyasında:
```python
ADMIN_WALLET = 'YOUR_ADMIN_WALLET_ADDRESS'
```

## 🎮 Kullanım

1. Kullanıcı ana sayfada "JOIN THE GIVEAWAY" butonuna tıklar
2. Cüzdan seçer ve bağlar
3. Otomatik olarak kayıt işlemi başlar
4. MetaMask'ta işlemi onaylar
5. Başarı mesajı alır
6. Görevler sayfasına yönlendirilir
7. Sosyal medya görevlerini tamamlar

## 🐛 Sorun Giderme

### Backend Başlamıyor
- MongoDB'nin çalıştığından emin olun
- `.env` dosyasının doğru olduğunu kontrol edin

### Frontend Başlamıyor
- `node_modules` silin ve `yarn install` yapın
- `.env` dosyasının doğru olduğunu kontrol edin

### Cüzdan Bağlanmıyor
- MetaMask'ın güncel olduğundan emin olun
- Doğru ağda (BSC Mainnet) olduğunuzu kontrol edin

## 📞 Destek

Herhangi bir sorun için lütfen iletişime geçin.

## 📄 Lisans

Bu proje açık kaynaklıdır.

---

**Yapım:** Emergent AI
**Tarih:** Ekim 2025
**Durum:** %100 Çalışır Halde ✅
