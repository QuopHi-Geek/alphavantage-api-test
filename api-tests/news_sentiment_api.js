import axios from "axios";
import { expect, assert } from "chai";

const API_KEY = "I4PV8IE2HO4IPDNB";
const BASE_URL = "http://www.alphavantage.co/";
const FUNCTION = "NEWS_SENTIMENT";

//### TEST CASES FOR NEWS SENTIMENT API ###
// 1. Test a valid request to the News Sentiment API
// 2. Test the News Sentiment API with an missing or invalid API key
// 3. Test the News Sentiment API with missing required parameters


describe("News Sentiment API", () => {
  it("Verify a valid request to the News Sentiment API", async () => {
    let tickers = "GOOG"; //  AAPL,GOOG,MSFT

    const request = await axios.get(
      `${BASE_URL}/query?function=${FUNCTION}&tickers=${tickers}&outputsize=full&apikey=demo&apiKey=${API_KEY}`
    );
    const response = request.data;

    // Check that the response has a sentiment score
    expect(response).to.be.an("object");
    assert.equal(response["Error Message"], null);

  });



  it("Get news articles with missing or invalid API key", async () => {
    let tickers = "AAPL"; //  AAPL,GOOG,MSFT
    let API_KEY = "";
    const request = await axios.get(
      `${BASE_URL}/query?function=${FUNCTION}&tickers=${tickers}&outputsize=full&apiKey=${API_KEY}`
    );
    const response = request;

    // Check that the response has an error message
    expect(response.status).to.equal(200);
    assert(!response.data.error);

    assert.property(response.data, "Error Message");
    assert.equal(
      response.data["Error Message"],
      "the parameter apikey is invalid or missing. Please claim your free API key on (https://www.alphavantage.co//support/#api-key). It should take less than 20 seconds."
    );
  });


  it("Get news articles with invalid news with missing required parameters", async () => {
    let FUNCTION = "NEWS_ERROR";
    let tickers = "";

    const request = await axios.get(`${BASE_URL}/query?&function=${FUNCTION}&tickers=${tickers}&outputsize=full&apiKey=${API_KEY}`);

    const response = request;
    // Check that the response has an error message
    expect(response.status).to.equal(200);
    assert.property(response.data, "Error Message");
  });

});
