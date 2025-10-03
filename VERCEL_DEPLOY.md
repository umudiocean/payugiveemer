# VERCEL DEPLOYMENT KILAVUZU

## 🚀 VERCEL'E DEPLOY NASIL YAPILIR?

Bu uygulama **%100 blockchain özellikleriyle** Vercel'e deploy edilebilir!

---

## 📋 GEREKSİNİMLER

### 1. Vercel Hesabı
- https://vercel.com adresinden ücretsiz hesap açın
- GitHub ile bağlayın

### 2. MongoDB Atlas (ÜCRETSİZ!)
- https://www.mongodb.com/cloud/atlas/register
- Ücretsiz M0 cluster oluşturun (512MB - yeterli)
- Connection string alın

### 3. GitHub Repository
- Kodları GitHub'a yükleyin

---

## 🔧 ADIM ADIM KURULUM

### ADIM 1: MongoDB Atlas Kurulumu

1. **MongoDB Atlas'a giriş yapın**
   ```
   https://cloud.mongodb.com
   ```

2. **Yeni Cluster Oluştur**
   - "Build a Database" tıklayın
   - **M0 (FREE)** seçin
   - Provider: AWS
   - Region: En yakın bölge (Europe - Frankfurt önerilir)
   - Cluster Name: `payu-giveaway`

3. **Database User Oluştur**
   - Username: `payu_admin`
   - Password: Güçlü bir şifre (kaydedin!)
   - "Create User"

4. **Network Access**
   - "Add IP Address"
   - "Allow Access from Anywhere" → `0.0.0.0/0`
   - Confirm

5. **Connection String Al**
   - "Connect" butonuna tıklayın
   - "Connect your application" seçin
   - Connection string'i kopyalayın:
   ```
   mongodb+srv://payu_admin:<password>@payu-giveaway.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - `<password>` yerine şifrenizi yazın!

---

### ADIM 2: GitHub'a Yükleme

1. **GitHub'da yeni repository oluşturun**
   ```
   Repository name: payu-giveaway
   Public/Private: Seçiminize göre
   ```

2. **Kodları yükleyin**
   ```bash
   # ZIP'i çıkartın
   cd payu-giveaway
   
   # Git init
   git init
   git add .
   git commit -m "Initial commit"
   
   # GitHub'a push
   git remote add origin https://github.com/KULLANICI_ADINIZ/payu-giveaway.git
   git branch -M main
   git push -u origin main
   ```

---

### ADIM 3: Vercel'e Deploy

1. **Vercel Dashboard'a gidin**
   ```
   https://vercel.com/dashboard
   ```

2. **"Add New Project"**
   - "Import Git Repository"
   - GitHub repository'nizi seçin: `payu-giveaway`

3. **Configure Project**
   
   **Framework Preset:** Vite (otomatik algılanır)
   
   **Root Directory:** `.` (varsayılan)
   
   **Build Settings:**
   - Build Command: `cd frontend && yarn install && yarn build`
   - Output Directory: `frontend/build`
   - Install Command: `yarn install`

4. **Environment Variables Ekleyin**

   Şu değişkenleri ekleyin:

   ```env
   # MongoDB Atlas
   MONGO_URL=mongodb+srv://payu_admin:SIFRENIZ@payu-giveaway.xxxxx.mongodb.net/?retryWrites=true&w=majority
   
   # Database
   DB_NAME=payu_giveaway
   
   # Admin Wallet
   ADMIN_WALLET=0xd9C4b8436d2a235A1f7DB09E680b5928cFdA641a
   
   # CORS (Vercel domain'iniz)
   CORS_ORIGINS=https://payu-giveaway.vercel.app
   
   # Frontend Backend URL (Deploy sonrası güncellenecek)
   REACT_APP_BACKEND_URL=https://payu-giveaway.vercel.app
   ```

5. **Deploy!**
   - "Deploy" butonuna tıklayın
   - İlk deploy 2-3 dakika sürer

---

### ADIM 4: Deploy Sonrası Ayarlar

Deploy tamamlandıktan sonra:

1. **URL'nizi alın**
   ```
   https://payu-giveaway.vercel.app
   ```

2. **Environment Variables'ı güncelleyin**
   - Vercel Dashboard → Settings → Environment Variables
   - `REACT_APP_BACKEND_URL` değerini güncelleyin:
   ```
   REACT_APP_BACKEND_URL=https://payu-giveaway.vercel.app
   ```

3. **Redeploy**
   - Deployments sekmesine gidin
   - En son deployment'ın yanındaki "..." → "Redeploy"

---

## 📁 DOSYA YAPISI (Vercel için)

```
payu-giveaway/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env (local test için)
├── backend/
│   ├── server.py
│   └── requirements.txt
├── vercel.json (EKLENDI - Vercel config)
└── VERCEL_DEPLOY.md (Bu dosya)
```

---

## 🔒 GÜVENLİK

### Environment Variables (Vercel Dashboard'da)
```env
MONGO_URL=mongodb+srv://...
DB_NAME=payu_giveaway
ADMIN_WALLET=0xd9C4b8436d2a235A1f7DB09E680b5928cFdA641a
CORS_ORIGINS=https://payu-giveaway.vercel.app
REACT_APP_BACKEND_URL=https://payu-giveaway.vercel.app
```

**ASLA GitHub'a yüklemeyin:**
- MongoDB şifreleri
- Admin wallet private key'leri
- API keys

---

## ✅ DEPLOYMENT KONTROLÜ

Deploy sonrası test edin:

1. **Frontend Test**
   ```
   https://payu-giveaway.vercel.app
   ```
   ✅ Ana sayfa yükleniyor mu?

2. **Backend Test**
   ```
   https://payu-giveaway.vercel.app/api/
   ```
   ✅ "PAYU Draw API - Squid Game Edition" görünüyor mu?

3. **MongoDB Test**
   ```
   https://payu-giveaway.vercel.app/api/giveaway-status
   ```
   ✅ JSON response geliyor mu?

4. **Blockchain Test**
   - Cüzdan bağlayın
   - Kayıt olun
   - Transaction başarılı mı?

---

## 🔄 GÜNCELLEME (Her değişiklikte)

```bash
# Değişikliklerinizi yapın
git add .
git commit -m "Update message"
git push

# Vercel otomatik deploy eder!
```

---

## 💰 MALİYET ANALİZİ

### MongoDB Atlas (FREE)
- ✅ 512MB storage
- ✅ Shared RAM
- ✅ Yeterli bu uygulama için
- ✅ Kredi kartı gerektirmez

### Vercel (FREE)
- ✅ 100GB bandwidth/ay
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Bu uygulama için yeterli

**TOPLAM MALİYET: $0/ay** 🎉

---

## 🐛 SORUN GİDERME

### Sorun 1: Build Failed
**Hata:** "Build failed"

**Çözüm:**
```bash
# Local test
cd frontend
yarn install
yarn build
```
Hata varsa düzeltin, sonra push edin.

### Sorun 2: MongoDB Bağlanamıyor
**Hata:** "MongoServerError: Authentication failed"

**Çözüm:**
1. MongoDB Atlas → Network Access → `0.0.0.0/0` ekli mi?
2. Connection string'de şifre doğru mu?
3. Vercel env variables doğru mu?

### Sorun 3: CORS Hatası
**Hata:** "CORS policy blocked"

**Çözüm:**
```env
# Vercel env variables
CORS_ORIGINS=https://payu-giveaway.vercel.app
```

### Sorun 4: Blockchain Bağlanamıyor
**Hata:** "MetaMask connection failed"

**Çözüm:**
- WalletConnect Project ID doğru mu?
- BSC Network'ü MetaMask'ta ekli mi?
- Contract address doğru mu?

---

## 📊 VERCEL DASHBOARD

**Faydalı Linkler:**
- Dashboard: https://vercel.com/dashboard
- Logs: Project → Deployments → View Function Logs
- Analytics: Project → Analytics
- Settings: Project → Settings

---

## 🎯 ÖZEL DOMAIN (Opsiyonel)

Kendi domain'inizi bağlamak için:

1. **Vercel Dashboard → Settings → Domains**
2. **Domain ekleyin:** `payu-giveaway.com`
3. **DNS ayarlarını yapın** (Vercel otomatik gösterir)
4. **Environment variables güncelleyin:**
   ```env
   CORS_ORIGINS=https://payu-giveaway.com
   REACT_APP_BACKEND_URL=https://payu-giveaway.com
   ```

---

## 🚀 SONUÇ

✅ Uygulamanız şimdi **%100 Vercel'de çalışıyor**!
✅ Blockchain özellikleri **korundu**
✅ MongoDB Atlas **ücretsiz**
✅ Auto-deploy **aktif**
✅ HTTPS **otomatik**
✅ Global CDN **aktif**

**Live URL:** https://payu-giveaway.vercel.app

---

## 📞 DESTEK

Sorun olursa:
1. Vercel Logs kontrol edin
2. MongoDB Atlas Logs kontrol edin
3. Browser Console kontrol edin

**Vercel Docs:** https://vercel.com/docs
**MongoDB Atlas Docs:** https://docs.atlas.mongodb.com

---

**Deploy Tarihi:** Ekim 2025
**Platform:** Vercel + MongoDB Atlas
**Durum:** Production Ready ✅
