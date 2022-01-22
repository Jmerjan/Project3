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
from sqlalchemy.ext.automap import automap_base

#database setup
engine = create_engine("sqlite:///cad.sqlite")
Base = automap_base()
Base.prepare(engine, reflect = True)
print(Base.classes.keys())
Sentry = Base.classes.sentry
Cad = Base.classes.cad
Summary = Base.classes.summary
Fireball = Base.classes.fireball

# create instance of Flask app
app = Flask(__name__)

#flask routes

## route html
@app.route("/") 
def home():
    return render_template('index.html')


## route v and dis 
@app.route("/Cad") 
def stackedplot():

    session = Session(engine)

    stackedplotchart = session.query(Cad.v_rel, Cad.dist, Cad.cd, Cad.des)

    session.close()

    data_df = pd.DataFrame(stackedplotchart, columns=['v_rel','dist','cad', 'des'])

    chartdata = []

    for v_rel, dist, cd, des in stackedplotchart:
        cleandata = {}
        cleandata['v_rel'] = v_rel
        cleandata['dist'] = dist
        cleandata['cd'] = cd
        cleandata['des'] = des
        chartdata.append(cleandata)
    jsonchartdata = jsonify(chartdata)
    return jsonchartdata

# route summary information 
@app.route("/summary") 
def summary():
    session = Session(engine)

    summarychartinfo = session.query(Summary.energy, Summary.ip, Summary.mass, Summary.des, Summary.diameter, Summary.darc, Summary.h,
                                    Summary.nobs, Summary.v_inf, Summary.first_obs, Summary.cdate, Summary.v_imp, Summary.last_obs,
                                    Summary.fullname, Summary.n_imp)

    session.close()

    summary_df = pd.DataFrame(summarychartinfo, columns=['energy', 'ip', 'mass', 'des', 'diameter', 'h', 'darc','nobs', 'v_inf', 'first_obs', 'cdate', 'v_imp', 'last_obs', 'fullname', 'n_imp'])
    summaryinfo = []
    for energy , ip, mass, des, diameter, darc, h, nobs, v_inf, first_obs, cdate, v_imp, last_obs, fullname, n_imp, in summarychartinfo:
        cleaninfo = {}
        cleaninfo['energy'] = energy
        cleaninfo['darc'] = darc
        cleaninfo['ip'] = ip
        cleaninfo['h'] = h
        cleaninfo['nobs'] = nobs
        cleaninfo['mass'] = mass
        cleaninfo['v_inf'] = v_inf
        cleaninfo['first_obs'] = first_obs
        cleaninfo['cdate'] = cdate
        cleaninfo['diameter'] = diameter
        cleaninfo['v_imp'] = v_imp
        cleaninfo['last_obs'] = last_obs
        cleaninfo['fullname'] = fullname
        cleaninfo['n_imp'] = n_imp
        cleaninfo['des'] = des
        summaryinfo.append(cleaninfo)
    return jsonify(summaryinfo)
# route gauge 

# route map fire ball altit , time 
@app.route('/fireball')
def fireball():

    session = Session(engine)

    fireballinfo = session.query(Fireball.date, Fireball.energy, Fireball.time, Fireball.latitude, Fireball.latdirection, Fireball.longitude, Fireball.londirection, Fireball.altitude_km)

    session.close()

    fireball_df = pd.DataFrame(fireballinfo, columns=['date','energy','time', 'latitude', 'latdirection', 'longitude', 'londirection', 'altitude_km'])

    fireballdata = []

    for date, energy, time, latitude, latdirection, longitude, londirection,  altitude_km in fireballinfo:
        cleanfire = {} 
        cleanfire['date'] = date
        cleanfire['energy'] = energy
        cleanfire['time'] = time
        cleanfire['latitude'] = latitude
        cleanfire['latdirection'] = latdirection
        cleanfire['longitude']= longitude
        cleanfire['londirection'] = londirection
        cleanfire['altitude_km'] = altitude_km
        fireballdata.append(cleanfire)
    return jsonify(fireballdata)

@app.route('/fireballmap')
def fireballmap():

    return render_template('fireball.html')

# route sentry 
@app.route('/sentry')
def sentry():

    session = Session(engine)

    sentryinfo = session.query(Sentry.energy, Sentry.ip, Sentry.date, Sentry.sigma_vi, Sentry.des)

    session.close()

    sentry_df = pd.DataFrame(sentryinfo, columns=['energy', 'ip', 'date', 'sigma_vi', 'des'])

    sentrydata = []

    for energy, ip, date, sigma_vi, des in sentryinfo:
        cleansentry = {}
        cleansentry['energy'] = energy
        cleansentry['ip'] = ip
        cleansentry['date'] = date
        cleansentry['sigma_vi'] = sigma_vi
        cleansentry['des'] = des
        sentrydata.append(cleansentry)
    return  jsonify(sentrydata)


if __name__ == "__main__":
    app.run(debug=True)

