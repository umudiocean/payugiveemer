# Vercel Serverless Function için gerekli
from fastapi import FastAPI
from mangum import Mangum
import sys
import os

# Backend klasörünü path'e ekle
sys.path.insert(0, os.path.dirname(__file__))

# Server'ı import et
from server import app

# Mangum handler (Vercel için)
handler = Mangum(app)
