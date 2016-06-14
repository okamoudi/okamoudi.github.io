var main = function(){
    $('#fullpage').fullpage({
//        anchors:["lang","welcome","projects","contacts"]
    });


    $(".langbtn").click(function(){
        
        if($(this).html() =="English"){
            var langfile= "lang/en.json"
            console.log(langfile);
        } else if($(this).html() =="عربي"){
            var langfile= "lang/ar.json"
            console.log(langfile);
       }

        $.getJSON(langfile,function(data){
//            $("html").attr("lang",data.lang);            $('#greeting').append(data.greeting.forEach(parsep));
            console.log(data.greeting.forEach(parsep))
            
        });
    });
};

var parsep = function(data){
    var result += $('<p>').text(data);
    return result;
};
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


$(document).ready(function() {
  main();  
});


