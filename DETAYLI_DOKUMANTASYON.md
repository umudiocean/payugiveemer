# PAYU GIVEAWAY - DETAYLI TEKNİK DOKÜMANTASYON

## 📋 İÇİNDEKİLER
1. [Genel Bakış](#genel-bakış)
2. [Mimari Yapı](#mimari-yapı)
3. [Teknik Detaylar](#teknik-detaylar)
4. [Smart Contract](#smart-contract)
5. [Blockchain Entegrasyonu](#blockchain-entegrasyonu)
6. [Backend API](#backend-api)
7. [Frontend Yapısı](#frontend-yapısı)
8. [Kullanıcı Akışları](#kullanıcı-akışları)
9. [Kurulum ve Konfigürasyon](#kurulum-ve-konfigürasyon)

---

## 🎯 GENEL BAKIŞ

**Proje Adı:** Payu Squid Game Giveaway  
**Tip:** Web3 Kripto Giveaway Platformu  
**Blockchain:** Binance Smart Chain (BSC) Mainnet  
**Tema:** Squid Game

### Temel Özellikler
- ✅ Multi-wallet desteği (MetaMask, WalletConnect, Coinbase, Rainbow)
- ✅ Otomatik blockchain kayıt sistemi
- ✅ Smart contract entegrasyonu
- ✅ Sosyal medya görev sistemi
- ✅ Admin paneli
- ✅ 10 dil desteği
- ✅ Responsive tasarım

---

## 🏗️ MİMARİ YAPI

```
┌─────────────────────────────────────────────────────────────┐
│                         KULLANICI                            │
│                      (Web Tarayıcı)                          │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Home.js    │  │   Join.js    │  │ MyEntries.js │      │
│  │ (Ana Sayfa)  │  │  (Görevler)  │  │   (Bilet)    │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │               │
│         ▼                  ▼                  ▼               │
│  ┌─────────────────────────────────────────────────┐        │
│  │          RainbowKit + Wagmi (v1)                 │        │
│  │  (Cüzdan Bağlantısı & Blockchain İşlemleri)     │        │
│  └─────────────┬───────────────────────────────────┘        │
└────────────────┼────────────────────────────────────────────┘
                 │
                 ├─────────────────┐
                 │                 │
                 ▼                 ▼
┌────────────────────────┐  ┌─────────────────────────┐
│   BACKEND (FastAPI)    │  │  BLOCKCHAIN (BSC)       │
│                        │  │                         │
│  ┌──────────────────┐  │  │  ┌──────────────────┐  │
│  │  API Endpoints   │  │  │  │ Smart Contract   │  │
│  │  - /api/...      │  │  │  │ 0x17A0D20F...    │  │
│  └────────┬─────────┘  │  │  └──────────────────┘  │
│           │            │  │                         │
│           ▼            │  └─────────────────────────┘
│  ┌──────────────────┐  │
│  │    MongoDB       │  │
│  │  (Database)      │  │
│  └──────────────────┘  │
└────────────────────────┘
```

---

## 🔧 TEKNİK DETAYLAR

### Tech Stack

#### Frontend
```json
{
  "framework": "React 18",
  "styling": "Tailwind CSS",
  "web3": {
    "wallet-connector": "@rainbow-me/rainbowkit v1.3.6",
    "blockchain-library": "wagmi v1.4.13",
    "provider": "viem"
  },
  "routing": "react-router-dom v6",
  "i18n": "react-i18next",
  "ui": "shadcn/ui",
  "notifications": "sonner",
  "build-tool": "craco"
}
```

#### Backend
```json
{
  "framework": "FastAPI",
  "database": "MongoDB",
  "async-driver": "Motor",
  "validation": "Pydantic",
  "cors": "starlette.middleware.cors"
}
```

---

## 📜 SMART CONTRACT

### Contract Bilgileri

```javascript
// Smart Contract Adresi (BSC Mainnet)
CONTRACT_ADDRESS = "0x17A0D20Fc22c30a490FB6F186Cf2c31d738B5567"

// Kayıt Ücreti
REGISTRATION_FEE = "980000000000000" // 0.00098 BNB (wei cinsinden)

// Network
CHAIN_ID = 56 // BSC Mainnet
CHAIN_NAME = "Binance Smart Chain"
RPC_URL = "https://bsc-dataseed.binance.org/"
```

### Contract Fonksiyonları

#### 1. register() - Payable
```solidity
function register() external payable
```
**Açıklama:** Kullanıcıyı giveaway'e kaydeder  
**Gereksinim:** 0.00098 BNB ödeme  
**Event:** `Registered(address user, uint256 index, bytes32 seed, uint256 reward, uint256 timestamp)`

**Frontend Kullanımı:**
```javascript
import { useContractWrite } from 'wagmi'

const { write } = useContractWrite({
  address: CONTRACT_ADDRESS,
  abi: CONTRACT_ABI,
  functionName: 'register',
})

// Kayıt işlemi
write({
  args: [],
  value: BigInt(REGISTRATION_FEE) // 980000000000000 wei
})
```

#### 2. isRegistered(address) - View
```solidity
function isRegistered(address user) external view returns (bool)
```
**Açıklama:** Kullanıcının kayıtlı olup olmadığını kontrol eder  
**Parametreler:** `user` - Kontrol edilecek cüzdan adresi  
**Dönüş:** `true/false`

**Frontend Kullanımı:**
```javascript
import { useContractRead } from 'wagmi'

const { data: userIsRegistered } = useContractRead({
  address: CONTRACT_ADDRESS,
  abi: CONTRACT_ABI,
  functionName: 'isRegistered',
  args: [userAddress],
})
```

#### 3. indexOf(address) - View
```solidity
function indexOf(address user) external view returns (uint256)
```
**Açıklama:** Kullanıcının kayıt index numarasını döndürür  
**Parametreler:** `user` - Kullanıcı cüzdan adresi  
**Dönüş:** Kayıt index numarası

### Contract Event

```solidity
event Registered(
    address indexed user,
    uint256 index,
    bytes32 seed,
    uint256 reward,
    uint256 timestamp
)
```

**Event Parametreleri:**
- `user`: Kayıt olan kullanıcı adresi
- `index`: Kayıt sıra numarası
- `seed`: Rastgele seed değeri (bilet oluşturma için)
- `reward`: Ödül miktarı (250,000,000 PAYU)
- `timestamp`: Kayıt zamanı (Unix timestamp)

---

## 🌐 BLOCKCHAIN ENTEGRASYONU

### WalletConnect Configuration

```javascript
// WalletConnect Project ID
PROJECT_ID = "c1814df663b82b65bb5927ad59566843"

// App Adı
APP_NAME = "Payu Giveaway"

// Desteklenen Cüzdanlar
SUPPORTED_WALLETS = [
  "MetaMask",
  "WalletConnect",
  "Coinbase Wallet",
  "Rainbow Wallet"
]
```

### Wagmi Configuration

```javascript
import { configureChains, createConfig } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'

const projectId = 'c1814df663b82b65bb5927ad59566843'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bsc], 
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Payu Giveaway',
  projectId,
  chains,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})
```

### BSC Network Detayları

```javascript
{
  chainId: 56,
  name: 'Binance Smart Chain',
  network: 'bsc',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18
  },
  rpcUrls: {
    default: { http: ['https://bsc-dataseed.binance.org/'] },
    public: { http: ['https://bsc-dataseed.binance.org/'] }
  },
  blockExplorers: {
    default: { 
      name: 'BscScan', 
      url: 'https://bscscan.com' 
    }
  }
}
```

---

## 🔌 BACKEND API

### Base URL
```
https://payu-giveaway.preview.emergentagent.com/api
```

### Endpoints

#### 1. Health Check
```
GET /api/
```
**Açıklama:** API sağlık kontrolü  
**Response:**
```json
{
  "message": "PAYU Draw API - Squid Game Edition"
}
```

#### 2. Kayıt Kaydetme
```
POST /api/save-ticket
```
**Açıklama:** Blockchain'den gelen kayıt verilerini MongoDB'ye kaydeder

**Request Body:**
```json
{
  "wallet": "0x123...",
  "txHash": "0xabc...",
  "index": 1,
  "seed": "0xdef...",
  "ticket": "456-789-012",
  "reward": "250000000",
  "timestamp": 1696248000
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration saved",
  "data": {
    "id": "uuid",
    "wallet": "0x123...",
    "ticket": "456-789-012",
    ...
  }
}
```

#### 3. Kayıt Sorgulama
```
GET /api/registration/{wallet}
```
**Açıklama:** Cüzdan adresine göre kayıt bilgilerini getirir

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "wallet": "0x123...",
    "tx_hash": "0xabc...",
    "index": 1,
    "ticket": "456-789-012",
    "reward": "250000000",
    "timestamp": 1696248000,
    "created_at": "2025-10-02T12:00:00Z"
  }
}
```

#### 4. Görev Tıklama
```
POST /api/task-click
```
**Açıklama:** Kullanıcının görev tıklamasını kaydeder

**Request Body:**
```json
{
  "wallet": "0x123...",
  "platform": "telegram",
  "handle": ""
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task click logged"
}
```

#### 5. Görev Geçmişi
```
GET /api/tasks/{wallet}
```
**Açıklama:** Kullanıcının tamamladığı görevleri getirir

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "user_id": "0x123...",
      "platform": "telegram",
      "handle": "",
      "clicked_at": "2025-10-02T12:00:00Z"
    }
  ]
}
```

#### 6. Admin - Tüm Kayıtlar
```
GET /api/admin/registrations
Headers: { "x-wallet-address": "ADMIN_WALLET" }
```
**Açıklama:** Tüm kayıtları listeler (Admin only)

**Response:**
```json
{
  "success": true,
  "data": [...]
}
```

#### 7. Admin - Tüm Görevler
```
GET /api/admin/tasks
Headers: { "x-wallet-address": "ADMIN_WALLET" }
```
**Açıklama:** Tüm görev tamamlamalarını listeler (Admin only)

#### 8. Giveaway Durumu
```
GET /api/giveaway-status
```
**Açıklama:** Giveaway başlama durumunu döndürür

**Response:**
```json
{
  "success": true,
  "started": false,
  "start_time": null
}
```

#### 9. Admin - Giveaway Başlat
```
POST /api/admin/start-giveaway
Headers: { "x-wallet-address": "ADMIN_WALLET" }
```
**Açıklama:** Giveaway'i başlatır (Admin only)

### Admin Wallet
```
ADMIN_WALLET = "0xd9C4b8436d2a235A1f7DB09E680b5928cFdA641a"
```
*Not: Küçük harfe çevrilir karşılaştırma için*

---

## 💻 FRONTEND YAPISI

### Sayfa Yapısı

```
frontend/src/
├── pages/
│   ├── Home.js          # Ana sayfa - Otomatik kayıt sistemi
│   ├── Join.js          # Görevler sayfası
│   ├── MyEntries.js     # Bilet detayları
│   └── Admin.js         # Admin paneli
├── components/
│   ├── Layout.js        # Ana layout (header, footer)
│   ├── ConnectButton.js # Cüzdan bağlantı butonu
│   ├── CountdownTimer.js # Geri sayım
│   └── ui/              # 60+ UI komponenti
├── config/
│   └── wagmi.js         # Blockchain konfigürasyonu
├── hooks/
│   ├── useCountdown.js  # Geri sayım hook
│   └── use-toast.js     # Toast bildirimleri
├── i18n/
│   ├── index.js         # i18n konfigürasyonu
│   └── locales/         # 10 dil dosyası
└── utils/
    └── ticket.js        # Bilet oluşturma fonksiyonları
```

### Ana Komponentler

#### 1. Home.js
**Görev:** Ana sayfa ve otomatik kayıt sistemi

**Önemli Hook'lar:**
```javascript
const { isConnected, address } = useAccount()
const { write: writeContract, data: txData, isLoading: isPending } = useContractWrite({
  address: CONTRACT_ADDRESS,
  abi: CONTRACT_ABI,
  functionName: 'register',
})
```

**Otomatik Kayıt Akışı:**
```javascript
useEffect(() => {
  if (isConnected && address && !isPending && !isConfirming && !txHash) {
    setTimeout(() => {
      writeContract({
        args: [],
        value: BigInt(REGISTRATION_FEE)
      })
      toast.success('Registration started!')
    }, 1000)
  }
}, [isConnected, address])
```

#### 2. Join.js
**Görev:** Görevler ve kayıt durumu gösterimi

**Önemli Fonksiyonlar:**
- `checkRegistrationStatus()` - Backend'den kayıt kontrolü
- `loadCompletedTasks()` - Tamamlanan görevleri yükle
- `handleTaskClick()` - Görev tıklama kaydı
- `handleRegistrationSuccess()` - Başarılı kayıt işlemi

**Görev Sistemi:**
```javascript
const tasks = [
  { platform: 'telegram', url: 'https://t.me/payu_coin' },
  { platform: 'x', url: 'https://x.com/payu_coin' },
  { platform: 'instagram_story', url: 'https://www.instagram.com/payu.coin/' }
]
```

#### 3. MyEntries.js
**Görev:** Kullanıcının bilet ve kayıt detaylarını gösterir

**Gösterilen Bilgiler:**
- Bilet numarası
- Transaction hash
- Kayıt tarihi
- Ödül miktarı
- Network bilgisi

---

## 🔄 KULLANICI AKIŞLARI

### 1. İLK KAYIT AKIŞI

```
1. Kullanıcı ana sayfayı ziyaret eder
   └─> Home.js yüklenir

2. "JOIN THE GIVEAWAY" butonuna tıklar
   └─> RainbowKit modal açılır

3. Cüzdan seçer (MetaMask, WalletConnect, vb.)
   └─> Cüzdan bağlanır
   └─> useAccount() hook'u isConnected = true döner

4. 1 saniye sonra otomatik kayıt başlar (Home.js)
   └─> writeContract() çağrılır
   └─> Toast: "Registration started! Please confirm in your wallet."

5. Kullanıcı MetaMask'ta işlemi onaylar
   └─> Transaction blockchain'e gönderilir
   └─> isPending = true

6. Transaction onaylanır
   └─> isConfirmed = true
   └─> Toast: "Registration successful!"
   └─> navigate('/join') - Görevler sayfasına yönlendirme

7. Join.js sayfası yüklenir
   └─> checkRegistrationStatus() çağrılır
   └─> Backend'den kayıt bilgileri çekilir
   └─> Bilet numarası gösterilir

8. Başarı modalı açılır
   └─> "CONGRATULATIONS!" mesajı
   └─> Bilet numarası gösterilir
   └─> "250 million PAYU coins sent to your wallet"
   └─> "VIEW TASKS" butonu

9. Kullanıcı "VIEW TASKS" tıklar
   └─> Modal kapanır
   └─> Görevler bölümü gösterilir

10. Kullanıcı görevleri tamamlar
    └─> Her görev için handleTaskClick() çağrılır
    └─> Backend'e kaydedilir
```

### 2. ZATEN KAYITLI KULLANICI AKIŞI

```
1. Kullanıcı ana sayfayı ziyaret eder
   └─> Cüzdanı bağlıdır

2. Home.js otomatik kayıt kontrolü
   └─> Backend'den kayıt kontrol edilir
   └─> isRegistered = true

3. Kullanıcı "JOIN THE GIVEAWAY" tıklar
   └─> navigate('/join')

4. Join.js yüklenir
   └─> checkRegistrationStatus() çağrılır
   └─> Backend'den kayıt bilgileri getirilir
   └─> Bilet numarası ve görevler gösterilir
```

### 3. GÖREV TAMAMLAMA AKIŞI

```
1. Kullanıcı görev kartına tıklar (örn: Telegram)
   └─> handleTaskClick('telegram') çağrılır

2. Yeni sekmede URL açılır
   └─> window.open('https://t.me/payu_coin', '_blank')

3. 1 saniye sonra backend'e POST isteği
   └─> POST /api/task-click
   └─> { wallet, platform: 'telegram' }

4. Backend MongoDB'ye kaydeder
   └─> task_clicks collection'ına eklenir

5. Frontend state güncellenir
   └─> setCompletedTasks([...prev, 'telegram'])

6. UI güncellenir
   └─> Görev kartı "COMPLETED ✓" olur
   └─> Bir sonraki görev unlock olur

7. 3 görev tamamlandığında
   └─> Celebration modal açılır
   └─> "+3 Extra Chances" mesajı
```

---

## ⚙️ KURULUM VE KONFİGÜRASYON

### 1. Backend Kurulumu

#### Gereksinimler
```bash
Python 3.8+
MongoDB 4.4+
```

#### Adımlar
```bash
# 1. Klasöre git
cd backend

# 2. Virtual environment oluştur (opsiyonel)
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# 3. Bağımlılıkları yükle
pip install -r requirements.txt

# 4. .env dosyasını düzenle
MONGO_URL="mongodb://localhost:27017"
DB_NAME="payu_giveaway"
CORS_ORIGINS="http://localhost:3000"

# 5. MongoDB'nin çalıştığından emin ol
# Linux/Mac:
sudo systemctl start mongod
# Windows:
net start MongoDB

# 6. Backend'i çalıştır
python server.py
```

**Backend çalışacak:** `http://localhost:8001`

#### requirements.txt İçeriği
```
fastapi==0.103.2
uvicorn==0.23.2
motor==3.3.1
pydantic==2.4.2
python-dotenv==1.0.0
```

### 2. Frontend Kurulumu

#### Gereksinimler
```bash
Node.js 16+
Yarn 1.22+
```

#### Adımlar
```bash
# 1. Klasöre git
cd frontend

# 2. Bağımlılıkları yükle (ilk kez)
yarn install
# Bu ~200MB node_modules indirecek

# 3. .env dosyasını düzenle
REACT_APP_BACKEND_URL=http://localhost:8001
WDS_SOCKET_PORT=443

# 4. Frontend'i çalıştır
yarn start
```

**Frontend çalışacak:** `http://localhost:3000`

### 3. Önemli Konfigürasyonlar

#### Smart Contract Güncelleme
`frontend/src/config/wagmi.js`:
```javascript
export const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS'
export const REGISTRATION_FEE = '980000000000000' // Wei cinsinden
```

#### Admin Wallet Güncelleme
`backend/server.py`:
```python
ADMIN_WALLET = 'YOUR_ADMIN_WALLET_ADDRESS'.lower()
```

#### Backend URL Güncelleme
`frontend/.env`:
```
REACT_APP_BACKEND_URL=YOUR_BACKEND_URL
```

---

## 🗄️ DATABASE YAPISI

### MongoDB Collections

#### 1. registrations
```javascript
{
  _id: ObjectId,
  id: "uuid-string",
  wallet: "0x123...",
  tx_hash: "0xabc...",
  index: 1,
  seed: "0xdef...",
  ticket: "456-789-012",
  reward: "250000000",
  timestamp: 1696248000,
  created_at: ISODate("2025-10-02T12:00:00Z")
}
```

#### 2. task_clicks
```javascript
{
  _id: ObjectId,
  id: "uuid-string",
  user_id: "0x123...",
  platform: "telegram",
  handle: "",
  clicked_at: ISODate("2025-10-02T12:00:00Z")
}
```

#### 3. giveaway_settings
```javascript
{
  _id: "main",
  started: true,
  start_time: ISODate("2025-10-02T12:00:00Z")
}
```

---

## 🌍 ÇOK DİL DESTEĞİ

### Desteklenen Diller
```javascript
const languages = [
  { code: 'en', name: 'English' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'ar', name: 'العربية' },
  { code: 'zh', name: '中文' },
  { code: 'id', name: 'Bahasa Indonesia' }
]
```

### Dil Dosyası Yapısı
`frontend/src/i18n/locales/tr.json`:
```json
{
  "nav": {
    "home": "Ana Sayfa",
    "joinDraw": "Çekilişe Katıl",
    "myEntries": "Biletlerim"
  },
  "hero": {
    "title": "PAYU ÇEKİLİŞİNE KATILIN",
    "subtitle": "ÖDÜLLERİNİZİ ALIN"
  }
}
```

---

## 🔐 GÜVENLİK

### Backend Güvenlik
- ✅ CORS konfigürasyonu
- ✅ Admin wallet kontrolü
- ✅ Input validasyonu (Pydantic)
- ✅ UUID kullanımı (MongoDB ObjectId yerine)

### Frontend Güvenlik
- ✅ Environment variables
- ✅ Smart contract ABI validasyonu
- ✅ Transaction error handling
- ✅ User input sanitization

### Blockchain Güvenlik
- ✅ Payable function (ödeme zorunlu)
- ✅ Event logging
- ✅ Address validation

---

## 📊 PERFORMANS

### Frontend
- Lazy loading
- Code splitting
- Tailwind CSS purging
- Image optimization

### Backend
- Async/await (Motor)
- Connection pooling
- Index optimization

---

## 🐛 SORUN GİDERME

### Backend Sorunları

**Sorun:** MongoDB bağlanamıyor  
**Çözüm:** MongoDB'nin çalıştığından emin olun
```bash
sudo systemctl status mongod
```

**Sorun:** CORS hatası  
**Çözüm:** `.env` dosyasında `CORS_ORIGINS` ayarlayın

### Frontend Sorunları

**Sorun:** Cüzdan bağlanmıyor  
**Çözüm:** 
- MetaMask güncel mi kontrol edin
- BSC network'ünde misiniz kontrol edin
- WalletConnect Project ID doğru mu kontrol edin

**Sorun:** Transaction başarısız  
**Çözüm:**
- Yeterli BNB var mı kontrol edin
- Gas fee ayarlarını kontrol edin
- Contract address doğru mu kontrol edin

---

## 📞 ÖNEMLİ LİNKLER

**BSCScan (Contract Explorer):**
```
https://bscscan.com/address/0x17A0D20Fc22c30a490FB6F186Cf2c31d738B5567
```

**WalletConnect Dashboard:**
```
https://cloud.walletconnect.com/app
Project ID: c1814df663b82b65bb5927ad59566843
```

**RainbowKit Docs:**
```
https://www.rainbowkit.com/docs/introduction
```

**Wagmi Docs:**
```
https://wagmi.sh/react/getting-started
```

---

## 📝 NOTLAR

### Önemli Bilgiler
1. **Registration Fee:** 0.00098 BNB (gas fee dahil değil)
2. **Reward:** 250,000,000 PAYU tokens
3. **Network:** BSC Mainnet only
4. **Admin Wallet:** Küçük harfe çevrilir karşılaştırma için

### Best Practices
- Her zaman test network'ünde test edin
- Private key'leri asla commit etmeyin
- .env dosyalarını .gitignore'a ekleyin
- Smart contract'ı deploy etmeden önce audit edin

---

**Dokümantasyon Tarihi:** Ekim 2025  
**Versiyon:** 1.0  
**Durum:** Production Ready ✅
