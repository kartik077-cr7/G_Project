from django.db import models

class Issues(models.Model):
    customer_name = models.CharField(max_length=100)
    issue_category =  models.CharField(max_length=100)
    issue_text = models.TextField()
    date_posted = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.customer_name+' '+self.issue_category+' '+self.issue_text

class Review(models.Model):
    customer_name = models.CharField(max_length=100)
    order_no = models.IntegerField()
    review_text = models.TextField()
    categories_detected = models.CharField(max_length=100)

    def __str__(self):
        return self.customer_name+' '+str(self.order_no)+' '+self.review_text+' '+self.categories_detected