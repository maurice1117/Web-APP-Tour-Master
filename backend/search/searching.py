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
        "num": 10
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
        'count': 10
    }
    headers = {'Ocp-Apim-Subscription-Key': config.BING_API_KEY}

    async with aiohttp.ClientSession() as session:
        async with session.get(BING_url, headers=headers, params=params) as response:
            data = await response.json()
            results = [item["contentUrl"] for item in data.get("value", [])]
            return results


async def search_photo(attractions):
    if config.SEARCH_ENGINE == "GOOGLE":
        tasks = [search_photo_GOOGLE(attraction) for attraction in attractions]
        results = await asyncio.gather(*tasks)
    else:
        tasks = [search_photo_BING(attraction) for attraction in attractions]
        results = await asyncio.gather(*tasks)
    
    vaild_results = await asyncio.gather(*[extract_vaild_images(result) for result in results])

    images1 = []
    images2 = []
    images3 = []
    for vaild_images in vaild_results:
        images1.append(vaild_images[0])
        images2.append(vaild_images[1])
        images3.append(vaild_images[2])

    return images1, images2, images3


async def extract_vaild_images(urls):
    vaild_images = []
    for url in urls:
        if await is_vaild_image(url):
            vaild_images.append(url)
            if len(vaild_images) == 3:
                return vaild_images
    
    while len(vaild_images) < 3:
        vaild_images.append("")
    return vaild_images


async def is_vaild_image(url):
    try:
        async with aiohttp.ClientSession() as session:
            async with session.head(url, timeout=0.5) as response:
                return response.status == 200
    except:
        return False