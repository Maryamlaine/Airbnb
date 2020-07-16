import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func, desc

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
    
    sel = [neighborhood_table.neighbourhood,
    func.avg(price_table.daily_price),
    func.avg(review_table.review_scores_rating)]
    
    #func.avg(flight_table.arrival_delay),
    #func.avg(flight_table.departure_delay)]

    LAloc = session.query(*sel).\
                    filter(neighborhood_table.neighborhood_id == property_table.neighborhood_id).\
                    filter(price_table.price_id == property_table.price_id).\
                    filter(review_table.property_id == property_table.property_id).\
                    filter(review_table.review_scores_rating != None).\
                    filter(neighborhood_table.latitude != None).\
                    filter(neighborhood_table.longitude != None).\
                    filter(price_table.daily_price != None).\
                    group_by(neighborhood_table.neighbourhood).\
                    all()

    nbr_list = []
    for i in range(len(LAloc)):
        LA_dict = {} 
        LA_dict['neighbourhood'] = LAloc[i][0]
        LA_dict['daily_price'] = round(float(LAloc[i][1]))
        LA_dict['review_scores_rating'] = round(float(LAloc[i][2]))
        #LA_dict['neighborhood'] = LAloc[i][3]
        #LA_dict['review_scores_rating'] = LAloc[i][4]
    
    
        nbr_list.append(LA_dict)

        #test = jsonify(nbr_list)
    #return render_template("geos.html",data=LA_dict)
    return jsonify(nbr_list)

if __name__ == "__main__":
    app.run(debug = True)    
