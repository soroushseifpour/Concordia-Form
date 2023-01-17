import json
from flask import Flask, jsonify
from flask_pymongo import PyMongo, pymongo
from flask_restful import Resource, Api

from bson.objectid import ObjectId
import bson.json_util as json_util



def surveyAPI(app,db):
    # Api Configuration
    api = Api(app)

    # Defining different classes for our API
    # Information about our API
    class info(Resource):
        def get(self):
            information = {}
            information['basicInfo'] = "This is the restful API for Cloud Computing project. Here, you can retrive the surveys information with their results. In addition, you can access to the analytics of these serveys, such as the age range of participant."
            information['usefulURL'] = "[endpoint]/api/:formID/, [endpoint]/api/:formID/:questionID, [endpoint]/api/:formID/age, [endpoint]/api/:formID/gender, [endpoint]/api/:formID/date"
            return json.loads(json_util.dumps(information))


    class form(Resource):
        def get(self,user_id,form_id, question_id=None):
            user = db.user.find_one({"_id":ObjectId(str(user_id))},{"_id":1})
            creator = db.form.find_one({"userId":ObjectId(str(user_id))},{"_id":0,"userId":1})
            if user and creator:
                form=db.form.find_one({"_id":ObjectId(str(form_id))})
                return json.loads(json_util.dumps({"response":form}))
            else:
                return {"response": "Permission Denied!!!"}

    class question(Resource):
        def get(self,user_id,form_id, question_id=None):
            user = db.user.find_one({"_id":ObjectId(str(user_id))},{"_id":1})
            creator = db.form.find_one({"userId":ObjectId(str(user_id))},{"_id":0,"userId":1})
            if user and creator:
                if question_id is not None:
                    questions = db.form.find_one({"_id":ObjectId(str(form_id))},{"questions":1,"_id":0})
                    result=questions['questions'][int(question_id)]['question']
                    return json.loads(json_util.dumps({"response":result}))
                else:
                    questions = db.form.find_one({"_id":ObjectId(str(form_id))},{"questions":1,"_id":0})
                    result={}
                    for i in range(len(questions['questions'])):
                        result['question '+str(i+1)]=questions['questions'][i]['question']
                    return json.loads(json_util.dumps({"response":result}))
            else:
                return {"response": "Permission Denied!!!"}
    
    class age(Resource):
        def get(self,user_id,form_id):
            user = db.user.find_one({"_id":ObjectId(str(user_id))},{"_id":1})
            creator = db.form.find_one({"userId":ObjectId(str(user_id))},{"_id":0,"userId":1})
            if user and creator:
                userIds=db.answer.find({"formID":form_id},{"userID":1,"_id":0})
                ageQuery=[]
                if userIds:
                    for userId in userIds:
                        userAge=db.user.find_one({"_id":ObjectId(str(userId['userID']))},{"_id":0,"age":1})
                        if userAge:
                            ageQuery.append(userAge['age'])
                    return json.loads(json_util.dumps({"response":ageQuery}))
            else:
                return {"response": "Permission Denied!!!"}

    class gender(Resource):
        def get(self,user_id,form_id):
            user = db.user.find_one({"_id":ObjectId(str(user_id))},{"_id":1})
            creator = db.form.find_one({"userId":ObjectId(str(user_id))},{"_id":0,"userId":1})
            print(user,creator,user_id)
            if user and creator:
                # genderQuery=db.answer.aggregate([{"$match" :{"formID": form_id}},{"$group":{"_id":"$gender","count":{"$sum":1}}}])
                userIds=db.answer.find({"formID":form_id},{"userID":1,"_id":0})
                genderQuery=[]
                # genderQuery = db.answer.aggregate([{"$match" :{"formID": form_id}},
                # {"$lookup": {"from": "user", "localField":"userID", "foreignField": "_id", "as":"user_detail"}, "pipeline": [{"$match":{"_id":"userID"}}, {"$group":{"gender":"$gender","count":{"$sum":1}}}]}])
                #{"$group":{"gender":"$gender","count":{"$sum":1}}}])
                print([i for i in genderQuery])
                for userId in userIds:
                    userGender=db.user.find_one({"_id":ObjectId(str(userId['userID']))},{"_id":0,"gender":1})
                    #userGender=db.user.aggregate([{"$match" :{"_id": ObjectId(str(userId))}},{"$group":{"gender":"$gender","count":{"$sum":1}}}])
                    if userGender:
                        genderQuery.append(userGender['gender'])
                return json.loads(json_util.dumps({"response":genderQuery}))    
            else:
                return {"response": "Permission Denied!!!"} 

    class country(Resource):
        def get(self,user_id,form_id):
            user = db.user.find_one({"_id":ObjectId(str(user_id))},{"_id":1})
            creator = db.form.find_one({"userId":ObjectId(str(user_id))},{"_id":0,"userId":1})
            if user and creator:
                userIds=db.answer.find({"formID":form_id},{"userID":1,"_id":0})
                countryQuery=[]
                if userIds:
                    for userId in userIds:
                        userCountry=db.user.find_one({"_id":ObjectId(str(userId['userID']))},{"_id":0,"country":1})
                        if userCountry:
                            countryQuery.append(userCountry['country'])
                    return json.loads(json_util.dumps({"response":countryQuery}))
            else:
                return {"response": "Permission Denied!!!"}
                
    class date(Resource):
        def get(self,form_id):
            forms=db.answer.aggregate([{"$match" :{"formID": form_id}},{"$group":{"_id":"$date","count":{"$sum":1}}}])
            return  json.loads(json_util.dumps({"response": [i for i in forms]}))

    # class answer(Resource):
    #     def get(self):
    #         return {'hello': 'world'}

    # class analytics(Resource):
    #     def get(self):
    #         return {'hello': 'world'}


    api.add_resource(info, '/api/')
    api.add_resource(form, '/api/<string:user_id>/form/<string:form_id>')
    api.add_resource(question, '/api/<string:user_id>/form/<string:form_id>/questions',
    '/api/<string:user_id>/form/<string:form_id>/questions/<string:question_id>')
    api.add_resource(age, '/api/<string:user_id>/form/<string:form_id>/age')
    api.add_resource(gender, '/api/<string:user_id>/form/<string:form_id>/gender')
    api.add_resource(country, '/api/<string:user_id>/form/<string:form_id>/country')
    api.add_resource(date, '/api/form/<string:form_id>/date')

    