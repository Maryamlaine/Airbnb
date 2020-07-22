
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

# Dataset

We have, in total, 7 datasets for our project. They are all hosted through AWS S3.

Here are the AWS bucket links to the datasets:

1. [Amenity](https://data-analytics-airbnb.s3.us-east-2.amazonaws.com/Data/amenity.csv)
2. [Availability](https://data-analytics-airbnb.s3.us-east-2.amazonaws.com/Data/availability.csv)
3. [Host](https://data-analytics-airbnb.s3.us-east-2.amazonaws.com/Data/host.csv)
4. [Neighborhood](https://data-analytics-airbnb.s3.us-east-2.amazonaws.com/Data/neighborhood.csv)
5. [Price](https://data-analytics-airbnb.s3.us-east-2.amazonaws.com/Data/price.csv)
6. [Property](https://data-analytics-airbnb.s3.us-east-2.amazonaws.com/Data/property.csv)
8. [Review](https://data-analytics-airbnb.s3.us-east-2.amazonaws.com/Data/review.csv)
  
# Data Exploration
Original source: [Kaggle](https://www.kaggle.com/oindrilasen/la-airbnb-listings)​<p> 
Current Sources: [Inside Airbnb](http://insideairbnb.com/get-the-data.html), 
                 [Review Table](https://data-analytics-airbnb.s3.us-east-2.amazonaws.com/Data/reviews.csv)

Throughout our data exploration, we discovered a variety of variables to examine and determine whether relationships between any are present. 
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
* FLASK API to render data from the database to the front-end application
* HTML/JS/CSS using GeoJSON, Choropleth Leaflet, Bootstrap, and Tableau for the webpage and visualizations
* Heroku cloud platform for app deployment <p>

# Machine Learning Models

## NLP-Latent Dirichlet Allocation(LDA)

Latent Dirichlet Allocation (LDA) is an example of topic model where each document is considered as a collection of topics and each word in the document corresponds to one of the topics. 

   * Cleaned and normalized our dataset to prepare for modeling.

   ![1-clean](dashboard/static/img/NLP-LDA/1-clean.png)

   * Ran LDA model against our review data to determine positive and negative comments.

   ![2-LDA](dashboard/static/img/NLP-LDA/2-LDA.png)

   * Ran Vectorizer against our return and created visual(found in our ML visuals tab) to represent the top 30 most frequent words found in negative comments. We repeated this process multiple times to create our NLP visuals.

   ![3-top30](dashboard/static/img/NLP-LDA/3-top30.png)


## XGBoost4

A model known for getting high levels of accuracy in machine learning models without doing much tuning, and agile performance.
Boosting works in such a way that many different decision trees are built. Each of these individual trees work to provide some vital piece of information for prediction, despite not being strong individually. The whole is worth more than the sum of its parts, so to speak. 

This is the fundamental concept of the boosting technique: Leveraging many different weak learners for their most useful parts, and “boosting” them for optimal performance. Each tree learns and updates residual errors, then “grows the next tree” based on this updated residual error. The final, now strong, learner decreases the bias and variance of the model. The result is many small trees that are not very deep. A few of the validation techniques of the model are k-fold cross validation and Mean Standard Error. With such large numbers of trees, there is risk of overfitting.  There must be carefully chosen stop criteria for the boosting process.

   * Merged our dataset to prepare for future models.

   ![2-dataprep](dashboard/static/img/XGBoost4/2-dataprep.png)

   * Normalized and cleaned our dataset to further prepare for modeling.

   ![3-dataclean](dashboard/static/img/XGBoost4/3-dataclean.png)

   * Created the training and testing sets for our model.

   ![4-trainmod](dashboard/static/img/XGBoost4/4-trainmod.png)

   ### Regession Models for price prediction

   * Linear Regression
   * XGBoost
   * Lasso Regression
   * Decision Tree

      * Ran a Linear Regression Model against our data for predictions and determined the R2 value to be 0.622.

      ![5-linereg](dashboard/static/img/XGBoost4/5-linereg.png)

      * Ran a XGBRegressor Model against our data for predictions and determined the R2 value to be 0.712. This was our most accurate model.

      ![6-xgbreg](dashboard/static/img/XGBoost4/6-xgbreg.png)

      * Ran a Lasso Model against our data for predictions and determined the R2 value to be 0.622.

      ![7-lassoreg](dashboard/static/img/XGBoost4/7-lassoreg.png)

      * Ran a Decision Tree Regression Model against our data for predictions and determined the R2 value to be 0.349.

      ![8-dectreereg](dashboard/static/img/XGBoost4/8-dectreereg.png)
      
      * Residuals graphs for four models above: 
      
   ![linreg](dashboard/static/img/MLvis/linreg.png)
   ![xgbreg](dashboard/static/img/MLvis/xgbreg.png)
   ![lassoreg](dashboard/static/img/MLvis/lassoreg.png)
   ![dectreereg](dashboard/static/img/MLvis/dectreereg.png)

## K-Means Clustering

Utilized an unsupervised model of K-Means Clustering to generate clusters. By finding the K-Means score of our dataset, we're able to determine the minimized sum of all distances between cluster centers. We returned a K-Means score of -4.308237925188447 which indicates a large spread in our data values. This value is a correct representation of our data, as we examine a large amount of LA neighborhoods with a wide range of distance between them.

   * Prepared dataset and created PCA (principal component analysis) dataframe.

   ![2-pca](dashboard/static/img/K-Means_Cluster/2-pca.png)
   
   * Imported and fitted model, calculated SSE (sum of squared error), and plotted graphic utilizing The Elbow Method to visualize SSE per k value.

   ![3-elbow](dashboard/static/img/K-Means_Cluster/3-elbow.png)

   * Assigned cluster variables and used K-Means to predict the cluster values.

   ![4-clusters](dashboard/static/img/K-Means_Cluster/4-clusters.png)

   * Determined our K-Means score.

   ![5-kmscore](dashboard/static/img/K-Means_Cluster/5-kmscore.png)


## Naive Bayes

Naive bayes is a predictive modeling problem that involves assigning a given input data to a sample. In this project, we are trying to calculate the conditional probablity of a class label for review_scores_rating given the airbnb data sample for LA. In other words, we used Naive Bayes to classify review scores based on comments provided by guests.

### Classifying Comments for Naive_Bayes Modeling of Airbnb

1. Read in the file from AWS and fix the data sctructure in pyspark using structtype.

![1-structfield](dashboard/static/img/Naive_Bayes/1-structfield.png)

2. Created a column that adds the length of the review as a feature.

3. Created a list of transformations to be applied in the pipeline:

   * Created label column that will be used later for predicting by transforming review_scores_rating into 4 bins with rating 0 to 40 as 1, 41 to 70 as 2 and 70 to 100 as 3, using bucketizer. Now we have a label column with 1, 2 and 3.

   ![2-binning](dashboard/static/img/Naive_Bayes/2-binning.png)

   * We used langdetect to only pick the enlish comments for the analysis to be used for stop words dictionary later.	
      ** We utilized a user defined function (udf) to transform langdetect function.

      ![3-lang](dashboard/static/img/Naive_Bayes/3-lang.png)

   * Tokenize the review.

   * Removed the punctuation and exclmation from the comments.

   * Filter out stop words.

   * Calculate term frequency using `HashingTF`.

   * Calculate TF–IDF.

4. Create a feature vector containing the output from the IDFModel and the length.

   * Fit it to the data.

   ![4-modelfit](dashboard/static/img/Naive_Bayes/4-modelfit.png)

   * Create training and testing data of 0.8 , and 0.2.

   * Create and fit the Naive Bayes model to the training data.

   * Predict outcomes using the testing set.

   * Used `MulticlassClassificationEvaluator` to evaluate the model on the testing set, Accuracy of model at predicting reviews was: 0.997703.

   ![5-acc](dashboard/static/img/Naive_Bayes/5-acc.png)

# Visualizations

* Tableau Dashboard Links:

1. [Dashboard](https://public.tableau.com/views/AirbnbDashboard_15948743321440/AirbnbDashboard?:language=en-GB&:display_count=y&publish=yes&:origin=viz_share_link)


2. [Airbnb_LA](https://public.tableau.com/views/Airbnb_LA/Dashboard1?:language=en&:display_count=y&publish=yes&:origin=viz_share_link)

* Images Created Through Machine Learning
   ![pos_wc](dashboard/static/img/MLvis/pos_wc.png)
   ![neg_wc](dashboard/static/img/MLvis/neg_wc.png)
![top30_pos](dashboard/static/img/MLvis/top30_pos.png)
![top30_neg](dashboard/static/img/MLvis/top30_neg.png)

# Conclusions

Based on predictions from our models and visualizations:​<p>

1. The most expensive neighborhoods to rent in are Bel-Air and Harbor City at $1300/night, and the least expensive is Huntington Park at $19/night.​<p>

2. Desirable neighborhoods have higher average prices, and the longer a person has been registered as a host, the higher the rental price. ​ <p>

3. Amenities tend to influence overall price. Indoor fireplaces have the largest pricing influence followed by hot tubs. 


# Webpage  
Click [here](https://airbnb-machine-learning.herokuapp.com/tableau) to Deploy the Heroku app.
