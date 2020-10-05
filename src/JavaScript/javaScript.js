$(document).ready(function () {
    let searchOpt = $("#searchOption").val();
    let searchSpecification = $("#searchSpecification").val();


    $("#search").click(function () {

        console.log("Hitting?");
        const URL = "https://api.themoviedb.org/3/search/" + $("#searchOption").val() + "?api_key=a6f2492e0895b528768eb39f7815f1e4&language=en-US&page=1&include_adult=false&query=" + $("#searchSpecification").val();

        $.ajax({
            url: URL,
            type: "GET"
        }).done(function (data) {
            if (searchOpt === 'movie') {
                movieHandler(data);


                /*        Object.entries(element).forEach(([key, value]) => {
                            $("#boxes > #title").append("<p>" + key.title + "</p>")
                            console.log(`${key.title} ${value}`)
                        });
                          $("#boxes > #title").append("<p>" + element.title + "</p>").on("click", function (){
                              //TODO
                              // Needs to fetch specific clicked element and the rest of the element associated with it.
                              $(".modal").css("display","block");
                              $("#close").on("click", function (){
                                      $(".modal").css("display", "none");
                              });
                          });

                          $("#boxes > #releaseDate").append("<p>" + element.release_date + "</p>");
                          $("#boxes > #language").append("<p>" + element.original_language + "</p>");
                          $("#modalContent > #title1").append("<p>" + element.title + "</p>");
                      });*/
                //   $('#boxes').show();
            } else if (searchOpt === 'person') {
            } else {
            }

        });
    });
 function movieHandler(data) {

     var movieResults = '';
     data.results.forEach(element => {
         var divId = "divId_"+element.title;
         movieResults += '<div id="movie-info-box" class="divClass">'
         movieResults += 'Title: <span id="title">' + element.title +'</span>';
         movieResults += 'Release Date: <span id="release-date">' + element.release_date + '</span>';
         movieResults += 'Language: <span id="language">' + element.original_language + '</span>';
         movieResults += '</div>'
         console.log("title: " + element.title);

     });
     Object.entries(data).forEach(([key, value]) => {
         movieResults += 'Title: <span id="title">' + element.title +'</span>';
         console.log(key, value);
         console.log(data.indexes);
     });
     $('#movieContainer').html(movieResults);
     $('#movieContainer').show();

     $(".divClass").click(function (){
         console.log("Steffen")
                var movieResult = '';
                movieResult +='<div id="modalDiv" class="modalDiv">'
                movieResult += 'Title: <span id="taberSpan">'+ this.title + '</span>';
         movieResults += '</div>'
         $("#modal").css("display","block");

         $("#close").on("click", function (){
             $("#modal").css("display", "none");

         });



     });
 }
});