# API reference
## search
### get attractions
根據輸入地點，生成9個旅遊景點，並且對於每個景點各自生成一張照片  
Url: `search/location`  
Method: `GET`  

#### params
location: string

#### response
status: success/error  
attractions: array[9] of string  
images: array[9] of string(url)  
(attractions和images按照順序1-1對應)

### get introduction
根據旅遊景點，生成3張照片及介紹  
Url: `search/attraction`  
Method: `GET`  
#### params
atrraction: string  

#### response
status: success/error  
images: array[3] of string(url)  
introduction: string  
