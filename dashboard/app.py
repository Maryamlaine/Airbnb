import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func

from flask import Flask, jsonify, render_template
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

@app.route("/choropleth")
def heatmap():
    return render_template("index_choropleth.html")
 

@app.route("/tableau")
def tableau():
    return render_template("tableau.html")
