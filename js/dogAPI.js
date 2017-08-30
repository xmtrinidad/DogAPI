// Initial API call to populate dog breed data
let dogBreedsAPICall = new Promise((resolve, reject) => {
    fetch('https://dog.ceo/api/breeds/list')
        .then((res) => {
            res.json().then((data) => {
                let breeds = data.message;
                populateBreedList(breeds);
                resolve(breeds);
            });
        })
        .catch((error) => {
            reject(console.log(error));
        });
});

/**
 * Promise fulfill
 * Get random dog on page load
 */
dogBreedsAPICall.then((res) => {
    getDog(res);
})
    .catch((err) => {
        console.log(err);
    });

let clickedBreed = "";
// Get dog on click
$(".breeds").on("click", "li", function(){
    clickedBreed = $(this).text().trim();
    getDog(clickedBreed);
    getDogInfo();
});

function getDogInfo() {
    specialCases(clickedBreed);
    let apiCall = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${clickedBreed}&indexpageids=&redirects=1`;

    $.ajax({
        url: apiCall,
        dataType: 'jsonp',
        success: function(data) {
            extract(data)
        },
        error: function(error) {
            alert("Error");
        }
    });
}

// get extract from API call
function extract(info) {
    let pageID = info.query.pageids[0];
    let extract = info.query.pages[pageID].extract;
    let extractSentences = extract.split(".");
    $("#dog_info").text(`${extractSentences[0]}. ${extractSentences[1]}.`);
}

// special cases for breeds with multiple wiki references
function specialCases() {
    switch (true) {
        case (clickedBreed === 'african'):
            clickedBreed += ' wild dog';
            break;
        case (clickedBreed === 'airedale'):
            clickedBreed += ' terrier';
            break;
        case (clickedBreed === 'akita'):
            clickedBreed += ' (dog)';
            break;
        case (clickedBreed === 'appenzeller'):
            clickedBreed = 'Appenzeller_Sennenhund';
            break;
        case (clickedBreed === 'bouvier'):
            clickedBreed = 'Bouvier_des_Flandres';
            break;
        case (clickedBreed === 'boxer'):
            clickedBreed = 'Boxer_(dog)';
            break;
        case (clickedBreed === 'brabancon'):
            clickedBreed = 'Griffon Bruxellois';
            break;
        case (clickedBreed === 'cairn'):
            clickedBreed += ' terrier';
            break;
        case (clickedBreed === 'chihuahua'):
            clickedBreed += ' (dog)';
            break;
        case (clickedBreed === 'chow'):
            clickedBreed = 'chow chow';
            break;
        case (clickedBreed === 'clumber'):
            clickedBreed += ' spaniel';
            break;
        case (clickedBreed === 'corgi'):
            clickedBreed = 'Welsh_Corgi';
            break;
        case (clickedBreed === 'dane'):
            clickedBreed = 'Great_Dane';
            break;
        case (clickedBreed === 'eskimo'):
            clickedBreed = 'American_Eskimo_Dog';
            break;
        case (clickedBreed === 'germanshepherd'):
            clickedBreed = 'German_Shepherd';
            break;
        case (clickedBreed === 'kelpie'):
            clickedBreed = 'Australian_Kelpie';
            break;
        case (clickedBreed === 'labrador'):
            clickedBreed = 'Labrador_Retriever';
            break;
        case (clickedBreed === 'leonberg'):
            clickedBreed = 'leonberger';
            break;
        case (clickedBreed === 'lhasa'):
            clickedBreed = 'Lhasa Apso';
            break;
        case (clickedBreed === 'malinois'):
            clickedBreed = 'Malinois_dog';
            break;
        case (clickedBreed === 'maltese'):
            clickedBreed = 'Maltese_(dog)';
            break;
        case (clickedBreed === 'mastiff'):
            clickedBreed = 'English_Mastiff';
            break;
        case (clickedBreed === 'mexicanhairless'):
            clickedBreed = 'Mexican_Hairless_Dog';
            break;
        case (clickedBreed === 'mountain'):
            clickedBreed = 'Bernese_Mountain_Dog';
            break;
        case (clickedBreed === 'newfoundland'):
            clickedBreed = 'Newfoundland_(dog)';
            break;
        case (clickedBreed === 'papillon'):
            clickedBreed = 'Papillon_(dog)';
            break;
        case (clickedBreed === 'pembroke'):
            clickedBreed = 'Pembroke_Welsh_Corgi';
            break;
        case (clickedBreed === 'pointer'):
            clickedBreed = 'Pointer_(dog_breed)';
            break;
        case (clickedBreed === 'pomeranian'):
            clickedBreed = 'Pomeranian_(dog)';
            break;
        case (clickedBreed === 'pyrenees'):
            clickedBreed = 'Great_Pyrenees';
            break;
        case (clickedBreed === 'ridgeback'):
            clickedBreed = 'Rhodesian_Ridgeback';
            break;
        case (clickedBreed === 'samoyed'):
            clickedBreed = 'Samoyed_(dog)';
            break;
        case (clickedBreed === 'shiba'):
            clickedBreed = 'Shiba_Inu';
            break;
        case (clickedBreed === 'springer'):
            clickedBreed = 'English_Springer_Spaniel';
            break;
        case (clickedBreed === 'stbernard'):
            clickedBreed = 'St._Bernard_(dog)';
            break;
        case (clickedBreed === 'wolfhound'):
            clickedBreed = 'Irish_Wolfhound';
            break;
    }
}



// fill in data for side nav
function populateBreedList(breeds) {
    for (let breed of breeds) {
        $(".breeds").append(`<li><a href="#"><i class="fa fa-paw fa-lg" aria-hidden="true"></i> ${breed}</a></li>`)
    }
}

// get dog on page load
function getDog(dogs) {
    // if dogs is an array, get a random dog, else get clicked dog or searched dog
    let dog = Array.isArray(dogs) ? getRandom(dogs) : dogs;
    fetch(`https://dog.ceo/api/breed/${dog}/images/random`)
        .then((res) => {
            res.json().then((data) => {
                let imgSrc = data.message;
                $("#dog_name").text(dog);
                $("#dog_img").attr("src", imgSrc);
            })
        });
}


// get random item from array
function getRandom(items) {
    return items[Math.floor(Math.random()*items.length)];
}