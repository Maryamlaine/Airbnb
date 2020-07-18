
 # Airbnb in Los Angeles
​
By Andrew McGraw, Maryam Tabatabaei, Cade Schkerke, Qixuan Wang, Karly Ringstad, and Nathanuel Martin <p>
​

# What is Airbnb?
  
Airbnb is a vacation rental online marketplace that was founded in 2007 by roommates who had extra space in their high price San Francisco apartment and needed a way of offsetting their rent. This website connects vacationers and travelers searching for short-term stays with the appropriate available properties, acting as a liaison between hosts and guests. In return, Airbnb collects a percentage of the rental price as a fee for its services. 

Users of the website are able to filter preferences by lodging type, date, location, price, and more. There is also the option to directly contact a host in the messaging portion of the platform. Hosts can set specific guidelines for their properties, such as number of allowed guests, rules, and cleaning terms. One interesting aspect about Airbnb is that not only can guests leave reviews, but hosts can also leave reviews about their guests in order to provide insight for other hosts about prospective renters. Airbnb has grown from one miniscule west coast apartment to a multibillion-dollar enterprise.
  
  
# Objective
The goal of our project was to utilize supervised and unsupervised machine learning models in order to explore possible relationships between variables found within our dataset pertaining to Los Angeles Airbnb information. We also aimed to create a variety of visualizations and interactive dashboards to illustrate our findings.

Questions we aimed to explore:
* Which neighborhood is the least/most expensive in LA?​
* How is price impacted by reviews (NLP), room types, host, and neighborhood? ​
* How do offered amenities influence price?​
  
# Data Exploration
Original source: [Kaggle](https://www.kaggle.com/oindrilasen/la-airbnb-listings)​ 
Current Sources: [Inside Airbnb](http://insideairbnb.com/get-the-data.html)​
                 [Review Table](https://data-analytics-airbnb.s3.us-east-2.amazonaws.com/Data/reviews.csv)

Throughout our data exploration, we discovered a variety of variables to examine and determine whether relationships between anya re present. 
Variable Examples include:
* Price​
* Neighborhood​
* Amenities​
* Room-Type​
* Guest Accommodation​

# ERD
   ![Airbnb_ERD](sql/Airbnb_ERD.png)

Our web application utilizes:
* A postgreSQL database in AWS
* Python for ETL 
*
*
* FLASK API to render data from the database to the front-end application
* HTML/JS/CSS using GeoJSON, Leaflet.js, Bootstrap, and Tableau for the webpage and visualizations
* Heroku cloud platform for app deployment <p>

# Machine Learning

​
# Visualizations





# Webpage  
Click [here](https://airbnb-machine-learning.herokuapp.com/tableau) to Deploy the Heroku app.
