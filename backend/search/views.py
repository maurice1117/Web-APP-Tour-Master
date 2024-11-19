from django.shortcuts import render
import json
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
from . import GPT
from . import searching

@csrf_exempt
def handle_location(request):
    if request.method == "GET":
        try:
            data = json.loads(bytes.decode(request.body,"utf-8")) 
            location = data["location"]
            attractions = GPT.generate_attractions(location)
            message = {"attractions" : attractions}
        except Exception as e:
            message = {"status" : "error"}
        return JsonResponse(message)
    
@csrf_exempt
def handle_attraction(request):
    if request.method == "GET":
        try:
            data = json.loads(bytes.decode(request.body,"utf-8")) 
            attraction = data["attraction"]

            img_url = searching.search_photo(attraction)
            introduction = GPT.generate_detail(attraction)
            message = {"image" : img_url, "introduction" : introduction}
        except Exception as e:
            message = {"status" : "error"}
        return JsonResponse(message)