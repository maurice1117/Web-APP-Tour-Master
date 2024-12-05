from django.shortcuts import render
import json
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
from . import GPT
from . import searching
import os
import asyncio

@csrf_exempt
async def handle_location(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            if "location" not in data or not data["location"]:
                return JsonResponse({"status": "error", "message": "Missing or invalid location"}, status=400)
            
            location = data["location"]

            # from location generate attractions
            attractions = GPT.generate_attractions(location)

            # from attractions generate images
            images1, images2, images3 = await searching.search_photo(attractions)

            # from attractions generate introduction
            tasks = [GPT.generate_detail(attraction) for attraction in attractions]
            introductions = await asyncio.gather(*tasks)

            response_data = {"status": "success", "attractions": attractions, "images1": images1, "images2": images2, "images3": images3,"introductions": introductions}

            '''            
            # Corrected path: Save to Web-APP-Tour-Master/frontend/src/assets
            project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
            frontend_path = os.path.join(project_root, "frontend/src/assets")
            os.makedirs(frontend_path, exist_ok=True)
            file_path = os.path.join(frontend_path, "response.json")

            with open(file_path, "w") as f:
                json.dump(response_data, f, indent=4)
            '''
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
    if request.method == "POST":  # 改 POST
        try:
            data = json.loads(request.body)  # 直接讀取 request.body

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
    
    
@csrf_exempt
def delete_response_file(request):
    if request.method == "POST":
        try:
            project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
            file_path = os.path.join(project_root, "frontend", "src", "assets", "response.json")
            
            # 檢查檔案是否存在
            if os.path.exists(file_path):
                os.remove(file_path)
                return JsonResponse({"status": "success", "message": "response.json deleted successfully"}, status=200)
            # 如果文件不存在，不做任何操作，不返回錯誤
            return JsonResponse({"status": "success", "message": "response.json does not exist"}, status=200)

        except Exception as e:
            return JsonResponse({"status": "error", "message": f"Failed to delete file: {str(e)}"}, status=500)
    else:
        return JsonResponse({"status": "error", "message": "Invalid request method"}, status=405)
