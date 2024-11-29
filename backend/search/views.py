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

            if "location" not in data or not data["location"]:
                return JsonResponse({"status": "error", "message": "Missing or invalid location"}, status=400)
            
            # generate attractions
            location = data["location"]
            attractions = GPT.generate_attractions(location)

            # generate a photo for each attraction
            images = []
            for attraction in attractions:
                image = searching.search_photo(attraction)[0]
                images.append(image)

            return JsonResponse({"status": "success", "attractions": attractions, "images": images}, status=200)
        
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"status": "error", "message": "An unexpected error occurred"}, status=500)
    else:
        return JsonResponse({"status": "error", "message": "Invalid request method"}, status=405)
    
@csrf_exempt
def handle_attraction(request):
    if request.method == "GET":
        try:
            data = json.loads(bytes.decode(request.body,"utf-8")) 
            if "attraction" not in data or not data["attraction"]:
                return JsonResponse({"status": "error", "message": "Missing or invalid attraction"}, status=400)
            
            # generate 3 photos ans introduction
            attraction = data["attraction"]
            images = searching.search_photo(attraction)
            introduction = GPT.generate_detail(attraction)

            return JsonResponse({"status": "success", "images" : images, "introduction" : introduction}, status=200)

        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"status": "error", "message": "An unexpected error occurred"}, status=500)
    else:
        return JsonResponse({"status": "error", "message": "Invalid request method"}, status=405)