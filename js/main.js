// TODO learn how to search a list while typing

// Get dog on click
$(".breeds").on("click", "li", function(){
    console.log("clicked");
    let clickedBreed = $(this).text().trim();
    getDog(clickedBreed);
    getDogInfo(clickedBreed);
});

// get random item from array
function getRandom(items) {
    return items[Math.floor(Math.random()*items.length)];
}