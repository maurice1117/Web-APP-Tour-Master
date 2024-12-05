import asyncio
import config
import aiohttp

GOOGLE_url = "https://www.googleapis.com/customsearch/v1"
BING_url = "https://api.bing.microsoft.com/v7.0/images/search"

async def search_photo_GOOGLE(attraction):
    params = {
        "key": config.GOOGLE_API_KEY,
        "cx": config.GOOGLE_ENGINE_ID,
        "searchType": "image",
        "imgSize": "large",
        "q": attraction,
        "num": 5
    }

    async with aiohttp.ClientSession() as session:
        async with session.get(GOOGLE_url, params=params) as response:
            data = await response.json()
            results = [item["link"] for item in data.get("items", [])[0:3]]
            return results


async def search_photo_BING(attraction):
    params = {
        "q": attraction,
        'mkt': 'zn-TW',
        'count': 5
    }
    headers = {'Ocp-Apim-Subscription-Key': config.BING_API_KEY}

    async with aiohttp.ClientSession() as session:
        async with session.get(BING_url, headers=headers, params=params) as response:
            data = await response.json()
            results = [item["contentUrl"] for item in data.get("value", [])[0:3]]
            return results


async def search_photo(attractions):
    if config.SEARCH_ENGINE == "GOOGLE":
        tasks = [search_photo_GOOGLE(attraction) for attraction in attractions]
        results = await asyncio.gather(*tasks)
    else:
        tasks = [search_photo_BING(attraction) for attraction in attractions]
        results = await asyncio.gather(*tasks)
    
    images1 = []
    images2 = []
    images3 = []
    for result in results:
        images1.append(result[0])
        images2.append(result[1])
        images3.append(result[2])

    return images1, images2, images3