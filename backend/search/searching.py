import requests
import config

GOOGLE_url = "https://www.googleapis.com/customsearch/v1"
BING_url = "https://api.bing.microsoft.com/v7.0/images/search"

def search_photo_GOOGLE(attraction):
    params = {
        "key": config.GOOGLE_API_KEY,
        "cx": config.GOOGLE_ENGINE_ID,
        "searchType": "image",
        "imgSize": "large",
        "q": attraction,
        "num": 5
    }

    response = requests.get(GOOGLE_url, params=params)

    # handle format
    results =  [item["items"] for item in response.json()["link"][0:3]]
    
    return results

def search_photo_BING(attraction):
    params = {
        "q": attraction,
        'mkt': 'zn-TW',
        'count': 5
    }
    headers = {'Ocp-Apim-Subscription-Key': config.BING_API_KEY}

    response = requests.get(BING_url, headers=headers, params=params)

    # handle format
    results =  [item["contentUrl"] for item in response.json()["value"][0:3]]
    
    return results

def search_photo(attraction):
    if config.SEARCH_ENGINE == "GOOGLE":
        return search_photo_GOOGLE(attraction)
    else:
        return search_photo_BING(attraction)