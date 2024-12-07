import openai
import json
import config
import aiohttp

client = openai.OpenAI(api_key = config.OPENAI_API_KEY)

def generate_attractions(location):

    message = [
        {'role':'system','content': '請根據給定的地點，提供該地區周邊真實且存在的9個旅遊景點名稱，並以JSON格式表示，格式如下：{"attraction": ["景點1", "景點2", ..., "景點9"]}。請勿虛構不存在的景點，並確保每個景點為該地區的熱門旅遊地點。'},
        {'role':'user','content':'台北市'},
        {'role':'assistant','content':'{"attraction": ["台北101","故宮博物院","中正紀念堂","士林夜市","大稻埕碼頭","龍山寺","國父紀念館","木柵動物園","迪化街"]}'},
        {'role':'user','content':location}
    ]

    response = client.chat.completions.create(
        model = config.GPT_MODEL,
        messages = message
    )
    answer = response.choices[0].message.content

    # handle format
    attractions = json.loads(answer)["attraction"]

    return attractions


async def generate_detail(attraction):
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {config.OPENAI_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": config.GPT_MODEL,
        "messages": [
            {'role': 'system', 'content': '請把我當成想要去旅遊的遊客，以繁體中文詳細介紹給定的旅遊景點，並且使用繁體中文以文章說明，不要使用列點式說明'},
            {'role': 'user', 'content': attraction}
        ]
    }
    async with aiohttp.ClientSession() as session:
        async with session.post(url, headers=headers, json=payload) as response:
            result = await response.json()
            return result['choices'][0]['message']['content']