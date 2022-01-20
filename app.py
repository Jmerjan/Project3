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
# rds_connection_string = "postgres:Korudo7$@localhost:5432/cad"
#rds_connection_string = "postgres:m3t30rS4uru5!5m@localhost:5432/cad"
# engine = create_engine(f'postgresql://{rds_connection_string}')
engine = create_engine("sqlite:///cad.sqlite")
# engine2 = create_engine("sqlite:///fireball.sqlite")
Base = automap_base()
# Base2 = automap_base()
Base.prepare(engine, reflect = True)
# Base2.prepare(engine2, reflect = True)
#Base.classes.keys()
print(Base.classes.keys())
# print(Base2.classes.keys())
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
                                    Summary.nobs, Summary.v_inf, Summary.first_obs, Summary.method, Summary.pdate, Summary.ndop,
                                    Summary.cdate, Summary.ps_cum, Summary.ndel, Summary.v_imp, Summary.ps_max, Summary.last_obs,
                                    Summary.fullname, Summary.n_imp, Summary.ts_max, Summary.nsat)

    session.close()

    summary_df = pd.DataFrame(summarychartinfo, columns=['energy', 'ip', 'mass', 'des', 'diameter', 'h', 'darc','nobs', 'v_inf', 'first_obs', 'method', 'pdate', 'ndop', 'cdate', 'ps_cum', 'ndel', 'v_imp', 'ps_max', 'last_obs', 'fullname', 'n_imp', 'ts_max',' nsat'])
    summaryinfo = []
    for energy , ip, mass, des, diameter, darc, h, nobs, v_inf, first_obs, method, pdate, ndop, cdate, ps_cum, ndel, v_imp, ps_max, last_obs, fullname, n_imp, ts_max, nsat  in summarychartinfo:
        cleaninfo = {}
        cleaninfo['energy'] = energy
        cleaninfo['darc'] = darc
        cleaninfo['ip'] = ip
        cleaninfo['h'] = h
        cleaninfo['nobs'] = nobs
        cleaninfo['mass'] = mass
        cleaninfo['v_inf'] = v_inf
        cleaninfo['first_obs'] = first_obs
        cleaninfo['method'] = method
        cleaninfo['pdate'] = pdate
        cleaninfo['ndop'] = ndop
        cleaninfo['cdate'] = cdate
        cleaninfo['ps_cum'] = ps_cum
        cleaninfo['diameter'] = diameter
        cleaninfo['ndel'] = ndel
        cleaninfo['v_imp'] = v_imp
        cleaninfo['ps_max'] = ps_max
        cleaninfo['lsat_obs'] = last_obs
        cleaninfo['fullname'] = fullname
        cleaninfo['n_imp'] = n_imp
        cleaninfo['ts_max'] = ts_max
        cleaninfo['nsat']  = nsat
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

    for date, energy, latitude, latdirection, longitude, londirection, time, altitude_km in fireballinfo:
        cleanfire = {} 
        cleanfire['date'] = date
        cleanfire['energy'] = energy
        cleanfire['latitude'] = latitude
        cleanfire['latdirection'] = latdirection
        cleanfire['longitude']= longitude
        cleanfire['londirection'] = londirection
        cleanfire['time'] = time
        cleanfire['altitude_km'] = altitude_km
        fireballdata.append(cleanfire)
    return jsonify(fireballdata)

# route sentry 
@app.route('/sentry')
def sentry():

    session = Session(engine)

    sentryinfo = session.query(Sentry.energy, Sentry.ip, Sentry.ts, Sentry.date, Sentry.sigma_vi, Sentry.ps, Sentry.des)

    session.close()

    sentry_df = pd.DataFrame(sentryinfo, columns=['energy', 'ip', 'ts', 'date', 'sigma_vi', 'ps', 'des'])

    sentrydata = []

    for energy, ip, ts, date, sigma_vi, ps, des in sentryinfo:
        cleansentry = {}
        # cleansentry['id'] = id
        cleansentry['energy'] = energy
        cleansentry['ip'] = ip
        cleansentry['ts'] = ts
        cleansentry['date'] = date
        cleansentry['sigma_vi'] = sigma_vi
        cleansentry['ps'] = ps
        cleansentry['des'] = des
        sentrydata.append(cleansentry)
    return  jsonify(sentrydata)


if __name__ == "__main__":
    app.run(debug=True)

