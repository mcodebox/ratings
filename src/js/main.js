// main.js -------------------------------------
TMDBapiKey = "edit_this_and_enter_your_TMDB.org_API_key_here";

// get my Ratings and write page --------------------------------------------------
function getRatings(ratings) {
  for (var i = 0; i < ratings.items.length; i++) {
    var currentTitle = ratings.items[i].title;
    var currentRating = ratings.items[i].rating;
    var currentReview = ratings.items[i].review;

    var currentStars;
    var currentID = ratings.items[i].id;

    // check rating and generate stars
    if (currentRating === 1) {
      currentStars = "&#9733; &#9734; &#9734; &#9734; &#9734;";
    } else if (currentRating === 2) {
      currentStars = "&#9733; &#9733; &#9734; &#9734; &#9734;";
    } else if (currentRating === 3) {
      currentStars = "&#9733; &#9733; &#9733; &#9734; &#9734;";
    } else if (currentRating === 4) {
      currentStars = "&#9733; &#9733; &#9733; &#9733; &#9734;";
    } else if (currentRating === 5) {
      currentStars = "&#9733; &#9733; &#9733; &#9733; &#9733;";
    }

    var theDiv = document.getElementById('mainDiv');
    var myText = "hello";

    var textnode = document.createTextNode("Water" + "<br>");

    theDiv.insertAdjacentHTML('beforeend', '<div id="contDiv_' + i + '" class="contDivs" style="display: none"><div class="titleDivs">' + currentTitle + '</div><div class="starsDivs">' + currentStars + '</div><div class="reviewDivs">' + currentReview + '</div>' + '<div class="infoDivs" id="infoDiv_' + currentID + '"></div><div id="buttonDiv_' + currentID + '" class="buttonDivs"><input type="button" id ="button_' + currentID + '" name="infoButton" class="infoButtons" value="Movie Info" onclick="showInfo(this)"></div>' + '</div>');

    // start animation
    $("#contDiv_" + i).slideDown(200 + (200 * i));
  }
}
getRatings(myRatings);

// Search Function --------------------------------------------------
function searchFunction() {
    // Declare variables
    var input, filter, mDiv, cDivs, t, i;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    mDiv = document.getElementById("mainDiv");
    cDivs = mDiv.getElementsByClassName('contDivs');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < cDivs.length; i++) {
        t = cDivs[i].getElementsByClassName("titleDivs")[0];
        if (t.innerHTML.toUpperCase().indexOf(filter) > -1) {
            cDivs[i].style.display = "";
        } else {
            cDivs[i].style.display = "none";
        }
    }
}

// get data from TMDB --------------------------------------------------
function showInfo (x) {
  var buttonID = x.id;
  var currentID = buttonID.slice(7);

  var currentButtonDiv = document.getElementById("buttonDiv_" + currentID);
  currentButtonDiv.innerHTML = '<input type="button" id ="button_' + currentID + '" name="infoButton" class="infoButtons" value="Close Info" onclick="hideInfo(this)">';

  var apiJSON = $.getJSON("https://api.themoviedb.org/3/movie/" + currentID + "?api_key=" + TMDBapiKey, doAfterJSONready);

  // callback after JSON is loaded
  function doAfterJSONready () {
    var myDiv = document.getElementById("infoDiv_" +  currentID);
    var apiRating = apiJSON.responseJSON.vote_average;
    var apiPoster = "https://image.tmdb.org/t/p/w185/" + apiJSON.responseJSON.poster_path;
    var apiOverview = apiJSON.responseJSON.overview;
    var apiRuntime = apiJSON.responseJSON.runtime;
    var apiGenres = apiJSON.responseJSON.genres["0"].name;
    var apiTagline = apiJSON.responseJSON.tagline;

    myDiv.style.display = "none";

    myDiv.innerHTML = "<div class='posterDivs' id='posterDiv_" + currentID + "'><img src=" + apiPoster + " class='moviePoster'></div> <div class='statsDivs'>TMDB Info:<br><span class='ratingSpan'>" + apiRating + "</span><br> Average Rating<br><br>Runtime: "+ apiRuntime + " min<br>Genres: "+ apiGenres + "</div><div class='overviewDivs'><span class='taglineSpans'>" + apiTagline + "</span><br><br>" + apiOverview + "</div>";

    $(myDiv).slideDown(500);

  }

}

// hide info
function hideInfo (x) {
  var buttonID = x.id;
  var currentID = buttonID.slice(7);
  var currentButtonDiv = document.getElementById("buttonDiv_" + currentID);
  currentButtonDiv.innerHTML = '<input type="button" id ="button_' + currentID + '" name="infoButton" class="infoButtons" value="Movie Info" onclick="showInfo(this)">';
  var myDiv = document.getElementById("infoDiv_" +  currentID);

  $(myDiv).slideUp(500);
  setTimeout(function(){
    myDiv.innerHTML = "";
  }, 500);

}

// new badge
var firstTitle = document.getElementsByClassName("titleDivs")[0];
firstTitle.insertAdjacentHTML('afterbegin', "<div id=newBadge>New</div>");

// open first movie info
setTimeout(function(){
  var firstButton = document.getElementsByClassName("infoButtons")[0];
  showInfo(firstButton);
}, 1000);
