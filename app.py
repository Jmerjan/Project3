# import necessary libraries
from flask import Flask, render_template
import numpy as np
import sqlalchemy
import pandas as pd
from sqlalchemy.engine.base import Connection 
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify

#database connection
rds_connection_string = "postgres:Korudo7$@localhost:5432/cad"
engine = create_engine(f'postgresql://{rds_connection_string}')
connection = engine.connect()

# create instance of Flask app
app = Flask(__name__)

#
#flask routes
    #flask route 1: fireball data


@app.route("/")
def fire_ball ():
    fire_ball_data = pd.read_sql('select * from fire_ball_data', connection)
    return jsonify(fire_ball_data)
