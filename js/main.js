// TODO learn how to search a list while typing
// TODO get search to work when backspace
// TODO when deleting entire word, reset value

// Check for enter press
$input.keypress(function(e){
    let input = $(this).val();
    if (e.which === 13) {
        // find breed that contains input value when enter was pressed
        $(".breeds").find(`li:contains("${input}")`).click();
        $(this).val("");
    }
});

// Get dog on click
$(".breeds, .options").on("click", "li", function(){
    console.log("clicked");
    let clickedBreed = $(this).text().trim();
    fillInput(clickedBreed);
    getDog(clickedBreed);
    getDogInfo(clickedBreed);
});

// fill input on click with breed and capitalize first letter
function fillInput(clicked) {
    $(".search input").val(clicked).css("textTransform", 'capitalize');
}

// get random item from array
function getRandom(items) {
    return items[Math.floor(Math.random()*items.length)];
}