$(document).ready(function () {

    $("#search").click(function () {

        let searchOpt = $("#searchOption").val();
        let searchSpecification = $("#searchSpecification").val();
        console.log("Hitting?");
        const URL = "https://api.themoviedb.org/3/search/" + $("#searchOption").val() + "?api_key=a6f2492e0895b528768eb39f7815f1e4&language=en-US&page=1&include_adult=false&query=" + $("#searchSpecification").val();

        $.ajax({
            url: URL,
            type: "GET"
        }).done(function (data) {
            if (searchOpt === 'movie') {
                movieHandler(data);
            } else if (searchOpt === 'person') {
                console.log("here")
                personHandler(data);
            } else {
                alert("Invalid category: " + searchOpt);
            }

        });
    });

    function personHandler(data) {
        var personResults = '';
        const PersonUrl = "https://api.themoviedb.org/3/search/" + $("#searchOption").val() + "?api_key=a6f2492e0895b528768eb39f7815f1e4&language=en-US&page=1&include_adult=false&query=" + $("#searchSpecification").val();
        $.ajax({
            url: PersonUrl,
            type: "GET"
        }).done(function (data) {
            data.results.forEach(element => {
                console.log("Hitting")
                personResults += '<div id="movie-info-box" class="personDivClass">'
                personResults += '<span hidden id="personId">' + element.id + '</span>'
                console.log(element.id);
                personResults += 'Name: <span id="title">' + element.name + '</span>' + '<br>';
                personResults += 'Known For: <span id="knowFor">' + element.known_for_department + '</span>'
                personResults += '</div>'
                $('#movieContainer').html(personResults);
                $('#movieContainer').show();
            })

        $(".personDivClass").click(function () {
            let movie = '';
            console.log("hej")
            let personId = $(this).find("#personId").text();
            var personIdUrl = "https://api.themoviedb.org/3/person/" + personId + "?api_key=a6f2492e0895b528768eb39f7815f1e4&language=en-US";
            var personCredit = "https://api.themoviedb.org/3/person/"+personId+"/movie_credits?api_key=a6f2492e0895b528768eb39f7815f1e4&language=en-US";
            $.ajax({
                url: personIdUrl,
                type: "GET"
            }).done(function (data) {
                $('#pModalName').html(data.name);
                $('#pModalMain').html(data.known_for_department);
                $('#pModalBirthday').html(data.birthday);
                $('#pModalBirthplace').html(data.place_of_birth);
                $('#pModalBio').html(data.biography);
                $('#pModalLink').html(data.homepage);
                $.ajax({
                    url: personCredit,
                    type: "GET"
                }).done(function (data){
                    data.cast.forEach(element =>{
                        movie += '<li>'+ 'Title: ' + element.title +' '+
                            ' Release: '+ element.release_date +' '+
                            'Character: ' + element.character+' '+
                            '</li>'


                    });
                    $('#pModalMovies').html(movie);
                });
            })





                $(".personModal").css("display", "block");
                $("#pclose").on("click", function () {
                    $("#personModal").css("display", "none");
                });
            });
        });


    }


    function movieHandler(data) {
        let composer = '';
        let producer = '';
        let eProducer = '';
        let writer = '';
        let director = '';
        let genres = '';
        let production_companies = '';
        let actor = '';
        var movieResults = '';
        data.results.forEach(element => {

            movieResults += '<div id="movie-info-box" class="divClass">'
            movieResults += '<span hidden id="movieId">' + element.id + '</span>';
            movieResults += 'Title: <span id="title">' + element.title + '</span>' + '<br>';
            movieResults += 'Release Date: <span id="release-date">' + element.release_date + '</span>' + '<br>';
            movieResults += 'Language: <span id="language">' + element.original_language + '</span>' + '<br>';
            movieResults += '</div>'
            console.log("title: " + element.title);
            console.log("id: " + element.id);

        });
        $('#movieContainer').html(movieResults);
        $('#movieContainer').show();

        $(".divClass").click(function () {
            var specificResult = '';
            let id = $(this).find("#movieId").text();
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
                        if (element.job === "Director")
                            director += '<li>' + element.name + '</li>'
                    });
                    $('#modalDirectors').html(director);
                    data.crew.forEach(element => {
                        if (element.job === "Writer")
                            writer += '<li>' + element.name + '</li>'
                    });
                    $('#modalScriptWriters').html(writer);
                    data.crew.forEach(element => {
                        if (element.job === "Executive Producer")

                            eProducer += '<li>' + element.name + '</li>'
                    });
                    $('#modalExecutives').html(eProducer);
                    data.crew.forEach(element => {
                        if (element.job === "Producer")
                            producer += '<li>' + element.name + '</li>'
                    });
                    $('#modalProducers').html(producer);
                    data.crew.forEach(element => {
                        if (element.job === "Original Music Composer")
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



