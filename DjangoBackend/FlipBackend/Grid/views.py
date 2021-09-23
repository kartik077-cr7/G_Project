from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from Grid.models import Review

@csrf_exempt 
def storeReview(request):
    data = json.loads(request.body)
    print("data is ",data)
    
    feedback = data['Feedback']
    userId = data['UserId']
    customerName = data['CustomerName']
    order_No = data["OrderNo"]
    review = Review(customer_name = customerName, order_no = order_No, review_text = feedback,categories_detected = "1 2")
    print("review is ",review)
    review.save()
    return JsonResponse({'valid':1})


@csrf_exempt 
def storeIssue(request):
    data = json.loads(request.body)
    print("data is ",data)

    
    return JsonResponse({'valid':1})