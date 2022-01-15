# import necessary libraries
from flask import Flask, render_template
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

#database setup

# create instance of Flask app
app = Flask(__name__)

#flask routes
    #flask route 1: fireball data

@app.route("/")
def fireball ():
    return 
