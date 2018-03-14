# bamazon
A MySQL app that simulates the process of store inventory through customer purchases and store management.


##Downloading and initializing the app

After downloading the repo from Github, please **npm install** on the console to make sure that all dependencies
are brought downloaded to the computer.

Next, you will need to have MySQL downloaded and running. Using port 3306, make sure to copy the bamazonSeeds.sql 
file, and create the table in MySQL. 

Once all items are installed, users can start the app by typing **node bamazonCLI.js**. This will start the app 
and it will ask you if you want the use the app as a customer or as a manager.



##Using the app as a customer

Using the app as a customer, the app will initially ask you to select which department you want to choose from.
Unfortunately, no back-up feature has been built into the app yet; therefore, once a department is selected, the app
must be played through the end. The app is designed to process your sale and add the standard 7% sales tax at the
end of it. The app will also automatically update the stock quantity as well. You can keep cycling through the app as 
many times as you want until you want to be done. The app will ask your if you want to do this again, and just type "n"
to end the program.

##Using the app as a manager

Using the app as a manager, the app will initially ask you for a password. The app is built with a pre-determined
password and that is "manager". If you type in the password incorrectly three times in a row, the app will "lock" you 
out, and you can try it again in one hour. This app does not have Moment.JS installed with it, so it does not have
that feature running fully, but the app will at least terminate, and you can start it up again to simulate the
feature. 

Once in the manager menu, you can view all products, view products with an inventory below 5, and add more quantity.
The first two processes are pretty self-explanatory, but add more quantity does need a little explaining. When wanting 
to add a quantity, you will need the correct item_id then type in the number you would like the quantity to be SET to.
For example, if I had 4 movies of "Thor: Ragnorak" left in stock, and I wanted that to be increased to 8, when prompted,
I would type in 8 as opposed to 4. The app does not process any addition.

##More to come

A Supervisor piece will be added to later which will oversee profits and this will be used by tracking all purchases,
joining MySQL tables, and comparing total profits vs. total costs.

Below is a link to a video that will also demonstrate how to use the app. Unfortunately, there is no sound but the
video will fully demonstrate the process.

###Link for How-To Video

https://drive.google.com/open?id=11bRUZEPn76J1GmmITEMjrBxF1PslEYQm