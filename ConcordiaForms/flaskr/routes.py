import json
from flask import Flask, request, render_template, jsonify, url_for, session, redirect, flash
from flask_pymongo import PyMongo, pymongo
from atexit import register
import bcrypt
from bson.objectid import ObjectId
from werkzeug.utils import secure_filename
from werkzeug.datastructures import  FileStorage
import bson.json_util as json_util
from datetime import datetime
def surveyRoutes(app,db):
    # Index Page
    @app.route("/")
    def home_page():
        if 'username' in session:
            username=session['username']
            print(username)
            day =str(datetime.today().now().day)
            month = str(datetime.today().now().month)
            year = str(datetime.today().now().year)
            date=month+'/'+day+'/'+year
            userID=db.user.find_one({"username":username},{"_id":1})['_id']
            print(userID)
            return render_template('index.html', userID=userID)
        return render_template('index.html')

    # Form page
    @app.route("/form")
    def form_page():
        if 'username' in session:
            username=session['username']
            print(username)
            userID=db.user.find_one({"username":username},{"_id":1})['_id']
            form = db.form.find()
            newDictionary=[]
            for item in form:
                temp={
                    "id":item['_id'],
                    "title":item['title']
                }
                newDictionary.append(temp)
            return render_template('form.html',data=newDictionary,userID=userID)
        else:
            return redirect('/signin')
    # Question page
    @app.route("/question/<id>",methods=['GET','POST'])
    def question_page(id):
        if request.method=="POST":
            questions=[]
            finalData={}
            temp=0
            images=[]
            username=session['username']
            user=db.user.find_one({"username":username},{"_id":1})['_id']
            
            day =str(datetime.today().now().day)
            month = str(datetime.today().now().month)
            year = str(datetime.today().now().year)
            date=month+'/'+day+'/'+year
            for item in request.form:
                if(item != "title"):
                    questions.append({
                        "id":temp,
                        "answer" : request.form[item]
                    })
                    temp=temp+1
            for item in request.files:
                f=request.files[item]
                f.save(secure_filename(f.filename))
                questions.append({
                        "id":temp,
                        "answer":f.filename
                })    
            finalData={
                "formID":id,
                "formTitle":request.form["title"],
                "questions":questions,
                "date":date,
                "userID":user 
            }
            answer=db.answer.insert_one(finalData)
            return redirect('/')
        else:    
            return render_template('question.html',data=id)

    #
    @app.route('/getdata/<index_no>', methods=['GET','POST'])
    def data_get(index_no):
        if request.method == 'GET':
           form=db.form.find_one({"_id":ObjectId(str(index_no))})
           print(json_util.dumps(form))
           return jsonify({"response":json_util.dumps(form)})
        else:
           return jsonify({"response":"post"}) 
    
    #
    @app.route('/senddata', methods=['POST'])  
    def data_send():
        # print(request.get_json())
        return jsonify({"message":"success"})   

    # Survey page
    @app.route("/survey")
    def survey_page():
        
        if 'username' in session:
            username=session['username']
            userID=db.user.find_one({"username":username},{"_id":1})['_id']
            return render_template('survey.html',userID=userID)
        else:
            return redirect('/signin')    

    #
    @app.route('/process',methods= ['POST'])
    def process():
        if request.method=="POST":
            questions=request.json['questions']
            title=request.json['questionTitle']
            username=session['username']
            user=db.user.find_one({"username":username},{"_id":1})['_id']
            
            day =str(datetime.today().now().day)
            month = str(datetime.today().now().month)
            year = str(datetime.today().now().year)
            start=month+'/'+day+'/'+year
            questionDescription=request.json['questionDescription']
            if questions:
                newQuestion=db.form.insert_one({'title':title,'description':questionDescription,'questions':questions,"userId":user,"start":start})
                return jsonify({'result' : "Successfully buit!"})
            return jsonify({'error' : 'Missing data!'})
    
    # Signin page
    @app.route("/signin", methods=['POST', 'GET'])
    def signin():
        if request.method == 'POST':
            user = db.user
            signin_user = user.find_one({'username': request.form['username']})
            print(signin_user)
            if signin_user:
                if bcrypt.hashpw(request.form['password'].encode('utf-8'),signin_user['password']) == signin_user['password']:
                    session['username'] = request.form['username']
                    return redirect('/')

            flash('Username and password combination is wrong')
            return render_template('signin.html')

        return render_template('signin.html')

    # REgisteration page
    @app.route("/register" , methods=['POST', 'GET'])
    def register_page():
        if request.method == 'POST':
            
            user = db.user
            signup_user = user.find_one({'username' : request.form['username']})
            
            if signup_user:
                flash(request.form['username'] + 'username already exist')
                return redirect(url_for('register_page'))

            hashed = bcrypt.hashpw(request.form['password'].encode('utf-8'), bcrypt.gensalt(14))
            new_user = user.insert_one({'username' : request.form['username'], 'password': hashed, 'email': request.form['email'],'first_name': request.form['first_name'], 
                                     'last_name': request.form['last_name'], 'age': request.form['age'], 'gender': request.form['gender'],'country': request.form['country']})
            return redirect('/')
        else:   
            return render_template('register.html')
       
    @app.route('/logout')
    def logout():
        session.pop('username', None)
        return redirect("/")  