$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors:['lang','welcome', 'projects','contact']
    });
});

$.getJSON("lang/ar.json",function(lang){
    $("html").attr("lang",lang.lang);
    console.log(lang.title);
});



$(function() {

    $("#hi").typed({
        strings: ["Hi", "I am Omar ^1500"],
        // stringsElement: $('#typed-strings'),
        typeSpeed: 40,
        backDelay: 1000,
        loop: false,
        contentType: 'html', // or text
        // defaults to false for infinite loop
        loopCount: false,
        callback: function() { $(".typed-cursor").remove();
            newTyped(); },
        resetCallback: function() {}
    });

    $(".reset").click(function() {
        $("#typed").typed('reset');
    });

});

function newTyped() {

    $(function() {

        $("#typed").typed({
//             strings: ["Typed.js is a <strong>jQuery</strong> plugin.", "It <em>types</em> out sentences.", "And then deletes them.", "Try it out!"],
            stringsElement: $('#typed-strings'),
            typeSpeed: 40,
            backDelay: 1000,
            loop: false,
            contentType: 'html', // or text
            // defaults to false for infinite loop
            loopCount: false,
//            callback: function() { foo(); }
        });

        $(".reset").click(function() {
            $("#typed").typed('reset');
        });

    });
}


