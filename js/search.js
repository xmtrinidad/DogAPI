let $input = $(".search input");

let inputVal = "";
$input.on("keypress", function(e){
    inputVal += String.fromCharCode(e.keyCode);
    // Check if input val is empty or user deleted input
    if ($(this).val() === "") {
        inputVal = "";
    }
    searchFilter(inputVal);
});

function searchFilter(input) {
    let items = $(".breeds").eq(0).children();
    // reset list items
    $(".options").empty();
    for (let i = 0; i < items.length; i++) {
        item = items[i].innerText;
        if (item.toLowerCase().indexOf(input.toLowerCase()) > -1 && inputVal.length > 1) {
            $(".options").append(`<li><a href="#!"><i class="fa fa-paw fa-lg" aria-hidden="true"></i> ${item}</a></li>`);
        } else {
            items[i].style.display = "none";
        }
    }
}