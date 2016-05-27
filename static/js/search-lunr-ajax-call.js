var searchResults = $('#search-results');
var searchInput = $('#search-input');
window.addEventListener('keyup', function(event) {
  var keyPressed = event.keyCode;
  if (keyPressed === 27) {
    searchResults.hide();
  }
}, true);

/*Begin Lunr live search*/
//for more information on lunr.js, go to http://lunrjs.com/
var searchData;
searchInput.on('keyup', lunrSearch);
$('#search-button').on('click', function(){
  var query = searchInput.val();
  if(query.length > 2) {
    //searchResults.dropdown('toggle');
    searchResults.fadeToggle('fast');
    if(searchResult.is(':visible')) {
      lunrSearch();
    }
  } else {
    searchResults.hide();
  }

  return true;
});

window.index = lunr(function() {
  this.field('id');
  this.field('url');
  this.field('title', { boost: 50 });
  this.field('subtitle');
  this.field('description', { boost: 20});
  this.field('tags',{ boost: 30});
  this.field('categories',{ boost: 30});
  this.field('content', { boost: 10 });
  //boosting for relevancy is up to you.
});

var searchReq = new XMLHttpRequest();
searchReq.open('GET', SITEROOT + '/site-index.json', true);
searchReq.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    console.log("Got the site index");
    searchData = JSON.parse(this.response);
    searchData.forEach(function(obj, index) {
      obj['id'] = index;
      window.index.add(obj);
    });
  } else {
    console.log("Failed status for site-index.js. Check /static/site-index.json");
  }
}
searchReq.onerror = function() {
  console.log("Error when attempting to load site-index.json.");
}
searchReq.send();

function lunrSearch(event) {
  var query = searchInput.val();
  if (query.length === 0) {
    searchResults.empty();
    //searchResults.dropdown('toggle');
    searchResults.hide();
  }
  if ((query.length > 2)) {
    var matches = window.index.search(query);
    displayResults(matches, query);
  }
}

function displayResults(results, query) {
  var inputVal = query;
  searchResults.empty();
  if (results.length) {
    var i = 0;
    results.forEach(function(result) {
      i++;
      var item = window.searchData[result.ref];
      var section = item.section.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
      var appendString = '<li class=\"search-result\"><a href=\"' + item.url + '\"><h5>' + item.title + '</h5></a>';
      appendString  += '<p class=\"text-info\">'  + item.description + '</p>';
      appendString  += '</li>';
      if (i < results.length) appendString  += '<li role=\"separator\" class=\"divider\"></li>';
      searchResults.append(appendString);
    })
  } else {
    searchResults.append('<li class=\"search-result\"><p class=\"text-danger\">No results found for <tt>' + inputVal + '</tt></p></li>');
  }
  //searchResults.dropdown('toggle');
  searchResults.show();
}

searchResults.on('click', '.search-result a', function(e){
  //FIXME: stupid hack. don't know why event is actually not navigating. So capture and take it forward
  window.location.href = $(this).attr('href');
});
