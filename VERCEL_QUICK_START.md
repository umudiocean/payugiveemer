# 🚀 VERCEL DEPLOYMENT - HIZLI BAŞLANGIÇ

## 📋 GEREKSİNİMLER
- Vercel hesabı
- GitHub hesabı

---

## 🔧 DEPLOYMENT ADAMLARI

### ADIM 1: GitHub'a Push

```bash
# Git başlat
git init

# Tüm dosyaları ekle
git add .

# Commit
git commit -m "Vercel deployment ready"

# GitHub repo'nuza bağla
git remote add origin https://github.com/KULLANICI_ADINIZ/payu-giveaway.git

# Push
git push -u origin main
```

### ADIM 2: Vercel'de PostgreSQL Oluştur

1. https://vercel.com/dashboard
2. **Storage** sekmesi
3. **Create Database**
4. **Neon Postgres** seçin
5. Database adı: `payu-giveaway-db`
6. Region: En yakın bölge
7. **Create**

✅ Vercel otomatik `DATABASE_URL` environment variable'ını ekler!

### ADIM 3: Vercel'e Project Import

1. Vercel Dashboard → **Add New Project**
2. **Import Git Repository** → GitHub repo'nuzu seçin
3. **Configure Project:**

```
Framework Preset: Other
Root Directory: . (boş bırakın)
Build Command: cd frontend && yarn install && yarn build
Output Directory: frontend/build
Install Command: yarn install
```

### ADIM 4: Environment Variables Ekle

Vercel otomatik PostgreSQL ekleyecek, siz şunları manuel ekleyin:

```env
ADMIN_WALLET=0xd9C4b8436d2a235A1f7DB09E680b5928cFdA641a
CORS_ORIGINS=*
```

**ÖNEMLİ:** `REACT_APP_BACKEND_URL` şimdilik eklemeyin, ilk deploy sonrası ekleyeceğiz!

### ADIM 5: Deploy!

**Deploy** butonuna tıklayın → 2-3 dakika bekleyin

### ADIM 6: URL'i Güncelleyin

Deploy tamamlandıktan sonra:

1. URL'inizi kopyalayın: `https://payu-giveaway-xxxx.vercel.app`

2. **Settings → Environment Variables** → Şunları ekleyin/güncelleyin:

```env
REACT_APP_BACKEND_URL=https://payu-giveaway-xxxx.vercel.app
CORS_ORIGINS=https://payu-giveaway-xxxx.vercel.app
```

3. **Deployments** sekmesi → Son deployment → **⋯** → **Redeploy**

### ADIM 7: Test Edin!

```
https://payu-giveaway-xxxx.vercel.app
```

✅ Ana sayfa yükleniyor mu?
✅ Cüzdan bağlanıyor mu?
✅ Register çalışıyor mu?

---

## ⚙️ VERCEL AYARLARI ÖZET

```
Framework: Other
Root: . (boş)
Build: cd frontend && yarn install && yarn build
Output: frontend/build

Environment Variables:
- DATABASE_URL (otomatik)
- POSTGRES_URL (otomatik)
- ADMIN_WALLET=0xd9C4b8436d2a235A1f7DB09E680b5928cFdA641a
- CORS_ORIGINS=https://YOUR_URL.vercel.app
- REACT_APP_BACKEND_URL=https://YOUR_URL.vercel.app
```

---

## 💰 MALİYET

✅ **$0/ay** - Tamamen ücretsiz!

- Vercel Hosting: FREE
- Vercel PostgreSQL (Neon): FREE
- 100GB bandwidth
- Auto SSL/HTTPS
- Global CDN

---

## 🔄 GÜNCELLEME

Kod değişikliği yaptığınızda:

```bash
git add .
git commit -m "Update message"
git push
```

Vercel otomatik deploy eder! 🚀

---

## 🐛 SORUN GİDERME

### Build Failed
```bash
# Local'de test edin
cd frontend
yarn install
yarn build
```

### Database Connection Error
- Vercel Storage'da PostgreSQL database oluşturduğunuzdan emin olun
- Environment variables kontrol edin

### CORS Error
- `CORS_ORIGINS` URL'inizi içerdiğinden emin olun
- `REACT_APP_BACKEND_URL` doğru mu kontrol edin

---

## 📞 DESTEK

**Vercel Docs:** https://vercel.com/docs
**Vercel PostgreSQL:** https://vercel.com/docs/storage/vercel-postgres

---

**🎉 Kolay gelsin! 5 dakikada live olacak!**
