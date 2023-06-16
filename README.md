How to launch project?
This README provides instructions for setting up and running the backend and frontend components of this project.

Backend Setup
To set up the backend, please follow these steps:

Install the required dependencies by running the following command:

pip install -r requirements.txt

This command will install all the necessary Python packages specified in the requirements.txt file.

Start the backend server by running the following command:

python manage.py runserver

This command will launch the backend server and make it available for incoming requests.

Frontend Setup

To set up the frontend, please follow these steps:

Run a local database using JSON-Server by executing the following command:

npx json-server --watch -p 4000 data.json

This command will start a local server hosting a JSON database using the data.json file.

Start the frontend development server by running the following command:

npm start

This command will launch the frontend server, allowing you to access the application in your web browser.

Conclusion
With the backend and frontend components set up and running, you should now be able to interact with this project. Ensure that the backend server is running before accessing the frontend application to ensure smooth functionality.

Feel free to modify or customize the project to suit your needs. 
