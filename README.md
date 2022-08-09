# DBMS-Cognition-Test

ToDo:\n
Login authentication:
	Backend:
		- Implement one-time login authentication in spring security
	Frontend:
		- Implement http request to one-time login authentication on backend
		- Save login data for later http requests in case login is successfull
		- Implement redirection to correct screen depending on user role
Admin Screen:
	- Implement button to create a test for the chosen athlete (post request "admin/createTest/{athleteid}" exists and works in backend)
	- Visual updates
	- Currently double click on button is needed to get data -> needs fix

Athlete Screen:
	- Test should be hidden behind a "Start" button 
	- On "Start" pressed check if current athlete (id) has an unfinished test (http request "user/getTestID/{id}" - returns testID)
	- If no testID is returned there is no test to do
	- If testID is returned save testID for result writing later & start test
	- Time & Mistakes counting need to be implemented
	- Time taking should start when "Start" is pressed
	- Idea for mistake counting implementeation:
		Use this.entities in game.js to create and pass a variable that can be accessed and modified in systems.js
	- When test is finished automatically write result to database (http request for this exists in backend but is unfinished! "user/writeTestResults")
	- Implement option for the athlete to access their own records

Error handling:
	- Failed http request error?
	- Whatever you come across

Delete hardcoded values like athleteIDs, user authentication data in http requests & backend IP address

Disclaimer:
	- In case the connection from phone to backend is not working, disable firewall or add rules.
	- Change target IP address to your local IP address
