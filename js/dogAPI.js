// Variables
let $breeds = $(".breeds");
let $dogName = $("#dog_name");
let $dogImg = $("#dog_img");
let $dogInfo = $("#dog_info");
let list = ""

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
    list = $(".breeds").eq(0).children().text();
})
    .catch((err) => {
        console.log(err);
    });


// Wiki API call to get dog info
function getDogInfo(dog) {
    let theDog = specialCases(dog);
    let apiCall = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${theDog}&indexpageids=&redirects=1`;

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
    let extractSentences = extract.split(". ");
    if (extractSentences.length > 1) {
        $dogInfo.text(`${extractSentences[0]}. ${extractSentences[1]}.`);
    } else {
        $dogInfo.text(`${extractSentences[0]}`);
    }
}

// special cases for breeds with multiple wiki references
function specialCases(dog) {
    switch (dog) {
        case ('african'):
            dog = 'african wild dog';
            break;
        case ('airedale'):
            dog += ' terrier';
            break;
        case ('akita'):
            dog += ' (dog)';
            break;
        case ('appenzeller'):
            dog = 'Appenzeller_Sennenhund';
            break;
        case ('bouvier'):
            dog = 'Bouvier_des_Flandres';
            break;
        case ('boxer'):
            dog = 'Boxer_(dog)';
            break;
        case ('brabancon'):
            dog = 'Griffon Bruxellois';
            break;
        case ('cairn'):
            dog += ' terrier';
            break;
        case ('chihuahua'):
            dog += ' (dog)';
            break;
        case ('chow'):
            dog = 'chow chow';
            break;
        case ('clumber'):
            dog += ' spaniel';
            break;
        case ('corgi'):
            dog = 'Welsh_Corgi';
            break;
        case ('dane'):
            dog = 'Great_Dane';
            break;
        case ('eskimo'):
            dog = 'American_Eskimo_Dog';
            break;
        case ('germanshepherd'):
            dog = 'German_Shepherd';
            break;
        case ('kelpie'):
            dog = 'Australian_Kelpie';
            break;
        case ('labrador'):
            dog = 'Labrador_Retriever';
            break;
        case ('leonberg'):
            dog = 'leonberger';
            break;
        case ('lhasa'):
            dog = 'Lhasa Apso';
            break;
        case ('malinois'):
            dog = 'Malinois_dog';
            break;
        case ('maltese'):
            dog = 'Maltese_(dog)';
            break;
        case ('mastiff'):
            dog = 'English_Mastiff';
            break;
        case ('mexicanhairless'):
            dog = 'Mexican_Hairless_Dog';
            break;
        case ('mountain'):
            dog = 'Bernese_Mountain_Dog';
            break;
        case ('newfoundland'):
            dog = 'Newfoundland_(dog)';
            break;
        case ('papillon'):
            dog = 'Papillon_(dog)';
            break;
        case ('pembroke'):
            dog = 'Pembroke_Welsh_Corgi';
            break;
        case ('pointer'):
            dog = 'Pointer_(dog_breed)';
            break;
        case ('pomeranian'):
            dog = 'Pomeranian_(dog)';
            break;
        case ('pyrenees'):
            dog = 'Great_Pyrenees';
            break;
        case ('ridgeback'):
            dog = 'Rhodesian_Ridgeback';
            break;
        case ('samoyed'):
            dog = 'Samoyed_(dog)';
            break;
        case ('shiba'):
            dog = 'Shiba_Inu';
            break;
        case ('springer'):
            dog = 'English_Springer_Spaniel';
            break;
        case ('stbernard'):
            dog = 'St._Bernard_(dog)';
            break;
        case ('wolfhound'):
            dog = 'Irish_Wolfhound';
            break;
    }
    return dog;
}


// fill in data for side nav
function populateBreedList(breeds) {
    for (let breed of breeds) {
        $breeds.append(`<li><a href="#!"><i class="fa fa-paw fa-lg" aria-hidden="true"></i> ${breed}</a></li>`)
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
                $dogName.text(dog);
                $dogImg.attr("src", imgSrc);
                getDogInfo(dog);
            })
        });
}

