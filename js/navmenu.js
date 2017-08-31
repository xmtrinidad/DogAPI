// Menu functionality
$(".menu").on("click", showMenu);
$(".close_btn").on("click", closeMenu);
$(".overlay").on("click", closeMenu);
$("")


function showMenu() {
    $(".side_nav").addClass("show_menu");
    $(".overlay").addClass("show_overlay");
    $("main").addClass("noscroll");
}

function closeMenu() {
    $(".side_nav").removeClass("show_menu");
    $(".overlay").removeClass("show_overlay");
    $("main").removeClass("noscroll");
}