# import necessary libraries
from dataclasses import dataclass
from faulthandler import cancel_dump_traceback_later
from math import dist
from flask import Flask, render_template, redirect, jsonify
import numpy as np
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd
# from flask import Flask, jsonify
from sqlalchemy.ext.automap import automap_base



#database setup
rds_connection_string = "postgres:Korudo7$@localhost:5432/cad"
#rds_connection_string = "postgres:m3t30rS4uru5!5m@localhost:5432/cad"
engine = create_engine(f'postgresql://{rds_connection_string}')
Base = automap_base()
Base.prepare(engine, reflect=True)
#Base.classes.keys()
print(Base.classes.keys())
Sentry = Base.classes.sentry
Cad = Base.classes.cad
Summary = Base.classes.summary
Fireball = Base.classes.fire_ball_data
session = Session(engine)
connection = engine.connect()

# create instance of Flask app
app = Flask(__name__)

#flask routes

    ## route html
@app.route("/") 
def home ():
    return render_template('index.html')


## route v and dis 
@app.route("/stackedplot") 
def stackedplot ():
    stackedplotchart=session.query(Cad.v_rel, Cad.dist, Cad.cd, Cad.des)

    data_df = pd.DataFrame(stackedplotchart, columns=['v_rel','dist','cad', 'des'])
    chartdata=[]
    for v_rel, dist, cd, des in stackedplotchart:
        cleandata = {}
        cleandata['v_rel']= v_rel
        cleandata['dist']= dist
        cleandata['cd'] = cd
        cleandata['des'] = des
        chartdata.append(cleandata)
    jsonchartdata = jsonify(chartdata)
    return jsonchartdata

# route summary information
@app.route("/summary") 
def summary ():
    summarychartinfo=session.query(Summary.energy, Summary.ip, Summary.mass, Summary.des, Summary.diameter)
    summary_df = pd.DataFrame(summarychartinfo, columns=['energy', 'ip', 'mass', 'des', 'diameter'])
    summaryinfo =[]
    for energy , ip, mass, des, diameter in summarychartinfo:
        cleaninfo={}
        cleaninfo['energy'] = energy
        cleaninfo['ip']= ip
        cleaninfo['mass'] = mass
        cleaninfo['des'] = des
        cleaninfo['diameter'] = diameter
        summaryinfo.append(cleaninfo)
    return jsonify(summaryinfo)
# route gauge 

# route map fire ball
@app.route('/fireballmap')
def fireball():
    fireballinfo=session.query(Fireball.date, Fireball.latitude, Fireball.latdirection, Fireball.longitude, Fireball.londirection)
    fireball_df= pd.DataFrame(fireballinfo, columns=['date', 'latitude', 'latdirection', 'longitude', 'londirection'])
    fireballdata=[]
    for date, latitude, latdirection, longitude, londirection in fireballinfo
    cleanfire={} 
    cleanfire['date'] = date
    cleanfire['latitude'] = latitude
    cleanfire['latdirection'] = latdirection
    cleanfire['longitude']= longitude
    cleanfire['londirection'] = londirection
    fireballdata.append(cleanfire)
    return jsonify(fireballdata)

if __name__ == "__main__":
    app.run(debug=True)

