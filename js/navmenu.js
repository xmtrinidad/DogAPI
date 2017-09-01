// Menu functionality

$menu.on("click", showMenu);
$closeBtn.on("click", closeMenu);
$overlay.on("click", closeMenu);


function showMenu() {
    $sideNav.addClass("show_menu");
    $overlay.addClass("show_overlay");
    $main.addClass("noscroll");
}

function closeMenu() {
    $sideNav.removeClass("show_menu");
    $overlay.removeClass("show_overlay");
    $main.removeClass("noscroll");
}