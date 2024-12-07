from django.shortcuts import render
import json
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
from . import GPT
from . import searching
import asyncio
# import time

@csrf_exempt
async def handle_location(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            if "location" not in data or not data["location"]:
                return JsonResponse({"status": "error", "message": "Missing or invalid location"}, status=400)
            
            location = data["location"]

            # start_time = time.time()
            # from location generate attractions
            attractions = GPT.generate_attractions(location)
            # print(f"Gen. attractions: {time.time() - start_time:.2f}s")

            # start_time = time.time()
            # from attractions generate images
            images1, images2, images3 = await searching.search_photo(attractions)
            # print(f"Search images: {time.time() - start_time:.2f}s")

            # start_time = time.time()
            # from attractions generate introduction
            tasks = [GPT.generate_detail(attraction) for attraction in attractions]
            introductions = await asyncio.gather(*tasks)
            # print(f"Gen. introductions: {time.time() - start_time:.2f}s")

            response_data = {"status": "success", "attractions": attractions, "images1": images1, "images2": images2, "images3": images3,"introductions": introductions}
            return JsonResponse(response_data, status=200)
        
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"status": "error", "message": "An unexpected error occurred"}, status=500)
    else:
        return JsonResponse({"status": "error", "message": "Invalid request method"}, status=405)
    
'''
Deprecated.
'''
@csrf_exempt
def handle_attraction(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            if "attraction" not in data or not data["attraction"]:
                return JsonResponse({"status": "error", "message": "Missing or invalid attraction"}, status=400)
            
            # generate 3 photos and introduction
            attraction = data["attraction"]
            images = searching.search_photo(attraction)
            introduction = GPT.generate_detail(attraction)

            return JsonResponse({"status": "success", "images" : images, "introduction" : introduction}, status=200)

        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"status": "error", "message": "An unexpected error occurred"}, status=500)
    else:
        return JsonResponse({"status": "error", "message": "Invalid request method"}, status=405)