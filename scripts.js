$(function($) {

  // var apiUrl = "http://pokeapi.co/api/v2/pokemon/"
  // var apiUrl = "http://localhost:8080/types?name=pikachu";
  // var apiUrl = "http://localhost:8080/addFavorite?name=pikachu?user=8"

  var apiUrl = "http://localhost:8080";
  var $pokemonIdInput = $("#pokemonId");
  var $pokemonsIdsInput = $("#pokemonsIds");
  var $userIdInput = $("#userId");
  var $getPokemonTypeByIdButton = $("#getPokemonTypeById");
  var $addPokemonToFavButton = $("#addPokemonToFav");
  var sourceFav = $("#pokemonFavTemplate").html();
  var templateFav = Handlebars.compile(sourceFav);
  var sourceType = $("#pokemonTypeTemplate").html();
  var templateType = Handlebars.compile(sourceType);
  var $pokemonInfo = $("#pokemonInfo");


  function getPokemonTypes(id) {
    $.ajax({
      type: "GET",
      url: apiUrl + "/types?name=" + id,
        success: function(resp) {
            $pokemonInfo.html(templateType({resp}));
        },
      error: function(e) {
        console.log(e);
      }
    });
  };



  function getPokemonTypesJson(id) {
    $.ajax({
      dataType: 'json',
      url: "http://localhost:8080/types?name=" + id, type: 'get', contentType: 'application/json',
      data: JSON.stringify({}), success: function () {
        $pokemonInfo.html(templateType({resp}));
      },
      error: function (e) {
        console.log(e);
      }
    });
  };

  function userIdsToArray(args) {
    return args.split(",");
  };

  $getPokemonTypeByIdButton.click(function() {
    var id = parseInt($pokemonIdInput.val(), 10);

    if (!id) {
      alert("por favor, pon un numero de id en el campo");
      return;
    }
      getPokemonTypes(id);
  });

  function postPokemonFavorites(pokemonsIds, userIdInput) {
    var url =
        apiUrl +
        "/addFavorite?name=" + pokemonsIds + "&user=" + userIdInput;

    $.ajax({
      type: "POST",
      url: url,
      success: function(resp) {
        $pokemonInfo.html(
            templateFav({resp})
        );
      },
      error: function(e) {
        console.log(e);
      }
    });


  };

  function postPokemonFavoritesJson(pokemonsIds, userIdInput) {
    $.post({
      dataType: 'json',
      url: "http://localhost:8080/addFavorite?name=" + pokemonsIds + "&user=" + userIdInput, type: 'post', contentType: 'application/json',
      data: JSON.stringify( { }), success: function() {
        $pokemonInfo.html(templateFav({resp}));
      },
      error: function(e) {
        console.log(e);
      }
    });

  };

  $addPokemonToFavButton.click(function() {
    var pokemonsIds = parseInt($pokemonsIdsInput.val(), 10);
    var userIdInput = parseInt($userIdInput.val(), 10);

    if (!pokemonsIds) {
      alert("por favor, pon un numero de id en el campo pokemons Ids");
      return;
    }

    if (!userIdInput) {
      alert("por favor, pon un numero de id en el campo user Id");
      return;
    }

    postPokemonFavorites(pokemonsIds, userIdInput);


  });
});

