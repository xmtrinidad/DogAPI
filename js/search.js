



let inputVal = "";
$input.on("keydown", function(e){
    // if enter is clicked and search results is down to one, enter clicks on that item
    if (e.which == 13 && $options.children().length === 1) {
        $options.children().click();
        return;
    } else if (e.which == 13) {
        return;
    }
    // check if input value is empty and reset inputval if so
    if ($(this).val() === "") {
        inputVal = "";
    }

    inputVal += String.fromCharCode(e.keyCode);
    // Check if input val is empty or user deleted input
    searchFilter(inputVal);
});




function searchFilter(input) {
    let items = $(".breeds").eq(0).children();
    // reset list items
    $options.empty();
    for (let i = 0; i < items.length; i++) {
        item = items[i].innerText;
        if (item.toLowerCase().indexOf(input.toLowerCase()) > -1 && inputVal.length > 1) {
            $options.append(`<li><a href="#!"><i class="fa fa-paw fa-lg" aria-hidden="true"></i> ${item}</a></li>`);
        }
    }
}