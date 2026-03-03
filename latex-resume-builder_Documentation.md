### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\types\pdf-parse.d.ts
*Saved at: 3/3/2026, 4:37:26 PM*

**[ADDED]**
```
1     declare module 'pdf-parse' {
2       const pdfParse: (dataBuffer: Buffer) => Promise<{
3         text: string;
4         numpages: number;
5         numrender: number;
6         info: any;
7         metadata: any;
8         version: string;
9       }>;
10      export default pdfParse;
11    }
```

---

