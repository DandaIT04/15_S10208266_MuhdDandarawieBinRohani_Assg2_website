// Submission Event
// <----------------------------------------------------------------------------------------------------->
$("#poke_form").submit(function(event){

  event.preventDefault() //prevent auto submission

  $("#poke_image").empty() //upon submission, values in website deleted automatically

  var search_poke = $("#search_poke").val()

  var url = "https://pokeapi.co/api/v2/pokemon/"+search_poke+"/" //api and search function


    // Test code var $poke_image = $('#poke_image');

  // Half of submission <----------------------------------------------------------------------------------------------------->

  // Check for errors  <----------------------------------------------------------------------------------------------------->
  $.ajax({
      
    method:'GET',
    url:url,

    statusCode: {
      404: function () {

          alert("Check Spelling!");
      }
  },
  // End of error checking <----------------------------------------------------------------------------------------------------->

  // If succeed <----------------------------------------------------------------------------------------------------->

    success:function(data){
      console.log(data)
      $('#poke_image').html('');

      $('#poke_image').append('<li class="list_image"> <img src="'+data.sprites.front_default+'"></li>');
      $('#poke_image').append('<li>Name: '+data.name+'</li>');
      $('#poke_image').append('<li>ID: '+data.id+'</li><br>');

      $('#poke_image').append('<li>stats</li>');
      
      $.each(data.stats, function(i,stat){
        $('#poke_image').append('<li>'+stat.stat.name +': '+ stat.base_stat + '</li>');
      })
      

      $('#poke_image').append('<br><li>Abilities</li>');

      $.each(data.abilities, function(i,ability){
        $('#poke_image').append('<li>'+ability.ability.name +'</li>');
      })

      $('#poke_image').append('<br><li>Game Version</li>');

      $.each(data.game_indices, function(i,game){
        $('#poke_image').append('<li>'+game.version.name +'</li>');
      })


      //add to local storage


        var pokemons = JSON.parse(localStorage.getItem("pokemonsInList")||"[]");
        var pokemon = {
          picture: data.sprites.front_default,
          name: data.name,
          id: data.id,
        };


        pokemons.push(pokemon);

        console.log(pokemon)
        localStorage.setItem("pokemonsInList", JSON.stringify(pokemons))

        /* To store an array for example HP,
        hp: data.stats[0].stat.name,

        But it is more difficult to store array information when it is not consistent
        If data.abilities[2].ability.name does not exist, an error appears.
        Pokemons can have more than 2 abilties or even less.
        */
    
      },

    })

  })

