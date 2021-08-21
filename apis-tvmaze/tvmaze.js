/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  let response = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
  let data = response.data;
  let results = [];

  for (let datum of data) {
    const id      = datum.show.id;
    const name    = datum.show.name;
    const summary = datum.show.summary;
    const image   = (datum.show.image !== null) ? datum.show.image.original : 'https://tinyurl.com/tv-missing';

    const show = {id, name, summary, image};

    results.push(show);
  }

  return results;
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <img class="img-fluid" src="${show.image}"></img>
             <p><em>Click card for episode list.</em></p>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  let shows = await searchShows(query);

  populateShows(shows);
});

$('#shows-list').on('click', async function handleEpisodesClick(e) {
  let showId = $(e.target).closest(".Show").data("show-id");
  let episodes = await getEpisodes(showId);
  populateEpisodes(episodes);

  $('#episodes-area').show();
});


$('#episodes-area').on('click', function() {
  $('#episodes-area').hide();
  $('#episodes-list').empty();
})


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  let response = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  let data = response.data;
  let results = [];

  for (let datum of data) {
    const id      = datum.id;
    const name    = datum.name;
    const season  = datum.season;
    const number  = datum.number;

    const episode = {id, name, season, number};

    results.push(episode);
  }

  return results;
}

function populateEpisodes(episodes) {
  let $episodesList = $('#episodes-list');

  for (let episode of episodes) {
    let $item = $(`<li>
                    Season ${episode.season}, Episode ${episode.number}: ${episode.name}
                  </li>`);

    $episodesList.append($item);
  }

  $('#episodes-area').show();
}
