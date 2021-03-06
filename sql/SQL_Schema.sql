DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS property;
DROP TABLE IF EXISTS host;
DROP TABLE IF EXISTS amenity;
DROP TABLE IF EXISTS availability;
DROP TABLE IF EXISTS price;
DROP TABLE IF EXISTS neighborhood;

CREATE TABLE "review" (
    "review_id" INT   NOT NULL,
    "property_id" INT   NOT NULL,
    "number_of_reviews" INT   NOT NULL,
    "review_scores_rating" INT ,
    "review_scores_accuracy" INT,
    "review_scores_checkin" INT,
    "review_scores_communication" INT,
    "review_scores_location" INT,
    "review_scores_value" INT,
    "comments" VARCHAR,
    CONSTRAINT "pk_review" PRIMARY KEY (
        "review_id"
     )
);

CREATE TABLE "host" (
    "host_id" INT   NOT NULL,
    "host_url" VARCHAR   NOT NULL,
    "host_name" VARCHAR,
    "host_since" DATE,
    "host_is_superhost" BIT,
    "host_response_time" VARCHAR,
    "host_acceptance_rate" INT,
    CONSTRAINT "pk_host" PRIMARY KEY (
        "host_id"
     )
);

CREATE TABLE "property" (
    "property_id" INT   NOT NULL,
    "host_id" INT   NOT NULL,
    "neighborhood_id" INT   NOT NULL,
    "price_id" INT   NOT NULL,
    "availability_id" INT   NOT NULL,
    "amenity_id" INT   NOT NULL,
    "listing_name" VARCHAR,
    "listing_description" VARCHAR,
    "property_type" VARCHAR   NOT NULL,
    "bedrooms" FLOAT,
    "bathrooms" FLOAT,
    "accommodates" INT   NOT NULL,
    "beds" FLOAT,
    "bed_type" VARCHAR   NOT NULL,
    "room_type" VARCHAR   NOT NULL,
    "minimum_nights" INT   NOT NULL,
    "maximum_nights" INT   NOT NULL,
    "extra_people_cost" FLOAT   NOT NULL,
    CONSTRAINT "pk_property" PRIMARY KEY (
        "property_id"
     )
);

CREATE TABLE "amenity" (
    "amenity_id" INT   NOT NULL,
    "wireless_internet" BIT   NOT NULL,
    "air_conditioning" BIT   NOT NULL,
    "pool" BIT   NOT NULL,
    "self_check_in" BIT   NOT NULL,
    "private_entrance" BIT   NOT NULL,
    "breakfast" BIT   NOT NULL,
    "free_parking_on_premises" BIT   NOT NULL,
    "tv" BIT   NOT NULL,
    "gym" BIT   NOT NULL,
    "hot_tub" BIT   NOT NULL,
    "indoor_fireplace" BIT   NOT NULL,
    "heating" BIT   NOT NULL,
    "family_kid_friendly" BIT   NOT NULL,
    "washer" BIT   NOT NULL,
    "dryer" BIT   NOT NULL,
    "hangers" BIT   NOT NULL,
    "iron" BIT   NOT NULL,
    "shampoo" BIT   NOT NULL,
    "hair_dryer" BIT   NOT NULL,
    "high_chair" BIT   NOT NULL,
    "crib" BIT   NOT NULL,
    "carbon_monoxide_alarm" BIT   NOT NULL,
    "smoke_detector" BIT   NOT NULL,
    "babysitter_recommendations" BIT   NOT NULL,
    "pets_allowed" BIT   NOT NULL,
    "first_aid_kit" BIT   NOT NULL,
    CONSTRAINT "pk_amenity" PRIMARY KEY (
        "amenity_id"
     )
);

CREATE TABLE "availability" (
    "availability_id" INT   NOT NULL,
    "availability_30" INT   NOT NULL,
    "avilability_60" INT   NOT NULL,
    "avilability_90" INT   NOT NULL,
    "availabilty_365" INT   NOT NULL,
    CONSTRAINT "pk_availability" PRIMARY KEY (
        "availability_id"
     )
);

CREATE TABLE "price" (
    "price_id" INT   NOT NULL,
    "daily_price" FLOAT   NOT NULL,
    "weekly_price" FLOAT,
    "monthly_price" FLOAT,
    "cleaning_fee" FLOAT,
    "security_deposit" FLOAT,
    CONSTRAINT "pk_price" PRIMARY KEY (
        "price_id"
     )
);

CREATE TABLE "neighborhood" (
    "neighborhood_id" INT   NOT NULL,
    "latitude" FLOAT   NOT NULL,
    "longitude" FLOAT   NOT NULL,
    "neighbourhood" VARCHAR NOT NULL,
    "city" VARCHAR,
    "state" VARCHAR,
    "zipcode" VARCHAR,
    "access" VARCHAR,
    "transit" VARCHAR,
    CONSTRAINT "pk_neighborhood" PRIMARY KEY (
        "neighborhood_id"
     )
);

ALTER TABLE "review" ADD CONSTRAINT "fk_review_property_id" FOREIGN KEY("property_id")
REFERENCES "property" ("property_id");

ALTER TABLE "property" ADD CONSTRAINT "fk_property_host_id" FOREIGN KEY("host_id")
REFERENCES "host" ("host_id");

ALTER TABLE "property" ADD CONSTRAINT "fk_property_neighborhood_id" FOREIGN KEY("neighborhood_id")
REFERENCES "neighborhood" ("neighborhood_id");

ALTER TABLE "property" ADD CONSTRAINT "fk_property_price_id" FOREIGN KEY("price_id")
REFERENCES "price" ("price_id");

ALTER TABLE "property" ADD CONSTRAINT "fk_property_availability_id" FOREIGN KEY("availability_id")
REFERENCES "availability" ("availability_id");

ALTER TABLE "property" ADD CONSTRAINT "fk_property_amenity_id" FOREIGN KEY("amenity_id")
REFERENCES "amenity" ("amenity_id");

