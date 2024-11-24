# Web-APP-Tour-Master

## Documents
Figma: https://www.figma.com/design/tme6hVJkQF8VX1knz9TzFi/travelaja-(Community)?node-id=4-61&node-type=canvas

計劃書: https://docs.google.com/document/d/1o4Fp87TqES_GOmm19LGpUfnczWpieiBnfffte0SYhbU/edit?usp=sharing

---

## 終端機執行指令

#### 前端終端機
```
- cd Web-APP-Tour-Master/frontend
- 創建.env檔案
    - 內容：VITE_API_URL = 'http://127.0.0.1:8000'
    - ps. 這裡url會根據後端終端機的url改變
- npm install
- npm run dev
```

#### 後端終端機
```
- cd Web-APP-Tour-Master/backend
- python manage.py migrate
- python manage.py runserver
    - 這裡會出現url，沒意外的話應該長'http://127.0.0.1:8000'
```




---

## 註冊/登入/登出說明
- 當登入時，系統會生成：一個 access token（30分鐘有效）、一個 refresh token（1天有效）
    - 30 分鐘內同個帳號不用重新登入（沒登出的情況下一直處於登入狀態）
    - 帳號有效時間為1天，1天後要重新註冊
- 在沒有登入的情況下沒辦法切換到 home page，會自動導向 login page
