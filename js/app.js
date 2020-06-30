"use strict";

// globl vars
let mainPageStatus = true;
let secondPageStatus = false;

// getting JSON file
const getAjax = {
  method: "get",
  datatype: "json",
};

// import data from JSON file
$.ajax("./data/page-1.json").then((data) => {
  data.forEach((val, idx) => {
    let animal = new Animals(val);
    animal.renderCard();
    animal.renderOptions();
  });
});

// arrayOfObjectsay of objects
let arrayOfObjects = [];

// the constructor to create objects
function Animals(val) {
  this.title = val.title;
  this.image_url = val.image_url;
  this.description = val.description;
  this.keyword = val.keyword;
  this.horns = val.horns;
  arrayOfObjects.push(this);
}

// prototype to render the animal info
Animals.prototype.renderCard = function () {
  let animalInfoVar = $("#animalInfo").html();
  let newAnimal = Mustache.render(animalInfoVar, this);
  $("main").append(newAnimal);
};

// arrayOfObjectsay to prevent the duplicates
var uniqueOptions = [];

// this prototype for rendering the options for the dropmenu
Animals.prototype.renderOptions = function () {
  if (!uniqueOptions.includes(this.keyword)) {
    uniqueOptions.push(this.keyword);
    $("#select1").append(
      `<option id = "${this.keyword}" value = "${this.keyword}" >${this.keyword}</option>`
    );
  }
};

$("#secondPage").click(() => {
  mainPageStatus = false;
  secondPageStatus = true;
  $("main").empty();
  $("option:not(:first-child)").css("display", "none");
  $("header .fixed").css("display", "block");
  $.ajax("./data/page-2.json").then((data) => {
    data.forEach((val, idx) => {
      let animal = new Animals(val);
      animal.renderCard();
      animal.renderOptions();
    });
  });
});

$("#mainPage").click(() => {
  location.reload();
});

// this will render animal info depending on the selected option category
$("#select1").on("change", (evnt) => {
  $("main").empty();
  let nameAL = "";
  $("#select1 option:selected").each(function () {
    nameAL = $(this).text();
  });
  if (nameAL === "Filter by Keyword") {
    if (mainPageStatus) {
      location.reload();
    } else if (secondPageStatus) {
      $("#secondPage").trigger("click");
    }
  }
  arrayOfObjects.forEach((item, i) => {
    let type = item.keyword;
    if (nameAL === type) {
      let Templ = $("#animalInfo").html();
      let newobj = Mustache.render(Templ, item);
      $("main").append(newobj);
    }
  });
});

//select sort options
$("#selectSortMenu").change(() => {
  $("main").empty();
  let selected = $("#selectSortMenu option:selected").val();
  if (selected === "sort by horns") {
    sortByHorns();
  } else if (selected === "sort by title") {
    sortByTitle();
  }
});

//import json then sort base on horns prop
function sortByHorns(obj) {
  $.ajax("./data/page-1.json").then((data) => {
    data.sort((a, b) => {
      if (a.horns < b.horns) {
        return 1;
      } else if (a.horns > b.horns) {
        return -1;
      } else {
        return 0;
      }
    });
    console.log(data);
    data.forEach((val, idx) => {
      let animal = new Animals(val);
      animal.renderCard();
      animal.renderOptions();
    });
  });
}

function sortByTitle(obj) {
  $.ajax("./data/page-1.json").then((data) => {
    data.sort((a, b) => {
      if (a.title.toUpperCase() > b.title.toUpperCase()) {
        return 1;
      } else if (a.title.toUpperCase() < b.title.toUpperCase()) {
        return -1;
      } else {
        return 0;
      }
    });
    data.forEach((val, idx) => {
      let animal = new Animals(val);
      animal.renderCard();
      animal.renderOptions();
    });
  });
}