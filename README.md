# Web-APP-Tour-Master

## Documents
Figma: https://www.figma.com/design/tme6hVJkQF8VX1knz9TzFi/travelaja-(Community)?node-id=4-61&node-type=canvas

計劃書: https://docs.google.com/document/d/1o4Fp87TqES_GOmm19LGpUfnczWpieiBnfffte0SYhbU/edit?usp=sharing

---

## 終端機執行指令

#### 前端終端機
```
- cd Web-APP-Tour-Master/frontend
- npm install
- npm run dev
```

#### 後端終端機
```
- cd Web-APP-Tour-Master/backend
- pip install -r requirements.txt
- python manage.py migrate
- python manage.py runserver
    - 這裡會出現url，沒意外的話應該長'http://127.0.0.1:8000'
```

## 後端/資料庫管理

#### Superuser
```
- Account: admin
- Password: admin
```


---

## 註冊/登入/登出說明
- 當登入時，系統會生成：一個 access token（30分鐘有效）、一個 refresh token（1天有效）
    - 30分鐘內使用同一個 access token
    - 1天內同個帳號不用重新登入，使用同一個 refresh token（沒登出的情況下一直處於登入狀態）
    - 1天後要重新登入取得新的 access, refresh token
- 在沒有登入的情況下沒辦法切換到 home page，會自動導向 login page

---

## 搜尋頁面說明
- 當輸入欲搜尋地點並按下按鈕，得到的response會存在/frontend/src/assets底下
    - 在已經有response.json的情況下再次輸入欲搜尋地點，會把原本的內容覆蓋掉
- 登出後此檔案(response.json)會被刪除
