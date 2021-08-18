// Global variables
const $BDY = $('body');
$BDY.append($('<button>').text('New Game'), $('<table>').addClass('center'), $('<div>').attr('id','load-div'));

const $BTN = $('button');
const $TBL = $('table');
const $DIV = $('#load-div');

const NUM_CATEGORIES = 6;
const NUM_QUESTIONS_PER_CAT = 5;
// End global variables

// categories is the main data structure for the app; it looks like this:
/**
//  [
//    { title: 'Math',
//      clues: [
//        {question: '2+2', answer: 4, showing: null},
//        {question: '1+1', answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: 'Literature',
//      clues: [
//        {question: 'Hamlet Author', answer: 'Shakespeare', showing: null},
//        {question: 'Bell Jar Author', answer: 'Plath', showing: null},
//        ...
//      ],
//    },
//    ...
//  ]
*/
let categories = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

function getCategoryIds() {
  let ids = [];

  for (let i = 0; i < NUM_CATEGORIES; i++) {
    ids.push(
      categories.length === NUM_CATEGORIES
        ? categories[i].id
        : Math.ceil(Math.random() * 18418)
    );
  }

  return ids;
}

/** Return object with data about a category:
 *
 *  Returns { title: 'Math', clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: 'Hamlet Author', answer: 'Shakespeare', showing: null},
 *      {question: 'Bell Jar Author', answer: 'Plath', showing: null},
 *      ...
 *   ]
 */

function getCategory(catId) {
  for (let cat of categories) if (cat.id === catId) return cat;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a '?' where the question/answer would go.)
 */

async function fillTable() {
  $TBL.append($('<thead>').append($('<tr>').attr('id', 'head-row')));
  for (let cat of categories)
    $('#head-row').append($('<td>').attr('id', 'head-cell').text(cat.title));

  $TBL.append($('<tbody>'));
  for (let i = 0; i < NUM_QUESTIONS_PER_CAT; i++)
    $('tbody').append($('<tr>').attr('id', `row-${i}`));

  for (let cat of categories) {
    for (let i = 0; i < NUM_QUESTIONS_PER_CAT; i++) {
      let $td = $('<td>')
        .addClass('point-cell clue')
        .attr('id', `${cat.id}_${i}`)
        .text(cat.clues[i].showing);
      $(`#row-${i}`).append($td);
    }
  }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to 'question'
 * - if currently 'question', show answer & set .showing to 'answer'
 * - if currently 'answer', ignore click
 * */

function handleClick(evt) {
  let cell = evt.target;

  let cat = getCategory(parseInt(cell.getAttribute('id').split('_')[0]));
  let idx = evt.target.getAttribute('id').split('_')[1];

  let clue = cat.clues[idx];

  switch (clue.showing) {
    case clue.value:
      clue.showing = clue.question;
      cell.classList.add('question-cell');
      cell.classList.remove('point-cell');
      break;
    case clue.question:
      clue.showing = clue.answer;
      cell.classList.add('answer-cell');
      cell.classList.remove('question-cell');
      break;
    case clue.answer:
      clue.showing = '';
      cell.classList.add('empty-cell');
      cell.classList.remove('answer-cell');
      break;
  }

  evt.target.innerText = clue.showing;
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
  $BTN.text('Loading').prop('disabled', true);
  $DIV.text('JEOPARDY').toggleClass('loading');
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    $BTN.text('New Game').prop('disabled', false);
    $DIV.text('').toggleClass('loading');
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  categories = [];

  $TBL.empty();

  //while (TABLE.hasChildNodes()) TABLE.removeChild(TABLE.firstChild);

  let ids = getCategoryIds();

  for (let id of ids) {
    let url = `https://jservice.io/api/category/?id=${id}`;
    let res = await axios.get(url);

    let clues = [];

    for (let clue of res.data.clues) {
      clues.push({
        question: clue.question,
        answer: clue.answer,
      });
    }

    if (clues.length > 5) {
        clues = shuffle(clues).slice(0,5);
    }

    for (let i = 0; i < clues.length; i++) {
      clues[i].value = (i + 1) * 200;
      clues[i].showing = clues[i].value;
    }

    let cat = {
      title: res.data.title,
      clues,
      id
    };

    categories.push(cat);
  }

  hideLoadingView();
  fillTable();
}

/** On click of start / restart button, set up game. */

$BTN.on('click', function() {
    showLoadingView();
    setupAndStart();
});

/** On page load, add event handler for clicking clues */

$(function () {
  $TBL.on('click', '.clue', function(evt) {
    handleClick(evt);
  });
});

/**MY FUNCTIONS*/

/**
 * Array Shuffler: used to shuffle clues if there are more than five available.
 * 
 * Known issues: sometimes returns arrays with duplicate clues,
 * likely due to duplicate clues/answers with unique ids in the api
 * 
 * Visit: (https://jservice.io/api/category/?id=15480) for some evidence of this!
 * 
 * @param {the array to be shuffled} arr 
 * 
 * returns an array with containing only five clues
 */
function shuffle(arr) {
  let idx; //random index
  let val; //array value at current index

  const out = [...new Set(arr)]; //remove duplicate clues

  for (let i = 0; i < out.length; i++) {
    //random index between i and array length
    idx = Math.floor(Math.random() * (out.length - i)) + i;

    //swap values at current and random indices
    val = out[i];
    out[i] = out[idx];
    out[idx] = val;
  }

  return out;
}
