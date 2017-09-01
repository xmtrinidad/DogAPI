// TODO add styles where necessary
// TODO document things you learned

let newSearch = false;

// Get dog on click
$($breeds).add($options).on("click", "li", function(){
    let clickedBreed = $(this).text().trim().toLocaleLowerCase();
    closeMenu();
    fillInput(clickedBreed);
    getDog(clickedBreed);
});

// reset value in input field if new search is true
$input.on("focus", function(){
    if (newSearch) {
        $(this).val("");
        newSearch = false;
    }
});

// search icon button functionality
$(".search_icon").on("click", function(){
    if ($options.children().length === 1) {
        clickSearchItem()
    }
});

// fill input on click with breed and capitalize first letter
function fillInput(clicked) {
    $input.val(clicked).css("textTransform", 'capitalize');
    $options.empty();
    inputVal = "";
    newSearch = true; // this keeps track if input is ready for a new search
}

// get random item from array
function getRandom(items) {
    return items[Math.floor(Math.random()*items.length)];
}

// Perform click on search item
function clickSearchItem() {
    $options.children().click();
}