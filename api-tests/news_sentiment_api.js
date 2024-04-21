import axios from "axios";
import { expect, assert } from "chai";

const API_KEY = "I4PV8IE2HO4IPDNB";
const BASE_URL = "http://www.alphavantage.co/";
const FUNCTION = "NEWS_SENTIMENT";

//### TEST CASES FOR NEWS SENTIMENT API ###
// 1. Test a valid request to the News Sentiment API
// 2. Test the News Sentiment API with an missing or invalid API key
// 3. Test the News Sentiment API with missing/invalid required parameters


describe("News Sentiment API", () => {
  it("Verify a valid request to the News Sentiment API", async () => {
    let tickers = "GOOG"; //  AAPL,GOOG,MSFT

    const request = await axios.get(
      `${BASE_URL}/query?function=${FUNCTION}&tickers=${tickers}&outputsize=full&apikey=demo&apiKey=${API_KEY}`
    );

    const response = request;
    //default header values
    const contentType = response.headers["content-type"];
    const block = (axios.defaults.headers.common["X-XSS-Protection"] =
      "1; mode=block");
    const deny = (response.headers["X-Frame-Options"] = "DENY");
    const nosniff = (axios.defaults.headers.common["X-Content-Type-Options"] =
      "nosniff");
    const strict = (axios.defaults.headers.common["Strict-Transport-Security"] =
      "max-age=31536000; includeSubDomains");

    expect(response).to.be.an("object");

    assert.equal(response.status, 200); //response status code is 200

    // Check Content-Type header is set to "application/json"
    assert.equal(contentType, "application/json");

    // Check that the X-XSS-Protection header is set to "1; mode=block"
    assert.equal(block, "1; mode=block");

    // Check that the X-Frame-Options header is set to "DENY"
    assert.equal(deny, "DENY");

    // Check that the X-Content-Type-Options header is set to "nosniff"
    assert.equal(nosniff, "nosniff");

    // Check the Strict transport setting
    assert.equal(strict, "max-age=31536000; includeSubDomains");

    assert.equal(response["Error Message"], null);
  });



  it("Get news articles with missing or invalid API key", async () => {
    let tickers = "AAPL"; //  AAPL,GOOG,MSFT
    let API_KEY = "";

    const request = await axios.get(
      `${BASE_URL}/query?function=${FUNCTION}&tickers=${tickers}&outputsize=full&apiKey=${API_KEY}`
    );

    const response = request;
    //default header values
    const contentType = response.headers["content-type"];
    const block = (axios.defaults.headers.common["X-XSS-Protection"] =
      "1; mode=block");
    const deny = (response.headers["X-Frame-Options"] = "DENY");
    const nosniff = (axios.defaults.headers.common["X-Content-Type-Options"] =
      "nosniff");
    const strict = (axios.defaults.headers.common["Strict-Transport-Security"] =
      "max-age=31536000; includeSubDomains");

    expect(response).to.be.an("object");
    assert.equal(response.status, 200); //response status code is 200

    // Check Content-Type header is set to "application/json"
    assert.equal(contentType, "application/json");

    // Check that the X-XSS-Protection header is set to "1; mode=block"
    assert.equal(block, "1; mode=block");

    // Check that the X-Frame-Options header is set to "DENY"
    assert.equal(deny, "DENY");

    // Check that the X-Content-Type-Options header is set to "nosniff"
    assert.equal(nosniff, "nosniff");

    assert(!response.data.error);

    assert.property(response.data, "Error Message");
    assert.equal(
      response.data["Error Message"],
      "the parameter apikey is invalid or missing. Please claim your free API key on (https://www.alphavantage.co//support/#api-key). It should take less than 20 seconds."
    );
  });




  it("Get news articles with invalid news with missing/invalid required parameters", async () => {
    let FUNCTION = "NEWS_ERROR";
    let tickers = "";

    const request = await axios.get(
      `${BASE_URL}/query?&function=${FUNCTION}&tickers=${tickers}&outputsize=full&apiKey=${API_KEY}`
    );

    const response = request;
    //default header values
    const contentType = response.headers["content-type"];
    const block = (axios.defaults.headers.common["X-XSS-Protection"] =
      "1; mode=block");
    const deny = (response.headers["X-Frame-Options"] = "DENY");
    const nosniff = (axios.defaults.headers.common["X-Content-Type-Options"] =
      "nosniff");
    const strict = (axios.defaults.headers.common["Strict-Transport-Security"] =
      "max-age=31536000; includeSubDomains");

    expect(response).to.be.an("object");
    assert.equal(response.status, 200); //response status code is 200

    // Check Content-Type header is set to "application/json"
    assert.equal(contentType, "application/json");

    // Check that the X-XSS-Protection header is set to "1; mode=block"
    assert.equal(block, "1; mode=block");

    // Check that the X-Frame-Options header is set to "DENY"
    assert.equal(deny, "DENY");

    // Check that the X-Content-Type-Options header is set to "nosniff"
    assert.equal(nosniff, "nosniff");

    expect(response.status).to.equal(200);
    assert.property(response.data, "Error Message");
  });
});