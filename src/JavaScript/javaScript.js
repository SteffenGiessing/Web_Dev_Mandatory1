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
            } else if (searchOpt === 'person') {
                personHandler(data)
            } else {
            }

        });
    });

    function personHandler(data) {
        console.log("HItting PErson")
    }


    function movieHandler(data) {
        let composer = '';
        let producer = '';
        let eProducer= '';
        let writer ='';
        let director = '';
        let genres = '';
        let production_companies = '';
        let actor = '';
        var movieResults = '';
        data.results.forEach(element => {

            movieResults += '<div id="movie-info-box" class="divClass">'
            movieResults += '<span id="id">' + element.id + '</span>';
            movieResults += 'Title: <span id="title">' + element.title + '</span>';
            movieResults += 'Release Date: <span id="release-date">' + element.release_date + '</span>';
            movieResults += 'Language: <span id="language">' + element.original_language + '</span>';
            movieResults += '</div>'
            console.log("title: " + element.title);
            console.log("id: " + element.id);

        });
        $('#movieContainer').html(movieResults);
        $('#movieContainer').show();

        $(".divClass").click(function () {
            var specificResult = '';
            let id = $(this).find("#id").text();
            console.log(id)
            var ActorURL = "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=a6f2492e0895b528768eb39f7815f1e4"
            var IDURL = "https://api.themoviedb.org/3/movie/" + id + "?api_key=a6f2492e0895b528768eb39f7815f1e4&language=en-US"
            $.ajax({
                url: IDURL,
                type: "GET"
            }).done(function (data) {
                $('#modalTitle').html(data.title);
                $('#modalRelease').html(data.release_date);
                $('#modalLanguage').html(data.original_language);
                $('#modalRuntime').html(data.runtime);
                $('#modalOverview').html(data.overview);
                $('#modalLink').html(data.link);

                data.genres.forEach(element => {
                    genres += '<li>' + element.name + '</li>'

                });
                $('#modalGenre').html(genres);

                data.production_companies.forEach(element => {
                    production_companies += '<li>' + element.name + '</li>'
                });
                $('#modalProductionCom').html(production_companies);

                $.ajax({
                    url: ActorURL,
                    type: "GET"
                }).done(function (data) {
                    data.cast.forEach(element => {
                        actor += '<li>' + element.name + '</li>'
                    });
                    $('#modalActors').html(actor);
                    data.crew.forEach(element => {
                        if (element.job ==="Director")
                        director += '<li>'+ element.name+'</li>'
                    });
                    $('#modalDirectors').html(director);
                    data.crew.forEach(element =>{
                       if (element.job ==="Writer")
                           writer += '<li>'+ element.name+'</li>'
                    });
                    $('#modalScriptWriters').html(writer);
                    data.crew.forEach(element => {
                       if (element.job ==="Executive Producer")

                        eProducer += '<li>' + element.name + '</li>'
                    });
                    $('#modalExecutives').html(eProducer);
                    data.crew.forEach(element => {
                        if (element.job ==="Producer")

                        producer += '<li>' + element.name + '</li>'
                    });
                    $('#modalProducers').html(producer);
                    data.crew.forEach(element => {
                        if (element.job ==="Original Music Composer")

                            composer += '<li>' + element.name + '</li>'
                    });
                    $('#modalComposer').html(composer);


                });

                $(".modal").css("display", "block");
                $("#close").on("click", function () {
                    $("#modal").css("display", "none");
                });
            });
        });
    }
});



