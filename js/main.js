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
       };
        $.getJSON(langfile,function(data){
            $("html").attr("lang",data.lang);          
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
                $('#projects').append(project);
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


