### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:17:15 AM*

**[REMOVED]**
```
(from line ~31)
    nebius_api_key: str = "v1..AAAAAAAAAAGfSz71xUJPKJZK3Rk0c7F1G9wfQWQx403pVptwk973bMHM0LSCl-nyHR9UlBT3nHDXllGirPPUugom1F5QFEUC"

```
**[ADDED]**
```
31        nebius_api_key: str = os.getenv("NEBIUS_API_KEY")
```

---

### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:17:11 AM*

**[REMOVED]**
```
(from line ~31)
    nebius_api_key: str = "v1.CmQKHHN0YXRpY2tleS1lMDBrZGV5cGo3NzAxOGVmeHASIXNlcnZpY2VhY2NvdW50LWUwMGp2cWQ0M2U4cmhhNDJ0eDIMCOL9oNEGEJnirMgCOgwI34C5nAcQwLjYhwJAAloDZTAw.AAAAAAAAAAGfSz71xUJPKJZK3Rk0c7F1G9wfQWQx403pVptwk973bMHM0LSCl-nyHR9UlBT3nHDXllGirPPUugom1F5QFEUC"

```
**[ADDED]**
```
31        nebius_api_key: str = "v1..AAAAAAAAAAGfSz71xUJPKJZK3Rk0c7F1G9wfQWQx403pVptwk973bMHM0LSCl-nyHR9UlBT3nHDXllGirPPUugom1F5QFEUC"
```

---

### 📄 d:\AI-Resume-Updater\backend\.env
*Saved at: 6/12/2026, 10:16:40 AM*

**[REMOVED]**
```
(from line ~35)
NEBIUS_API_KEY=

```
**[ADDED]**
```
35    NEBIUS_API_KEY=v1.CmQKHHN0YXRpY2tleS1lMDBrZGV5cGo3NzAxOGVmeHASIXNlcnZpY2VhY2NvdW50LWUwMGp2cWQ0M2U4cmhhNDJ0eDIMCOL9oNEGEJnirMgCOgwI34C5nAcQwLjYhwJAAloDZTAw.AAAAAAAAAAGfSz71xUJPKJZK3Rk0c7F1G9wfQWQx403pVptwk973bMHM0LSCl-nyHR9UlBT3nHDXllGirPPUugom1F5QFEUC
```

---

### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:16:22 AM*

**[REMOVED]**
```
(from line ~31)
    nebius_api_key: str = os.getenv("NEBIUS_API_KEY")

```
**[ADDED]**
```
31        nebius_api_key: str = "v1.CmQKHHN0YXRpY2tleS1lMDBrZGV5cGo3NzAxOGVmeHASIXNlcnZpY2VhY2NvdW50LWUwMGp2cWQ0M2U4cmhhNDJ0eDIMCOL9oNEGEJnirMgCOgwI34C5nAcQwLjYhwJAAloDZTAw.AAAAAAAAAAGfSz71xUJPKJZK3Rk0c7F1G9wfQWQx403pVptwk973bMHM0LSCl-nyHR9UlBT3nHDXllGirPPUugom1F5QFEUC"
```

---

### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:16:20 AM*

**[REMOVED]**
```
(from line ~31)
    nebius_api_key: str = "v1.CmQKHHN0YXRpY2tleS1lMDBrZGV5cGo3NzAxOGVmeHASIXNlcnZpY2VhY2NvdW50LWUwMGp2cWQ0M2U4cmhhNDJ0eDIMCOL9oNEGEJnirMgCOgwI34C5nAcQwLjYhwJAAloDZTAw.AAAAAAAAAAGfSz71xUJPKJZK3Rk0c7F1G9wfQWQx403pVptwk973bMHM0LSCl-nyHR9UlBT3nHDXllGirPPUugom1F5QFEUC"

```
**[ADDED]**
```
31        nebius_api_key: str = os.getenv("NEBIUS_API_KEY")
```

---

### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:16:10 AM*

**[REMOVED]**
```
(from line ~22)
    cookie_secure: bool = os.getenv("COOKIE_SECURE")

```
**[ADDED]**
```
22        cookie_secure: bool = os.getenv("COOKIE_SECURE") == "true"
```

---

### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:16:06 AM*

**[REMOVED]**
```
(from line ~22)
    cookie_secure: bool = os.getenv("COOKIE_SECURE") == "true"

```
**[ADDED]**
```
22        cookie_secure: bool = os.getenv("COOKIE_SECURE")
```

---

### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:15:58 AM*

**[REMOVED]**
```
(from line ~22)
    cookie_secure: bool = False

```
**[ADDED]**
```
22        cookie_secure: bool = os.getenv("COOKIE_SECURE") == "true"
```

---

### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:15:48 AM*

**[REMOVED]**
```
(from line ~19)
    frontend_origin: str = "http://127.0.0.1:3000,http://localhost:3000"

```
**[ADDED]**
```
19        frontend_origin: str = os.getenv("FRONTEND_ORIGIN")
```

---

### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:15:45 AM*

**[REMOVED]**
```
(from line ~14)
    jwt_secret: str = "change-me-in-env"

```
**[ADDED]**
```
14        jwt_secret: str = os.getenv("JWT_SECRET")
```

---

### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:15:38 AM*

**[ADDED]**
```
3     import os
4     
```

---

### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:15:36 AM*

**[REMOVED]**
```
(from line ~9)
    database_url: str = os.getenv(DATABASE_URL")

```
**[ADDED]**
```
9         database_url: str = os.getenv("DATABASE_URL")
```

---

### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:15:34 AM*

**[REMOVED]**
```
(from line ~9)
    database_url: str = os.getenv(DATABASE_URL)

```
**[ADDED]**
```
9         database_url: str = os.getenv(DATABASE_URL")
```

---

### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:15:32 AM*

**[REMOVED]**
```
(from line ~9)
    database_url: str = os.getenv(DATABASE_URL

```
**[ADDED]**
```
9         database_url: str = os.getenv(DATABASE_URL)
```

---

### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:15:30 AM*

**[REMOVED]**
```
(from line ~9)
    database_url: str = os.getenv(DATABASE_URL"

```
**[ADDED]**
```
9         database_url: str = os.getenv(DATABASE_URL
```

---

### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:15:28 AM*

**[REMOVED]**
```
(from line ~9)
    database_url: str = os.getenv("DATABASE_URL"

```
**[ADDED]**
```
9         database_url: str = os.getenv(DATABASE_URL"
```

---

### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:15:23 AM*

**[REMOVED]**
```
(from line ~9)
    database_url: str = os.getenv("DATABASE_URL", "postgresql+psycopg://postgres:password@localhost:5432/resume_db")

```
**[ADDED]**
```
9         database_url: str = os.getenv("DATABASE_URL"
```

---

### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:15:16 AM*

**[REMOVED]**
```
(from line ~9)
    database_url: str = os

```
**[ADDED]**
```
9         database_url: str = os.getenv("DATABASE_URL", "postgresql+psycopg://postgres:password@localhost:5432/resume_db")
```

---

### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:15:14 AM*

**[REMOVED]**
```
(from line ~9)
    database_url: str = 

```
**[ADDED]**
```
9         database_url: str = os
```

---

### 📄 d:\AI-Resume-Updater\backend\app\config.py
*Saved at: 6/12/2026, 10:15:11 AM*

**[REMOVED]**
```
(from line ~9)
    database_url: str = "postgresql+psycopg://postgres:elaunch123456789@localhost:5432/ai_resume_updater"

```
**[ADDED]**
```
9         database_url: str = 
```

---

### 📄 d:\AI-Resume-Updater\frontend\.env.local
*Saved at: 6/10/2026, 7:19:27 PM*

**[REMOVED]**
```
(from line ~5)
BACKEND_ORIGIN=http://127.0.0.1:8001
```
**[ADDED]**
```
5     BACKEND_ORIGIN=http://127.0.0.1:8000
```

---

### 📄 d:\gate-pdfs\kit\README.md
*Saved at: 6/10/2026, 2:38:55 PM*

**[REMOVED]**
```
(from line ~30)
- A running header (`GATE DA · <subject>` / `<topic>`) and page numbers.

```
**[ADDED]**
```
30    - A running header (`GATE CS · <subject>` / `<topic>`) and page numbers.
```

---

### 📄 d:\gate-pdfs\kit\README.md
*Saved at: 6/10/2026, 2:38:23 PM*

**[REMOVED]**
```
(from line ~21)
# -> Topic_3_Differentiability.pdf

```
**[ADDED]**
```
21    # -> Topic_5_Routing_Protocols.pdf
```

---

### 📄 d:\gate-pdfs\kit\README.md
*Saved at: 6/10/2026, 2:38:19 PM*

**[REMOVED]**
```
(from line ~21)
# -> Routing_Protocols.pdf

```
**[ADDED]**
```
21    # -> Topic_3_Differentiability.pdf
```

---

### 📄 d:\gate-pdfs\kit\README.md
*Saved at: 6/10/2026, 2:38:18 PM*

**[REMOVED]**
```
(from line ~21)
# -> Topic_3_Differentiability.pdf

```
**[ADDED]**
```
21    # -> Routing_Protocols.pdf
```

---

### 📄 d:\gate-pdfs\kit\README.md
*Saved at: 6/10/2026, 2:38:10 PM*

**[REMOVED]**
```
(from line ~20)
./make_pdf.sh  Topic_5_Routing_Protocols.md  "Calculus & Optimization"  "Topic 5 — Routing Protocols"

```
**[ADDED]**
```
20    ./make_pdf.sh  Topic_5_Routing_Protocols.md  "Computer Networks"  "Topic 5 — Routing Protocols"
```

---

### 📄 d:\gate-pdfs\kit\README.md
*Saved at: 6/10/2026, 2:38:00 PM*

**[REMOVED]**
```
(from line ~20)
./make_pdf.sh  Topic_5_Routing_Protocols.md  "Calculus & Optimization"  "Topic 3 — Routing Protocols"

```
**[ADDED]**
```
20    ./make_pdf.sh  Topic_5_Routing_Protocols.md  "Calculus & Optimization"  "Topic 5 — Routing Protocols"
```

---

### 📄 d:\gate-pdfs\kit\README.md
*Saved at: 6/10/2026, 2:37:57 PM*

**[REMOVED]**
```
(from line ~20)
./make_pdf.sh  Topic_5_Routing_Protocols.md  "Calculus & Optimization"  "Topic 3 — Routing_Protocols"

```
**[ADDED]**
```
20    ./make_pdf.sh  Topic_5_Routing_Protocols.md  "Calculus & Optimization"  "Topic 3 — Routing Protocols"
```

---

### 📄 d:\gate-pdfs\kit\README.md
*Saved at: 6/10/2026, 2:37:54 PM*

**[REMOVED]**
```
(from line ~20)
./make_pdf.sh  Topic_5_Routing_Protocols.md  "Calculus & Optimization"  "Topic 3 — Differentiability"

```
**[ADDED]**
```
20    ./make_pdf.sh  Topic_5_Routing_Protocols.md  "Calculus & Optimization"  "Topic 3 — Routing_Protocols"
```

---

### 📄 d:\gate-pdfs\kit\README.md
*Saved at: 6/10/2026, 2:37:42 PM*

**[REMOVED]**
```
(from line ~20)
./make_pdf.sh  Topic_3_Differentiability.md  "Calculus & Optimization"  "Topic 3 — Differentiability"

```
**[ADDED]**
```
20    ./make_pdf.sh  Topic_5_Routing_Protocols.md  "Calculus & Optimization"  "Topic 3 — Differentiability"
```

---

### 📄 d:\gate-pdfs\kit\README.md
*Saved at: 6/10/2026, 2:36:18 PM*

**[REMOVED]**
```
(from line ~1)
# GATE DA — Notes → styled PDF kit

```
**[ADDED]**
```
1     # GATE CS — Notes → styled PDF kit
```

---

### 📄 d:\gate-pdfs\README.md
*Saved at: 6/10/2026, 2:35:37 PM*

**[REMOVED]**
```
(from line ~1)
# GATE DA — Styled Notes (PDF)

```
**[ADDED]**
```
1     # GATE CS — Styled Notes (PDF)
```

---

