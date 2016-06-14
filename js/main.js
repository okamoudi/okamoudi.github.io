var main = function(){
//    $('#fullpage').fullpage({
////        anchors:["lang","welcome","projects","contacts"]
//    });

    $(".main").onepage_scroll({
   sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
   easing: "ease-in",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                    // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
   animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
   pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
   updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
   beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
   afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
   loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
   keyboard: true,                  // You can activate the keyboard controls
   responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
                                    // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                    // the browser's width is less than 600, the fallback will kick in.
   direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
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
            $('html').attr('lang',data.lang);          
            $('#greeting').empty();
            $.each(data.greeting, function(i,val){
                console.log(val);
                $('#greeting').append($('<p>').html(val));
                
            });
            $('#typed-strings').empty();
            $.each(data.introlist, function(i,val){
                console.log(val);
                $('#typed-strings').append($('<p>').html(val));
            });
            $('#projects').empty();
            var $project;
            var $title;
            var $description;
            var $links;
            var $link;
            var $status;
            var $version;
            $.each(data.projects, function(i,val){
                $project = $('<div>').attr('class','slide');
                $project.attr('data-anchor',val.title);
                $title = $('<h2>').html(val.title);
                $description = $('<p>').html(val.description);
                $links = $('<div>').attr('id','links');
                // APPEND
                $project.append($title);
                $project.append($description);
                $project.append($links);
                
                $.each(val.links,function(key,val){
                    $link =$('<a>').attr('href',val).html(key);
                    $links.append($link);
                });
                $status=$('<div>').text(val.status);
                $version=$('<div>').text(val.version);
                $('#projects').append($project);
            });
        });
    });
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


