# TourMaster
基於React.js與Django的旅遊景點推薦網站。  
可根據用戶輸入的地點，以ChatGPT API生成多個推薦的周邊景點，並以Bing Search/Google Search API搜尋景點照片。

## 運行
### 前端
#### 安裝套件
```
npm install
```

#### 啟動
```
npm run dev
```

### 後端
#### 安裝套件
```
pip install -r requirements.txt
```

#### 啟動
```
python manage.py runserver
```
port預設為8000，若有更動需至`frontend/.env`修改URL路徑

### 後端資料庫
程式碼中已包含了測試資料庫，可直接進行存取

#### Superuser
```
- Account: admin
- Password: admin
```

#### 初始化資料庫
移除舊資料庫及用戶頭貼
```
rm db.sqlite3
rm -f media/avatars
```
重新建立資料庫
```
python manage.py migrate
```
設定Superuser
```
python manage.py createsuperuser
```

## 伺服器部署
本專案支援在docker進行部署
```
docker-compose up --build
```

## API KEY相關設定
由於後端串接了ChatGPT API及Bing Search/Google Search API，因此需自行至`backend/config.py`設置API KEY，也可在此處設定要使用Bing還是Google進行圖片搜尋  

(Bing的圖片品質較佳但需付費，Google則每天皆有免費額度)

## 註冊/登入/登出說明
- 當登入時，系統會生成：一個 access token（30分鐘有效）、一個 refresh token（1天有效）
    - 30分鐘內使用同一個 access token
    - 1天內同個帳號不用重新登入，使用同一個 refresh token（沒登出的情況下一直處於登入狀態）
    - 1天後要重新登入取得新的 access, refresh token
- 在沒有登入的情況下沒辦法切換到 home page，會自動導向 login page
