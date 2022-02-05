

$(document).ready(function () {


  $("#menu").slideUp(0);

  let sort = `


<div class="sortSelect">
<i class="fas fa-sort-amount-down" id="sort"></i> 
<select name="Sortby" id="sortMovies">
  <option value="yrs">by Year</option>
  <option value="rat">Rating</option>
  <option value="dur">Duration</option>
  </select> </div> 


  `;

  $(".innerSort").html(sort);
  $("#sort").fadeOut(0);
  $("#sortMovies").animate({ width: 'toggle' }, { duration: 0 });



  $("#search").click(function () {
    $("#menu").slideToggle(300);

  });



  $("#ok").click(function () {

    $("#sort").fadeIn(3000);
    $("#sortMovies").animate({ width: 'toggle' }, { duration: 1000 });

    let now = document.getElementById("rw1");
    if (now != undefined) {
      now.remove();
    }

    let txt = searchTxt.value;
    moviedata(txt).then((data) => {
      console.log(data.Search);
      let lenght = countProps(data.Search);

      let row = document.createElement('div');
      row.className = 'row';
      row.setAttribute("id", "rw1");
      let rowdiv = document.createElement('div');
      rowdiv.className = 'col-12';
      console.log(data.Search);

      for (let i = 0; i < lenght; i++) {



        let div = document.createElement('div');
        div.className = 'form-group';
        div.setAttribute("class", "col-xs-6 col-sm-2  text-center");
        let img = document.createElement("img");
        img.setAttribute("src", data.Search[i].Poster);
        img.className = "ckc";
        img.style.margin = 20 + 'px';
        img.style.marginTop = 60 + 'px';
        img.style.width = 80 + '%';
        img.style.height = 70 + '%';

        let title = document.createElement("h5");
        title.setAttribute("class", "text-center");
        title.innerHTML = data.Search[i].Title;
        div.appendChild(img);
        div.appendChild(title);

        row.appendChild(div);
        rowdiv.appendChild(row);
        document.body.appendChild(rowdiv);

        div.onclick = function () {
          window.localStorage.setItem('movie', JSON.stringify(data.Search[i]));
          window.location = 'movieinfo.html';
        }

      }

    }).catch(err => {
      console.log(err);
    })




  });


  async function moviedata(txt) {

    const response = await fetch('https://www.omdbapi.com/?apikey=e69d7805&s=' + txt);
    const jsondata = await response.json();
    return jsondata;
  }
  function countProps(obj) {
    let count = 0;
    for (let p in obj) {
      obj.hasOwnProperty(p) && count++;
    }
    return count;
  }

  $('#sortMovies').change(function () {

    // treba bolji api da bi se mogao odraditi sort kako treba 
    if ($('#sortMovies option:selected').val() == 'yrs') {

    }
    else {

    }
  });

});


function load() {
  console.log(window.localStorage.getItem('movie'));

  let movie = JSON.parse(window.localStorage.getItem('movie'));


  console.log(movie.Title);

  let output = `
<div class="row">
  <div class="col-md-3 col-sm-6 col-xs-6">
  <div class="text-center"> 
    <img src="${movie.Poster}"  style=" width: 80%; margin-top: 50px; ">
    </div>
    </div>
  <div class="col-md-3 col-sm-12" >
    <div class="h3" style="margin-top: 50px; ">Title: ${movie.Title}</div>
    <div class="h5" style="margin-top: 20px; ">Year: ${movie.Year}</div>
    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary" style=" background-color: rgb(25, 135, 84); margin-top: 70px; font-weight: bold; border-color: transparent;  ">View IMDB</a>
  </div>
  </div>
</div>

  
<hr>

`;

  $('.inner').html(output);

}

$('#btn1').click(function () {

  window.history.back();
});



