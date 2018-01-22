
      var topics = ["dog", "cat", "snake", "lion",  "bird",
            "monkey", "pig", "eagle", "fox",  "horse",
            ];
  // Generic function for capturing the movie name from the data-attribute
      function alertMovieName() {
       $("#animal-array").empty();
       

      var topic = $(this).attr("data-name");
      //alert(topic);
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
         //alert(results.length);
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='data-animal'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);

           
            

            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

 





            $("#animal-array").prepend(gifDiv);

          }

        });
    }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise we will have repeat buttons)
        $("#animal-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button><");
          // Adding a class
          // a.addClass("topic");
          // // Added a data-attribute
          // a.attr("data-name", topics[i]);
          // // Provided the initial button text
          // a.text(topics[i]);
          // // Added the button to the HTML



           // a.addClass("data-animal");
            a.addClass("topic");
           
          // Added a data-attribute
          a.attr("data-name", topics[i]);
          //console.log(topics[i]);
          // Provided the initial button text
          a.text(topics[i]);
          //b =
          $("#animal-view").append(a);

        }
        
      }

      // This function handles events where one button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var topic = $("#animal-input").val().trim();

        // The movie from the textbox is then added to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Function for displaying the movie info
      // We're adding a click event listener to all elements with the class "movie"
      // We're adding the event listener to the document itself because it will
      // work for dynamically generated elements
      // $(".movies").on("click") will only add listeners to elements that are on the page at that time
      $(document).on("click", ".topic", alertMovieName);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
