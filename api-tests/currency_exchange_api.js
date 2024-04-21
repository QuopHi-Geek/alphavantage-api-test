import axios from "axios";
import { expect, assert } from "chai";

const BASE_URL = "https://www.alphavantage.co/";
const FUNCTION = "CURRENCY_EXCHANGE_RATE";
const API_KEY = "I4PV8IE2HO4IPDNB";

// ### TEST CASES FOR CURRENCY EXCHANGE API  ###
// 1. GET the exchange rate from Bitcoin to Chinese Yuan
// 2. GET the exchange rate invalid or missing API key
// 3. GET the exchange rate with missing required parameters
// 4. Perform request to the API with a restricted method


describe("Currency Exchange API", async () => {
  it("GET the exchange rate from Bitcoin to Chinese Yuan", async () => {
    // Define the parameters for the request
    let FROM_CURRENCY = "BTC";
    let TO_CURRENCY = "CNY";

    // Make a request to the API
    const request = await axios.get(
      `${BASE_URL}/query?function=${FUNCTION}&from_currency=${FROM_CURRENCY}&to_currency=${TO_CURRENCY}&apikey=${API_KEY}`
    );

    const response = request;
    console.log(response.data);
    //assert response status and error
    expect(response.status).to.equal(200);
    assert(!response.data.error);

    // Assert response time is less than 1 second
    const startTime = new Date().getTime();
    const endTime = new Date().getTime();
    const responseTime = endTime - startTime;
    console.log(responseTime);
    expect(responseTime).to.be.lessThan(1000); // 1 second
    
  });


  it("GET the exchange rate without providing the API key", async () => {
    let FROM_CURRENCY = "EUR";
    let TO_CURRENCY = "USD";

    // Make a GET request to the API with API key = NULL
    const request = await axios.get(
      `${BASE_URL}/query?function=${FUNCTION}&from_currency=${FROM_CURRENCY}&to_currency=${TO_CURRENCY}`
    );

    const response = request;
    console.log(response.data);

    //assert response status and error
    expect(response.status).to.equal(200); // expected response status should be 401
    assert(!response.data.error);

    assert.property(response.data, "Error Message");
    assert.equal(
      response.data["Error Message"],
      "the parameter apikey is invalid or missing. Please claim your free API key on (https://www.alphavantage.co//support/#api-key). It should take less than 20 seconds."
    );
  });

  

  it("GET the exchange rate from BTC to EUR with missing required parameters", async () => {
    let FROM_CURRENCY = "BTC";
    let TO_CURRENCY = "EUR";

    //Make a GET request to the API endpoint without the function parameter

    const request = await axios.get(
      `${BASE_URL}/query?from_currency=${FROM_CURRENCY}&to_currency=${TO_CURRENCY}&apikey=${API_KEY}`
    );

    const response = request;
    console.log(response.data.error);
    expect(response.status).to.equal(200); // expected response status 400
    assert(!response.data.error);

  });


  //API endpoint does not support the HTTP method
  it.skip("Perform request to the API with a restricted method", async () => {
    let FROM_CURRENCY = "USD";
    let TO_CURRENCY = "JPY";

    // Make a POST request to the API endpoint
    const request = await axios.post(
      `${BASE_URL}/query?function=${FUNCTION}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
          Accept: "application/json",
        },
        data: {
          from_currency: FROM_CURRENCY,
          to_currency: TO_CURRENCY,
        },
        params: {
          function: FUNCTION,
          from_currency: FROM_CURRENCY,
          to_currency: TO_CURRENCY,
          apikey: API_KEY,
          outputsize: "full", // expected output siz
        },
        responseType: "json", // expected response type
        timeout: 10000, 
        },
    );

    const response = request;
    console.log(response.data);

    //assert POST request is not allowed
    assert(response.data.error);
    assert.property(response.data, "Error Message");
    assert.equal(response.status).to.equal(405); // Method not allowed
  });
  
});
