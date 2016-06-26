var main = function(){
    var $window = $(window);
    $('#fullpage').fullpage({
        sectionsColor : ['#C9C9C9', '#C9C9C9','#C9C9C9','#C9C9C9'],
        animateAnchor:false
    });// end fullpage
    $(".langbtn").click(function(){
        var langfile;
        $window.disablescroll('undo');
        $("#hi").typed('reset');
        $("#welcome").typed('reset');
        if($(this).html() =="English"){
            langfile= "lang/en.json";
        } else if($(this).html() =="عربي"){
            langfile= "lang/ar.json";
       } // end if
        var $langtoggle = 
    $.getJSON(langfile,function(data){
        sessionStorage.setItem('lang',JSON.stringify(data));
        build(data);
    });// end getJSON
        $langtoggle.complete(function(){
            $.fn.fullpage.moveTo('welcome');
            hi();
        });// end $langtoggle complete
    });// end .langbtn
};// end main 

/*
Build the entire website function
*/
var build = function(data,option=""){
    //set the language and dir
    var lang = data.lang;
    var dir  = data.dir;
    //set html tag language attribute
    $('html').attr('lang',lang); 
    //set html tag direction attribute
    $('html').attr('dir',dir);
    // remove the content of hi id tag
    $('#hi').empty();
    // remove the content of typed id tag
    $('#typed').empty();
    // Genetet typed js animated text
    typedTextGen('#greeting',data.greeting,1500);
    typedTextGen('#typed-strings',data.introlist,2000);
    // if this is refresh the page
    if (option=="reload"){
        // Use the last element in the list 
        $('#hi').html(data.greeting[data.greeting.length-1]);
        $('#typed').html(data.introlist[data.introlist.length-1]);
    } // end if
    // Variables
    var $project;
    var $contentText;
    var $rightSide;
    var $title;
    var $description;
    var $links;
    var $link;
    var $status;
    var $version;
    var $img ;
    var leftPos;
    var $proglangs;
    var $proglang;
    /*
    Create project
    */
    $.each(data.projects, function(i,val){
        // Set up variables
        $project=$('#'+val.id+'id');
        $contentText=$('<div>').attr('class','contentText');
        $contentIcons=$('<div>').attr('class','contentIcons');
        $project.empty();
        $title = $('<h1>').html(val.title);
        $title = $('<div>').append($title);
        $title.attr('class','title');
        $description = $('<p>');
        $description.html(val.description);
        $description= $('<div>').append($description);
        $description.attr('class','desc');
        $links = $('<div>').attr('class','links');
        $info=$('<ul>').attr('class','info');
        $status=$('<li>').text(val.status[0]+': '+val.status[1]);
        $version=$('<li>').text(val.version[0]+': '+val.version[1]);
        $title.append($info);
        $proglangs = $('<div>').attr('class','proglangs');
        $proglang = $('<ul>');
        // APPEND
        $project.append($contentText);
        $project.append($contentIcons);
        $contentText.append($title);
        $title.append($('<hr>'));
        $title.append($info);
        $info.append($status);
        $info.append($version);
        $contentText.append($description);
        $contentIcons.append($proglangs);
        // Create the proglang
        if(0<val.proglang.length){
            $proglangs.append($('<h5>').text(data.titles[1]));
            $proglang = $('<ul>');
            $proglangs.append($proglang);
            $.each(val.proglang,function(indx,value){
                $proglang.append($('<li>').attr('title',value).attr('class','icons-'+value));
            }); // end proglang
        }
        // Create the links        
        if(!$.isEmptyObject(val.links)){
             $project.append($links);
            $links.prepend($('<h5>').text(data.titles[2]));
            $link = $('<ul>').attr('class','icons');
            $.each(val.links,function(key,value){
                $links.append($link);
                console.log('new links');
               console.log('li '+val.title);
                $link.append($('<li>').append($('<a>').text(key).attr('href',value)).attr('class','icons-'+key));
                console.log(key);
                $links.append($link);
            });//end each link
            
        }// end if !$.isEmptyObject(val.links)
        // control the github ribbon
//        leftPos =100-(100/(i+1));
        $img = $('<img>').attr('class','forkme');
        $img.attr('src','https://camo.githubusercontent.com/567c3a48d796e2fc06ea80409cc9dd82bf714434/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f6461726b626c75655f3132313632312e706e67');
        $img.attr('alt',"Fork me on GitHub");
        $img.attr('data-canonical-src','https://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png');
        $img.css({"position": "absolute", "top": "0", "left": "0", "border": "0"});
        $img= $('<a>').append($img).attr('href',val.forkongithub);
        $project.append($img);

        
    });//end each projects 
    // right to left css
    if (dir =='rtl'){
        $(".contentText").css({"float":"right","text-align":"right"});
        $(".desc>p").css({"float":"right"});
        $("ul.info").css({"float":"right", "text-align":"right"});
        $("ul.info > li").css({"margin-left": "20px",
    "margin-right": "0px"});
        $(".proglangs>h5").css({"float": "right"});
        $(".links>h5").css({"float": "right"});
        
        // GitHub Fork me ribbon
        
        $('.forkme').attr('src','images/forkme_ar.png');
        $('.forkme').attr('data-canonical-src','https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png');
        $('.forkme').css({"position": "absolute", "top": "0", "right": "0", "border": "0"});
        
    }
}; //end build


var typedTextGen = function(id,list,endDelay=0){
    // Remove content of the id element
    $(id).empty();
    // Go throug the list of strings
    $.each(list, function(i,val){ 
        // If this is the last element in the list
        if (i==list.length-1){
            // add time delay
            val = val+' ^'+endDelay;
        } // end if
        console.log(val);
        // Appent the strings with p tag to the id element
        $(id).append($('<p>').html(val));
    });// end each
}

var hi= function(){
    $(function() {

    $("#hi").typed({
        stringsElement: $('#greeting'),
        startDelay: 500,
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
} // end hi func

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
            }// end callback
        }); // end types

        $(".langbtn").click(function() {
            $("#typed").typed('reset');
        }); // end click function
    }); // end function
} // end welcome func


$(document).ready(function() {
    
    if(window.location.hash){
        if (sessionStorage.lang){
            console.log('reload');
            $langJSON= $.parseJSON(sessionStorage.getItem('lang'));
            build($langJSON,"reload");
        }else{
            document.location.hash='';
        } // enf if session
    } // end if location.hash
    
  main();  
    
});