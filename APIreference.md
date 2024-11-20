# API reference
## search
### get attractions
根據輸入地點，生成多個旅遊景點  
Url: `search/location`  
Method: `GET`  

#### params
location: string

#### response
attractions: array of string

### get introduction
根據旅遊景點，生成照片及介紹  
Url: `search/attraction`  
Method: `GET`  
#### params
atrraction: string  

#### response
image: string(url)  
introduction: string  
