const api_key = 'qok52WmdV0YX0iqNISQqBxrhiV3zpn2H';
const URL = 'http://api.giphy.com/v1/gifs/search';


//console.log("Let's get this party started!");

$('#form').on('submit', async function(e) {
    e.preventDefault();
    
    const q = $('#field').val();
    if (q !== ''){
        $('#field').val('');
    
        let res = await axios.get('http://api.giphy.com/v1/gifs/search', {params: {q, api_key}});
        let gifs = res.data;

        let src = gifs.data[Math.floor(Math.random()*gifs.data.length)].images.original.url;

        let img = $('<img>').attr('src', `${src}`);
        $('#giphy-div').append(img);
    }
});

$('#random').on('click', async function() {
    let res = await axios.get('http://api.giphy.com/v1/gifs/random', {params: {api_key}});
    let src = res.data.data.images.original.url;

    let img = $('<img>').attr('src', `${src}`);
    $('#giphy-div').append(img);
});

$('#remove').on('click', function() {
    $('#giphy-div').empty();
});