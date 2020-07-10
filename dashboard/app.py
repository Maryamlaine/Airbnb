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
engine = create_engine("postgresql://postgres:postgres")
# # reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# # Save references to each table
Review = Base.classes.review
Host = Base.classes.host
Price= Base.classes.price
Property= Base.classes.property
Neighborhood = Base.classes.neighborhood
Amenity = Base.classes.amenity
Availability = Base.classes.availability
