const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiResponse = [];

// show Loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Show New quotes
const newQuotes = () => {
  loading();
  const quotes = apiResponse[Math.floor(Math.random() * apiResponse.length)];

  // Checking for the Author if unknown print anonymous
  if (!quotes.author) {
    authorText.textContent = "Anonymous";
  } else {
    authorText.textContent = ` - ${quotes.author}`;
  }

  //Check Quote Length to determine styling
  if (quotes.text.length > 110) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Hiding the loader
  quoteText.textContent = `${quotes.text}`;
  complete();
};

// Getting the Quotes
async function getQuotes() {
  loading();

  // Proxy URL
  const proxyUrl = "https://blooming-plains-93648.herokuapp.com/";

  // pass only URL
  const apiQuote = "https://type.fit/api/quotes";

  try {
    // Getting the Fetch and Response
    const response = await fetch(proxyUrl + apiQuote); //  format will be in json
    apiResponse = await response.json();
    newQuotes();
  } catch (error) {
    // getQuotes();
    console.log(error);
  }
}

//Tweet A Quote
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${authorText.textContent}`;
  window.open(twitterURL, "_blank");
}

// Event Listener
newQuoteBtn.addEventListener("click", newQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
