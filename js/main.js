var main = function(){
    $('#fullpage').fullpage({
//        anchors:["lang","welcome","projects","contacts"]
    });


    $(".langbtn").click(function(){
        $("#hi").typed('reset');
        $("#welcome").typed('reset');
        if($(this).html() =="English"){
            var langfile= "lang/en.json"
            console.log(langfile);
        } else if($(this).html() =="عربي"){
            var langfile= "lang/ar.json"
            console.log(langfile);
       }
        $.getJSON(langfile,function(data){
            $('html').attr('lang',data.lang); 
            $('html').attr('dir',data.dir); 
            $('#greeting').empty();
            $.each(data.greeting, function(i,val){
                console.log(val);
                $('#greeting').append($('<p>').html(val));
                
            });// end each
            $('#typed-strings').empty();
            $.each(data.introlist, function(i,val){
                console.log(val);
                $('#typed-strings').append($('<p>').html(val));
            });//end each
            var $project;
            var $title;
            var $description;
            var $links;
            var $link;
            var $status;
            var $version;
            var $img ;
            var leftPos
            $.each(data.projects, function(i,val){
                $projectid=$('#'+val.title+'id');
                $projectid.empty();
                $project =$('<div>').attr('class','fp-tableCell');
                $title = $('<h2>').html(val.title);
                $description = $('<p>').html(val.description);
                $links = $('<div>').attr('id','links');
                $info=$('<div>').attr('class','info');
                $status=$('<div>').text(val.status);
                $version=$('<div>').text(val.version);
                // APPEND
                $projectid.append($project);
                $project.append($title);
                $project.append($description);
                $project.append($links);
                $project.append($info);
                $info.append($status);
                $info.append($version);
                leftPos =100-(100/(i+1));
                
                $.each(val.links,function(key,value){
                    $img = $('<img>');
                    $link =$('<a>').attr('href',value);
                    console.log(key);
                    if (key=='devpost'){
                        $img.attr('src',"http://nealrs.github.io/devpost-follow-button/icon/devpost-128.png"); 
                        $link.append($img.attr('alt',val.title+' on '+key));
                    } else if(key=='github') {
                    
                        $img.attr('src','https://camo.githubusercontent.com/567c3a48d796e2fc06ea80409cc9dd82bf714434/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f6461726b626c75655f3132313632312e706e67');
                        $img.attr('alt',"Fork me on GitHub");
                        $img.attr('data-canonical-src','https://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png');
                        $img.attr('style',"position: absolute; top: 0; left: "+leftPos+"%; border: 0;");
                        $link.append($img);
                    }else {
                        $link.text(key);
                    }// end if
                    $links.append($link);
                });//end each
                
            });//end each
            $.fn.fullpage.moveTo('welcome');
        hi();
        });// end getJSON
        
    });// end .langbtn
};// end main 


var hi= function(){
    $(function() {

    $("#hi").typed({
//        strings: ["Hi", "I am Omar ^1500"],
        stringsElement: $('#greeting'),
        typeSpeed: 40,
        backDelay: 1000,
        loop: false,
        contentType: 'html', // or text
        // defaults to false for infinite loop
        loopCount: false,
        callback: function() { $(".typed-cursor").empty();
            welcome(); },
        resetCallback: function() {}
    });

//    $(".langbtn").click(function() {
//        $("#hi").typed('reset');
//    });

});//end function
}

 var welcome =function() {

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
            callback: function() { 
                    $.fn.fullpage.moveTo('projects');
            }
        });

        $(".langbtn").click(function() {
            $("#typed").typed('reset');
        });

    });
    
}


$(document).ready(function() {
  main();  
});
