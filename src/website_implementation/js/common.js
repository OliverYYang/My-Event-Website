$(document).ready(function () {
    $('.search-toggle').hover(function () {
        $('#searchPopup').css('opacity', 1);
    }, function () {
        // out
    });

    $('#searchPopup').hover(function () {
        
    }, function () {
        $('#searchPopup').css('opacity', 0);
    });
});