document.addEventListener("DOMContentLoaded", function(event) {
  // array with texts to type in typewriter
  var dataText = [
    "Hello, stranger.",
    "I am Mário, a multidisciplinary designer from Brasília, Brazil.",
    "Previously, I was an associate partner & senior product designer at Startaê.",
    "I have been working remotely for national and international startups, helping them launch their products.",
    "In the last 5 years, I had the pleasure to design for Evino, Prism.Ai, Moeda and Boomerang Commerce.",
    "Currently, I am working at <span> Novatics </span> as a senior designer.",
    "I'm open to chat about new opportunities.",
    "For a detailed portfolio: hello@mariogogh.com"
  ];

  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i, fnCallback) {
    // chekc if text isn't finished yet
    if (i < text.length) {
      // add next character to h1
      document.querySelector("h1").innerHTML =
        text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

      // wait for a while and call this function again for next character
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback);
      }, 90);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == "function") {
      // call callback after timeout
      setTimeout(fnCallback, 3000);
    }
  }
  // start a typewriter animation for a text in the dataText array
  function StartTextAnimation(i) {
    if (typeof dataText[i] == "undefined") {
      setTimeout(function() {
        StartTextAnimation(0);
      }, 100);
    }
    // check if dataText[i] exists
    if (i < dataText[i].length) {
      // text exists! start typewriter animation
      typeWriter(dataText[i], 0, function() {
        // after callback (and whole text has been animated), start next text
        StartTextAnimation(i + 1);
      });
    }
  }
  // start the text animation
  StartTextAnimation(0);
});
