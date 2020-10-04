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
            switch (searchOpt) {
                case 'movie':
                    data.results.forEach(element => {
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
                    });
                    $('#boxes').show();
                    break;

                case 'person':

                    break;

                default:
                    break;
            }

        });
    });
});