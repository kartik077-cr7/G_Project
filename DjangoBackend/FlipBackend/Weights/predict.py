# final categories

# category 0 - delivery experience was good
# category 1 - delivery experience was bad
# category 2 - product was good
# category 3 - product was bad/ issues with product
# category 4 - payment experience was good
# category 5 - faced payment related issues
# category 6 - packaging was good
# category 7 - packaging was bad
# category 8 - customer service experience was good
# category 9 - customer service experience was bad

def prediction_final(feedback,tf0,tf1,svm0,svm1):
    
    feedback = [feedback]
    text = tf0.transform(feedback)
    text1 = tf1.transform(feedback)
    
    k = svm0.predict(text)
    k1 = svm1.predict(text1)
   
    
    category = k*2 + k1
    
    return category
