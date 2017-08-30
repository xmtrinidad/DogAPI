let $input = $(".search input");

function myFunction() {
    // Declare variables
    let filter, i;
    filter = $input.val().toLowerCase();
    let items = $(".breeds").eq(0).children();

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < items.length; i++) {
        a = items[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toLowerCase().indexOf(filter) > -1) {
            console.log(a);
            $input.val(a.innerText);
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
}
    let inputVal = "";
$input.on("keypress", function(e){
    // Check if input val is empty or user deleted input
    if ($(this).val() === "") {
        inputVal = "";
    }
    inputVal += String.fromCharCode(e.keyCode);
    console.log(inputVal);
    myFunction();
});