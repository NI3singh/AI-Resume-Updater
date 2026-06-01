### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\backend\.env
*Saved at: 6/1/2026, 9:19:20 AM*

**[REMOVED]**
```
(from line ~2)
JWT_SECRET=dev-only-secret-please-change-to-a-long-random-string-32chars-min

```
**[ADDED]**
```
2     JWT_SECRET=58974bbde0f798c83fe772dc1a8be3decdef5487b4f6264a4a0c7a81e479de6f
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\backend\.env
*Saved at: 6/1/2026, 9:18:07 AM*

**[REMOVED]**
```
(from line ~1)
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/ai_resume_updater

```
**[ADDED]**
```
1     DATABASE_URL=postgresql+psycopg://postgres:elaunch1234@localhost:5432/ai_resume_updater
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\supabase-schema.sql
*Saved at: 5/29/2026, 5:18:52 PM*

**[ADDED]**
```
109   
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\lib\latexTemplate.ts
*Saved at: 5/29/2026, 4:22:38 PM*

**[REMOVED]**
```
(from line ~109)
      ? `\n\\textbar{\\href{${p.liveUrl}}{\\textcolor{blue!70!black}{Live Link}}}`

```
**[ADDED]**
```
109         ? `\n\\textbar{} {\\href{${p.liveUrl}}{\\textcolor{blue!70!black}{Live Link}}}`
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\lib\latexTemplate.ts
*Saved at: 5/29/2026, 4:22:15 PM*

**[REMOVED]**
```
(from line ~109)
      ? `\n\\textbar{} {\\href{${p.liveUrl}}{\\textcolor{blue!70!black}{Live Link}}}`

```
**[ADDED]**
```
109         ? `\n\\textbar{\\href{${p.liveUrl}}{\\textcolor{blue!70!black}{Live Link}}}`
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\lib\latexTemplate.ts
*Saved at: 5/29/2026, 4:22:02 PM*

**[REMOVED]**
```
(from line ~111)
    return `\\textbf{} {${esc(p.name)}}${techPart}${ghLink}${liveLink}\n${bulletList(p.bullets)}`;

```
**[ADDED]**
```
111       return `\\textbf{${esc(p.name)}}${techPart}${ghLink}${liveLink}\n${bulletList(p.bullets)}`;
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\lib\latexTemplate.ts
*Saved at: 5/29/2026, 4:21:46 PM*

**[REMOVED]**
```
(from line ~111)
    return `\\textbf{] {${esc(p.name)}}${techPart}${ghLink}${liveLink}\n${bulletList(p.bullets)}`;

```
**[ADDED]**
```
111       return `\\textbf{} {${esc(p.name)}}${techPart}${ghLink}${liveLink}\n${bulletList(p.bullets)}`;
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\lib\latexTemplate.ts
*Saved at: 5/29/2026, 4:21:02 PM*

**[REMOVED]**
```
(from line ~111)
    return `\\textbf{${esc(p.name)}}${techPart}${ghLink}${liveLink}\n${bulletList(p.bullets)}`;

```
**[ADDED]**
```
111       return `\\textbf{] {${esc(p.name)}}${techPart}${ghLink}${liveLink}\n${bulletList(p.bullets)}`;
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\lib\latexTemplate.ts
*Saved at: 5/29/2026, 4:20:31 PM*

**[REMOVED]**
```
(from line ~109)
      ? `\n\\textbar{}{\\href{${p.liveUrl}}{\\textcolor{blue!70!black}{Live Link}}}`

```
**[ADDED]**
```
109         ? `\n\\textbar{} {\\href{${p.liveUrl}}{\\textcolor{blue!70!black}{Live Link}}}`
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\lib\latexTemplate.ts
*Saved at: 5/29/2026, 4:20:30 PM*

**[REMOVED]**
```
(from line ~109)
      ? `\n\\textbar{\\href{${p.liveUrl}}{\\textcolor{blue!70!black}{Live Link}}}`

```
**[ADDED]**
```
109         ? `\n\\textbar{}{\\href{${p.liveUrl}}{\\textcolor{blue!70!black}{Live Link}}}`
```

---

### 📄 c:\Users\ELaunch\AppData\Local\Temp\BvSshSftp-20YEH98H\AGUHW7Q2\68QY7PVC\mongo_tool.py
*Saved at: 4/7/2026, 10:13:03 AM*

**[REMOVED]**
```
(from line ~221)
        api_key=openai_api_key,s

```
**[ADDED]**
```
221           api_key=openai_api_key,
```

---

### 📄 c:\Users\ELaunch\AppData\Local\Temp\BvSshSftp-20YEH98H\AGUHW7Q2\68QY7PVC\mongo_tool.py
*Saved at: 4/7/2026, 10:13:02 AM*

**[REMOVED]**
```
(from line ~221)
        api_key=openai_api_key,

```
**[ADDED]**
```
221           api_key=openai_api_key,s
```

---

