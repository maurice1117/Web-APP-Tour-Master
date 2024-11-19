import requests
import config

url = "https://www.googleapis.com/customsearch/v1"

def search_photo(attraction):
    params = {
        "key": config.GOOGLE_API_KEY,
        "cx": config.GOOGLE_ENGINE_ID,
        "searchType": "image",
        "imgSize": "large",
        "q": attraction,
        "num": 1
    }

    response = requests.get(url, params=params)

    # handle format
    results = response.json()["items"][0]["link"]
    
    return results
