import os
import json
from flask import Flask, request, render_template, jsonify, url_for, session, redirect, flash
from flask_pymongo import PyMongo, pymongo


from flaskr.api import surveyAPI
from flaskr.routes import surveyRoutes


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='arsopo',
        #DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    # Mongo Configuration
    # First Method:
    CONNECTION_STRING = "mongodb+srv://sor891sor891:sor891sor891@cluster0.yhyfa.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(CONNECTION_STRING)
    db = client.get_database('concodriaForm')
    # Second Method
    #client = pymongo.MongoClient("mongodb+srv://sor891sor891:sor891sor891@cluster0.yhyfa.mongodb.net/?retryWrites=true&w=majority")
    #db = client.concordiaForm
    # THird Method
    # #app.config["MONGO_URI"] = "mongodb://localhost:27017/concordiaForm"
    # mongo = PyMongo(app)
    # db = mongo.db
    
    ####################################
    # Defining the API
    surveyAPI(app,db)

    #####################################
    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    
    #####################################
    # Defining the pages' route
    surveyRoutes(app,db)


    return app

