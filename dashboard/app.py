import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func

from flask import Flask, jsonify, render_template,redirect
from flask_sqlalchemy import SQLAlchemy

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:postgres@data-analytics-airbnb.ce6e3hxllphz.us-east-2.rds.amazonaws.com/data_analytics_airbnb")
# # reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Review = Base.classes.review
Host = Base.classes.host
Price= Base.classes.price
Property= Base.classes.property
Neighborhood = Base.classes.neighborhood
Amenity = Base.classes.amenity
Availability = Base.classes.availability

# Create our session (link) from Python to the DB
session = Session(engine)

review_table = Base.classes.review
host_table = Base.classes.host
price_table= Base.classes.price
property_table= Base.classes.property
neighborhood_table = Base.classes.neighborhood
amenity_table = Base.classes.amenity
availability_table = Base.classes.availability

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/avisuals")
def avisuals():
    return render_template("avisuals.html")

@app.route("/neuralnet")
def neuralnet():
    return render_template("neuralnet.html")

@app.route("/pvisuals")
def pvisuals():
    return render_template("pvisuals.html")

@app.route("/tableau")
def tableau():
    return render_template("tableau.html")

@app.route("/cluster")
def cluster():
    return render_template("cluster.html")

@app.route("/geos")
def geos():
       # return redirect("/neighborhood", code=302)
    return render_template("geos.html")


@app.route("/neighborhood")
def neighborhoods():
    sel = [neighborhood_table.latitude,
       neighborhood_table.longitude,
        price_table.daily_price,
    #    neighborhood_table.state,
        review_table.review_scores_rating]
       
       #func.avg(flight_table.arrival_delay),
       #func.avg(flight_table.departure_delay)]

    LAloc = session.query(*sel).all()
                    #filter(flight_table.arrival_airport == airport_table.airport_id).\
                    #filter_by(year = 2019).\
                    # group_by(flight_table.arrival_airport,
                    #         airport_table.airport_name,
                    #         airport_table.city,
                    #         airport_table.state,
                    #         airport_table.longitude,
                    #         airport_table.latitude).\
                    #all()

    nbr_list = []
    for i in range(len(LAloc)):
        LA_dict = {} 
        LA_dict['latitude'] = LAloc[i][0]
        LA_dict['longitude'] = LAloc[i][1]
        LA_dict['daily_price'] = LAloc[i][2]
        # LA_dict['state'] = LAloc[i][3]
        LA_dict['review_scores_rating'] = LAloc[i][3]
       
      
        nbr_list.append(LA_dict)
    

    return jsonify(nbr_list)

