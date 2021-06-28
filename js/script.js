let quoteContent;
let quoteAuthor;

const bgColors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857',
];

const text = document.getElementById('text');
const author = document.getElementById('author');
const newQuote = document.getElementById('new-quote');
const randomBg = document.querySelectorAll('.random-bg');
const randomTextColor = document.querySelectorAll('.random-color');
const tweetQuote = document.getElementById('tweet-quote');

function newColor() {
    return bgColors[Math.floor(Math.random() * bgColors.length)];
}

function changeColor() {
    const color = newColor();
    randomBg.forEach((element) => {
        element.style.backgroundColor = color;
    });
    randomTextColor.forEach((element) => {
        element.style.color = color;
    });
}

function changeQuote(quote, authorName) {
    text.innerText = quote;
    author.innerText = authorName;
}

async function fetchQuote() {
    text.style.opacity = 0;
    author.style.opacity = 0;
    const quote = await fetch('https://api.quotable.io/random');
    const quoteJson = await quote.json();
    quoteContent = quoteJson.content;
    quoteAuthor = quoteJson.author;

    changeColor();
    changeQuote(quoteContent, quoteAuthor);

    let tweetLink = `https://twitter.com/intent/tweet?hashtags=randomQuotes&related=freecodecamp&text=${encodeURIComponent(
        quoteContent
    )} - ${encodeURIComponent(quoteAuthor)}`;

    tweetQuote.setAttribute('href', tweetLink);
    text.style.opacity = 1;
    author.style.opacity = 1;
}

fetchQuote();

newQuote.addEventListener('click', fetchQuote);
