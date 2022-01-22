# Project3
## Background
An asteroid hitting earth sounds terrifying. I mean look what happened to the dinosaurs? But how likely is it that one will hit earth and how dangerous are asteroids to us here on earth? This is the goal of our dashboard. NASA has created an API of what they call NEO’s or near earth objects. This is what NASA has to say about NEO’s “A Near-Earth Object (NEO) is generally defined as an asteroid or comet that approaches our planet less than 1.3 times the distance from Earth to the Sun (the Earth-Sun distance is about 93 million miles). Most NEOs pose no peril at all. It’s the small percentage of Potentially Hazardous Asteroids that draws extra scrutiny. These objects are defined as those that approach Earth at less than half the Earth-Sun distance.”  
Looking at our dashboard we have to agree with NASA on this one. It seems unlikely that any of these NEO’s will ever hit earth. If you look at the gauge on the dashboard you will see that none of these NEO’s have a very high chance of ever hitting earth. Though it is terrifying that many of the NEO’s have a higher energy than the bombs that fell on Hiroshima and Nagasaki. This energy comparison can be seen from the bubble chart on the dashboard. The dotted red line is the energy of the bombs that fell on Hiroshima and Nagasaki. You can see that there are quite a few NEO’s  that have a higher energy. 
How we made our dashboard 
## Collecting our data
We pulled our data from 3 different API’s. The first API was the Close-Approach Data API. This API  was a list of all the different NEO’s that NASA has been keeping track of as well as summary data for each of the NEO’s. The second API was the sentry API. This API gave supplemental time data for each of the NEO’s pulled from the first API. The last API was the fireball API. This gave a list of fireballs and summary information for each fireball. 
## Cleaning our data
To clean our data we uploaded the information we received from our API’s into a jupyter notebook. From there we converted the data into the 3 different data frames. Then we cleaned the data. We renamed columns and assigned types when necessary. 

## Creating our database
We decided to create a SQLite database and coded it using SQLAlchemy. First we created the tables as classes then appended our data to each of our tables. We then transferred those tables to our flask application. 

## Our flask app
We created a flask app with different routes. The first route would call our html page to display our dashboard. Then every other route pulled data from one of our data tables. Each of the data routes only pulled data that we would be using in our dashboard.  In each route we queried the data using sqlalchemy and then used a for loop to pull only the data we needed for our charts. Then we jsonified the data. We then called the routes in our JavaScript app to use the data in the tables we created. 
## Our Javascript app
We created a JavaScript app that would call the data from our flask app to then use that data in the charts. We used plot.ly to create our charts and leaflet to create our map. We created a gauge, a bubble chart, a  sentry table, linechart, and a summary table. The gauge, the linechart and the summary tableware interactive. In the dropdown the user can choose one of the NEO’s and  see how each of these charts change. 

## Our HTML/CSS
In our HTML app we used bootstrap to organize and format our dashboard. We organized the dashboard using the grid function available through bootstrap. We also added formatting using a CSS styling sheet. 
## Our Dashboard
The dashboard has 6 visualizations. It has a bubble chart, a summary table, line graph, sentry table, gauge, and a fireball map. The gauge, the linechart and the summary table can be interacted with using a drop down.
Bubble chart- bubble size is energy, x axis is mass, y axis is energy, bubble color is probably of hitting earth. 
gauge - the probability of hitting earth of selected NEO
Line chart- velocity of the NEO and distance to earth 
Sentry  table- table of sentry data
Summary table- table of all information of selected NEO

