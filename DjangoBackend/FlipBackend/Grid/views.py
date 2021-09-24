from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from Grid.models import Review
from Weights.predict import prediction_final
import os 
import pickle 

path = os.getcwd()+'/Weights'

svm0 = pickle.load(open(path+'/finalized_model0.sav', 'rb'))
svm1= pickle.load(open(path+'/finalized_model1.sav', 'rb'))
tf0 = pickle.load(open(path+'/TFidf_vector0.sav', 'rb'))
tf1 = pickle.load(open(path+'/Tfidf_vector1.sav', 'rb'))

@csrf_exempt 
def storeReview(request):
    data = json.loads(request.body)
    print("data is ",data)
    
    feedback = data['Feedback']
    userId = data['UserId']
    customerName = data['CustomerName']
    order_No = data["OrderNo"]
    category = str(prediction_final(feedback,tf0,tf1,svm0,svm1))
    review = Review(customer_name = customerName, order_no = order_No, review_text = feedback,categories_detected = category)
    review.save()
    return JsonResponse({'valid':1})


@csrf_exempt 
def storeIssue(request):
    data = json.loads(request.body)
    print("data is ",data)

    
    return JsonResponse({'valid':1})
