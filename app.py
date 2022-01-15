# import necessary libraries
from dataclasses import dataclass
from faulthandler import cancel_dump_traceback_later
from math import dist
from flask import Flask, render_template
import numpy as np
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd
from flask import Flask, jsonify
from sqlalchemy.ext.automap import automap_base



#database setup
rds_connection_string = "postgres:Korudo7$@localhost:5432/cad"
engine = create_engine(f'postgresql://{rds_connection_string}')
Base=automap_base()
Base.prepare(engine, reflect=True)
#Base.classes.keys()
print(Base.classes.keys())
Sentry= Base.classes.data
Cad=Base.classes.final
Summary=Base.classes.summary
Fireball=Base.classes.fire_ball_data
session = Session(engine)
connection = engine.connect()

# create instance of Flask app
app = Flask(__name__)

#flask routes

    ## route html
#@app.route("/") 
#def  ():
#return 


## route v and dis 
@app.route("/") 
def stackedplot ():
    stackedplotchart=session.query(Cad.v_rel, Cad.dist, Cad.cd)
    data_df= pd.DataFrame(stackedplotchart, columns=['v_rel','dist','cad'])
    chartdata=[]
    for v_rel, dist, cd in stackedplotchart:
        cleandata = {}
        cleandata['v_rel']= v_rel
        cleandata['dist']= dist
        cleandata['cd'] = cd
        chartdata.append(cleandata)
    return jsonify(chartdata)

# route bubble chart


# route metadata 

# route gauge 

# route map fire ball

if __name__ == "__main__":
    app.run(debug=True)

