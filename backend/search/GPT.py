import openai
import json
import config

client = openai.OpenAI(api_key = config.OPENAI_API_KEY)

def generate_attractions(location):

    message = [{'role':'system','content':'請根據給定的地點，提供周邊的5個旅遊景點名稱，並以JSON格式表示，格式如下：{"attraction": ["景點1", "景點2", ..., "景點10"]}。"'}]

    # example
    message.append({'role':'user','content':'台北市'})
    message.append({'role':'assistant','content':'{"attraction": ["台北101","故宮博物院","中正紀念堂","士林夜市","大稻埕碼頭"]}'})

    message.append({'role':'user','content':location})

    response = client.chat.completions.create(
        model="gpt-4o",
        messages = message
    )
    answer = response.choices[0].message.content

    # handle format
    attractions = json.loads(answer)["attraction"]

    return attractions

def generate_detail(attraction):
    message = [{'role':'system','content':'請把我當成想要去旅遊的遊客，詳細介紹給定的旅遊景點。以文章說明，不要使用列點式說明'}]

    message.append({'role':'user','content':attraction})

    response = client.chat.completions.create(
        model="gpt-4o",
        messages = message
    )
    answer = response.choices[0].message.content

    return answer