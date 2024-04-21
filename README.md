
### API TEST FRAMEWORK GUIDE ###
This API test frame uses Mocha, Chai and Axios libraries. Axios supports promises, which makes it easy to write robust and maintainable tests with the help of Mocha and Chai as assertions.

##Installation of Mocha, Axios and Chai for API Test Framework

Mocha
Mocha is a JavaScript test framework that is used to test Node.js applications. It is easy to use and supports asynchronous testing and test suites.

Chai
Chai is an assertion library that is used to test the results of API calls. It provides a variety of assertion methods including EXPECT, ASSERT, and SHOULD.

Axios
Axios is a popular HTTP client library for making requests to APIs. It supports HTTP methods, such as GET, POST, PUT, and DELETE. It also supports promises, which makes it easy to write asynchronous tests.


##Installation 
-  Prerequisites : Node.js, Visual Studio Code or any other code IDE
-  Create package.json file with "npm init -y"
-  Install the libraries:

npm install mocha axios chai --save 

- Install additional libraries: mochawesome for reporting, faker for random data generation and rimraf for deleting and cleaning directories:

npm install mochawesome @faker-js/faker properties-reader rimraf --save


##Usage
- Create a directory to contain the test files
- to run the tests, run "npx mocha ./api-tests"  (path to test directory) 



### TEST CASES ###
<h3> Manual Test Cases for CURRENCY_EXCHANGE_RATE API Endpoint </h3>

### Test Case 1 ###
Test Description: Get the exchange rate from Bitcoin to Chinese Yuan.
Test Steps: 
Send a GET request to the API with the following required parameters:
- function: CURRENCY_EXCHANGE_RATE
- from_currency: BTC
- to_currency: CNY
- apikey: YOUR_API_KEY

Request URL: https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=CNY&apikey=YOUR_API_KEY

Expected Response:
Verify the response status code is 200
Verify the response body has a JSON object with properties :
- From_Currency Code
- Exchange Rate
- To_Currency Code
- Time Zone
- From_Currency Name
- Last Refreshed
- To_Currency Name

Expected Results:
The API returns a exchange rate from Bitcoin to Chinese Yuan.


### Test Case 2 ###
Test Description: Get the exchange rate from US Dollar to Japanese Yen.
Test Steps: 
Send a GET request to the API with the following required parameters: 
- function: CURRENCY_EXCHANGE_RATE
- from_currency: USD
- to_currency: JPY
- apikey: YOUR_API_KEY

Request URL: https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY&apikey=YOUR_API_KEY

Expected Response:
Verify the response Status code is 200
Verify the response body has a JSON object with properties:
- From_Currency Code
- Exchange Rate
- To_Currency Code
- Time Zone
- From_Currency Name
- Last Refreshed
- To_Currency Name

Expected Results:
The API returns a exchange rate for US Dollar to Japanese Yen.


### Test Case 3###
Test Description: Get the exchange rate without specifying the API key.
Test Steps: 
Send a GET request to the API without specifying the API key with the following parameters:
- function: CURRENCY_EXCHANGE_RATE
- from_currency: USD
- to_currency: JPY

Request URL: https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY

Expected Response:
Verify the response Status code is 401
Verify the response body has a JSON object with properties:
- Error Message

Expected Results:
The API returns an error message indicating that the API key is required .


### Test Case 4 ####
Test Description: Get the exchange rate from a valid currency to a non-supported/invalid currency.
Test Steps: 
Send a GET request to the API with the following required parameters:
- function: CURRENCY_EXCHANGE_RATE
- from_currency: USD
- to_currency: ABC
- apikey: YOUR_API_KEY

Request URL: https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=ABC&apikey=YOUR_API_KEY

Expected Response:
Verify the response status code is 400
Response body: JSON object with the following properties:
- Error Message

Expected Results:
The API returns an error message indicating that the to_currency is invalid.


### Test Case 5 ###
Test Description: Get the exchange rate from BTC to USD with missing required parameters. 
Test Steps: 
Send a GET request to the API with the following required parameters:
- function: CURRENCY_EXCHANGE_RATE
- from_currency: BTC
- apikey: YOUR_API_KEY

Request URL: https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&apikey=YOUR_API_KEY

Expected Response:
Verify the response status code is 400
Verify the response body has a JSON object with the following properties:
 - Error Message


Expected Results:
The API returns an error message indicating that the to_currency is missing.

<br>
<br>
<br>

<h3> Manual Test Cases for the News Sentiment API Endpoint </h3>

### Test Case 1 ###
Test Description: Verify that the API returns a list of news articles that mention the specified ticker.

Test Steps:
Send a GET request to the API with the following parameters:
- function=NEWS_SENTIMENT
- tickers=AAPL
- apikey=YOUR_API_KEY

Request URL: https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=YOUR_API_KEY

Verify that the response status code is 200.
Verify that the response body contains a list of news articles.
Verify that each news article in the list contains the specified ticker in its content.

Expected Results:
The API returns a list of news articles that mention the specified ticker.


### Test Case 2###
Test Description: Get news articles without specifying the API key.
Test Steps: 
Send a GET request to the API without specifying the API key with the following parameters:
- function=NEWS_SENTIMENT
- tickers=AAPL
- APIKEY=YOUR_API_KEY

Request URL: https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY

Expected Response:
Verify the response Status code is 401
Verify the response body has a JSON object with properties:
- Error Message

Expected Results:
The API returns an error message indicating that the API key is required .



### Test Case 3 ###
Test Description: Verify that the API returns a list of news articles that are published within the specified time range.

Test Steps:
Send a GET request to the API with the following parameters:
- function=NEWS_SENTIMENT
- tickers=AAPL
- time_from=20220410T0130
- time_to=20220410T0230
- sort=DATE
- sort_order=DESC
- apikey=YOUR_API_KEY

Request URL: https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&time_from=20220410T0130&time_to=20220410T0230&apikey=YOUR_API_KEY

Verify that the response status code is 200.
Verify that the response body contains a list of news articles.
Verify that each news article in the list was published on or after the specified time.

Expected Results:
The API returns a list of news articles that are published within the specified time range.


### Test Case 4 ###
Test Description: Get news articles with invalid news with missing required parameters.

Test Steps:
Send a GET request to the API with the following parameters:
- function=NEWS_ERROR
- tickers=NULL

Request URL: https://www.alphavantage.co/query?function=NEWS_ERROR&tickers=NULL&apikey=YOUR_API_KEY

Verify that the response status code is 200.
Verify that the response body contains an error
Verify that no news article are retrieved 

Expected Results:
The API returns an error indicating the parameters are missing or invalid.


### Test Case 5 ###
Test Description: Verify that the API returns a list of news articles that are sorted by relevance.

Test Steps:
Send a GET request to the API with the following parameters:
function=NEWS_SENTIMENT
tickers=AAPL
sort=RELEVANCE
apikey=YOUR_API_KEY

Request URL: https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&sort=RELEVANCE&apikey=YOUR_API_KEY

Verify that the response status code is 200.
Verify that the response body contains a list of news articles.
Verify that the news articles in the list are sorted by relevance.

Expected Results:
The API returns a list of news articles that are sorted by relevance.
# payrails-alphavantage-api
