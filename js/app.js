"use strict";

const getAjax = {
  method: "get",
  datatype: "json",
};

$.ajax("./data/page-1.json").then((data) => {
// console.log(data);
  data.forEach((val, idx) => {
    let animal = new Animals(val.title,val.image_url,val.description,val.keyword);
    animal.renderCard();
    animal.renderOptions();
  });
  console.log(newArr);
});


let arr = [];
function Animals(title, image_url, description, keyword) {
  this.title = title;
  this.image_url = image_url;
  this.description = description;
  this.keyword = keyword;
  arr.push(this);
}

Animals.prototype.renderCard = function(){
  let imgSection = $("#photo-template").clone();
  let renH2 = $("#titleId").text(this.title);
  let renImg = $("#imgId").attr('src',this.image_url);
  let renParagraph = $('#paraId').text(this.description);
    $('main').append(imgSection);
  }
  
  
var newArr = [];
Animals.prototype.renderOptions = function(){
  if(!newArr.includes(this.keyword)){
    newArr.push(this.keyword);
    $('#select1').append(`<option id = "${this.keyword}" value = "${this.keyword}" >${this.keyword}</option>`);
  }
}

$('#select1').on("change", (evnt) => {
  $("#photo-template").empty();
  let md = "";
  $("#select1 option:selected").each(function () {
      md = $(this).text();
  });
  if(md==='Filter by Keyword'){
      location.reload();
  }
  arr.forEach((item, i) => {
      let type = item.keyword;
      console.log('type : '+type+' ,md: '+md);
      console.log( 'result :'+ md ===type);
      if (md===type) {
          console.log('reached hinsidde the condition');
          let div = $("<div></div>");
          let h2 = $("<h2></h2>").text(item.title);
          let imgEl = $("<img>").attr(`src`, item.image_url);
          let pEl = $("<p></p>").text(item.description);
          $("#photo-template").append(div);
          div.append(h2, imgEl, pEl);
      }
  })
});