# VERCEL DEPLOYMENT - PostgreSQL İLE

## 🎯 ÖNEMLİ BİLGİ

Bu uygulama **local'de MongoDB ile çalışıyor** ama **Vercel'de PostgreSQL (Neon) ile çalışacak şekilde hazırlandı**.

**Neden?**
- Vercel'de MongoDB Atlas bağlantısı yavaş
- Vercel'in native PostgreSQL (Neon) daha hızlı
- Vercel PostgreSQL ücretsiz ve kolay

---

## 📦 DOSYALAR

```
backend/
├── server.py              # MongoDB versiyonu (local için)
├── server_postgresql.py   # PostgreSQL versiyonu (Vercel için)
└── api/
    └── index.py           # Vercel serverless handler
```

---

## 🚀 VERCEL'E DEPLOY

### ADIM 1: Vercel PostgreSQL Oluştur

1. **Vercel Dashboard'a git:** https://vercel.com/dashboard
2. **Storage sekmesine tıkla**
3. **"Create Database"**
4. **"Neon Postgres"** seçin
5. **Database adı:** `payu-giveaway-db`
6. **Region:** En yakın bölge
7. **Create**

✅ Vercel otomatik olarak environment variables'ları projenize ekleyecek:
- `DATABASE_URL`
- `POSTGRES_URL`
- `POSTGRES_URL_NON_POOLING`
- Ve diğerleri...

### ADIM 2: Backend Dosyasını Değiştir

Deployment öncesi `server_postgresql.py` dosyasını `server.py` olarak değiştirin:

```bash
# Local yedek
mv backend/server.py backend/server_mongodb.py

# PostgreSQL versiyonunu aktif et
mv backend/server_postgresql.py backend/server.py
```

### ADIM 3: GitHub'a Push

```bash
git add .
git commit -m "Vercel PostgreSQL ready"
git push
```

### ADIM 4: Vercel Import

1. **Vercel Dashboard → Add New Project**
2. **GitHub repo'nuzu seçin**
3. **Configure Project:**
   - Framework: **Other**
   - Root Directory: **.**
   - Build Command: `cd frontend && yarn install && yarn build`
   - Output Directory: `frontend/build`

### ADIM 5: Environment Variables Ekle

Vercel otomatik PostgreSQL env var'larını ekledi ama şunları da manuel ekleyin:

```env
ADMIN_WALLET=0xd9C4b8436d2a235A1f7DB09E680b5928cFdA641a
CORS_ORIGINS=*
REACT_APP_BACKEND_URL=https://PROJE_ADINIZ.vercel.app
```

### ADIM 6: Deploy!

"Deploy" butonuna tıklayın → 2-3 dakika → ✅ Live!

---

## 🔄 LOCAL GELIŞTIRME

Local'de MongoDB ile çalışmaya devam edin:

```bash
# MongoDB versiyonunu kullan
mv backend/server.py backend/server_postgresql.py
mv backend/server_mongodb.py backend/server.py

# MongoDB'yi başlat
sudo systemctl start mongod

# Backend başlat
cd backend && python server.py
```

---

## 📝 ÖNEMLI NOTLAR

### Database Geçişi

Vercel'de ilk deploy'da tablolar otomatik oluşur:
```sql
CREATE TABLE registrations (...)
CREATE TABLE task_clicks (...)
CREATE TABLE giveaway_settings (...)
```

Mevcut MongoDB verilerinizi taşımak isterseniz:

1. **MongoDB'den export:**
```bash
mongoexport --db=payu_giveaway --collection=registrations --out=registrations.json
```

2. **PostgreSQL'e import:** (Manuel SQL INSERT gerekir)

### İki Veritabanı Versiyonu

- **Local:** `server.py` → MongoDB
- **Vercel:** `server_postgresql.py` → PostgreSQL

Deployment öncesi dosya isimlerini değiştirmeyi unutmayın!

---

## ✅ VERCEL DEPLOYMENT KONTROLÜ

Deploy sonrası test edin:

```bash
# Health check
curl https://PROJE_ADINIZ.vercel.app/health

# Response:
# {"status": "healthy", "database": "connected"}
```

---

## 🎯 ÖZET

1. ✅ Local: MongoDB ile çalışıyor
2. ✅ Vercel: PostgreSQL hazır (server_postgresql.py)
3. ✅ Blockchain özellikler korundu
4. ✅ Vercel'e deploy hazır

**Vercel'e deploy ederken `server_postgresql.py` → `server.py` yapmayı unutmayın!**
