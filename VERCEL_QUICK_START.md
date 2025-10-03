# PAYU GIVEAWAY - Vercel Quick Start Guide 🚀

## 📦 Vercel Deployment (Premium Account)

Bu kılavuz, PAYU Giveaway uygulamasını Vercel Premium hesabınızda hızlıca deploy etmenizi sağlar.

## 🎯 Özellikler

- ✅ **Sadece İngilizce** - Çoklu dil desteği kaldırıldı
- ✅ **PostgreSQL** - Vercel Neon database
- ✅ **Vercel Functions** - Backend API
- ✅ **Static Frontend** - React build
- ✅ **Premium Performance** - Vercel Pro features

## 🚀 Hızlı Deployment

### 1. GitHub Repository Hazırlığı

```bash
# Repository'yi klonlayın
git clone https://github.com/umudiocean/payugiveemer.git
cd payugiveemer

# Vercel CLI kurulumu
npm i -g vercel
```

### 2. Vercel'de Proje Oluşturma

```bash
# Vercel'e login
vercel login

# Proje deploy et
vercel

# Production'a deploy
vercel --prod
```

### 3. PostgreSQL Database (Vercel Neon)

1. **Vercel Dashboard** → **Storage** → **Create Database**
2. **Neon PostgreSQL** seçin
3. Database adı: `payu-giveaway`
4. Region: En yakın region

### 4. Environment Variables

Vercel Dashboard → **Settings** → **Environment Variables**:

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Admin
ADMIN_WALLET=0xd9C4b8436d2a235A1f7DB09E680b5928cFdA641a

# CORS
CORS_ORIGINS=https://your-domain.vercel.app

# Frontend
REACT_APP_BACKEND_URL=https://your-domain.vercel.app/api
```

## 🛠 Teknik Detaylar

### Backend (Vercel Functions)

- **Framework:** FastAPI
- **Database:** PostgreSQL (Neon)
- **Runtime:** Python 3.9
- **Location:** `/api/*` routes

### Frontend (Static Build)

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Web3:** RainbowKit + Wagmi

### Database Schema

```sql
-- Registrations table
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet VARCHAR(42) UNIQUE NOT NULL,
    tx_hash VARCHAR(66) NOT NULL,
    index INTEGER NOT NULL,
    seed VARCHAR(66) NOT NULL,
    ticket VARCHAR(20) NOT NULL,
    reward VARCHAR(20) NOT NULL,
    timestamp BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Task clicks table
CREATE TABLE task_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(42) NOT NULL,
    platform VARCHAR(20) NOT NULL,
    handle VARCHAR(50),
    clicked_at TIMESTAMP DEFAULT NOW()
);

-- Giveaway settings table
CREATE TABLE giveaway_settings (
    id VARCHAR(10) PRIMARY KEY DEFAULT 'main',
    started BOOLEAN DEFAULT FALSE,
    start_time TIMESTAMP
);
```

## 📁 Proje Yapısı

```
/
├── backend/
│   ├── server.py          # FastAPI backend
│   ├── requirements.txt   # Python dependencies
│   └── database.py        # PostgreSQL connection
├── frontend/
│   ├── src/
│   │   ├── pages/         # React pages (EN only)
│   │   ├── components/    # UI components
│   │   └── config/        # Wagmi config
│   ├── package.json       # Node dependencies
│   └── vite.config.js     # Vite config
├── vercel.json           # Vercel configuration
└── README.md
```

## 🔧 Customization

### Smart Contract

`frontend/src/config/wagmi.js`:
```javascript
export const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS'
export const REGISTRATION_FEE = '980000000000000' // 0.00098 BNB
```

### Admin Wallet

`backend/server.py`:
```python
ADMIN_WALLET = 'YOUR_ADMIN_WALLET_ADDRESS'
```

## 🎮 Kullanım Akışı

1. **Ana Sayfa** → "JOIN THE GIVEAWAY"
2. **Cüzdan Bağla** → MetaMask/WalletConnect
3. **Otomatik Kayıt** → Smart contract interaction
4. **Bilet Al** → Unique ticket generation
5. **Görevler** → Social media tasks
6. **Admin Panel** → Management dashboard

## 💰 Maliyet

**Vercel Premium:**
- ✅ Unlimited deployments
- ✅ Custom domains
- ✅ Advanced analytics
- ✅ Priority support

**Database (Neon):**
- ✅ Free tier: 500MB
- ✅ Pro tier: 10GB+ (if needed)

## 🐛 Sorun Giderme

### Database Connection
```bash
# Test connection
vercel env pull .env.local
python backend/test_db.py
```

### Build Errors
```bash
# Clear cache
vercel --force

# Check logs
vercel logs
```

### Frontend Issues
```bash
# Local test
cd frontend
npm run build
npm run preview
```

## 📞 Destek

- **Vercel Docs:** https://vercel.com/docs
- **Neon Docs:** https://neon.tech/docs
- **Project Issues:** GitHub Issues

## 🎯 Next Steps

1. ✅ Deploy to Vercel
2. ✅ Setup PostgreSQL database
3. ✅ Configure environment variables
4. ✅ Test all features
5. ✅ Custom domain (optional)
6. ✅ Analytics setup (optional)

---

**Deployment Status:** ✅ Ready for Vercel Premium  
**Database:** ✅ PostgreSQL (Neon)  
**Language:** ✅ English Only  
**Performance:** ✅ Optimized for Vercel  

**Developed with ❤️ for Vercel Premium**
