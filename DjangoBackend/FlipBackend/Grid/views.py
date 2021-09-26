from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from Grid.models import Review,Issues
from Weights.predict import prediction_final
import os 
import pickle 
import pandas as pd
import numpy as np
from nltk.tokenize import word_tokenize
from nltk import pos_tag
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.preprocessing import LabelEncoder
from collections import defaultdict
from nltk.corpus import wordnet as wn
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import model_selection, naive_bayes, svm

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
    print("category detected is ",category)
    review = Review(customer_name = customerName, order_no = order_No, review_text = feedback,categories_detected = category)
    review.save()
    return JsonResponse({'valid':1})


@csrf_exempt 
def storeIssue(request):
    data = json.loads(request.body)
    print("data for issue is ",data)

    user_id  = data['userId']
    customer_name = data['customerName']
    issue_category =  data['category']
    issue_text = data['issueText']

    issue = Issues(customer_name = customer_name,issue_category = issue_category,issue_text=issue_text)
    issue.save()
    return JsonResponse({'valid':1})
