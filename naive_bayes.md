## Classifying Comments for Naive_Bayes Modeling of Airbnb


1. Read in the file from AWS and fix the data sctructure in pyspark using structtype.

2. Created a column that adds the length of the review as a feature.

3. Created a list of transformations to be applied in the pipeline:

   * Created label column that will be used later for predicting by transforming review_scores_rating into 4 bins with rating 0 to 40 as 1, 41 to 70 as 2 and 70 to 100 as 3, using bucketizer. Now we have a label column with 1, 2 and 3.

   * We used langdetect to only pick the enlish comments for the analysis to be used for stop words dictionary later.	
      ** We utilized a user defined function (udf) to trasform langdetect function.

   * Tokenize the review.

   * Removed the punctuation and exclmation from the comments.

   * Filter out stop words.

   * Calculate term frequency using `HashingTF`.

   * Calculate TF–IDF.

4. Create a feature vector containing the output from the IDFModel and the length.

   * Fit it to the data.

   * Create training and testing data of 0.8 , and 0.2.

   * Create and fit the Naive Bayes model to the training data.

   * Predict outcomes using the testing set.

   * Used `MulticlassClassificationEvaluator` to evaluate the model on the testing set, Accuracy of model at predicting reviews was: 0.997703.
