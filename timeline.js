function addGithubContributions (contribs) {
  contribs = JSON.parse(contribs);
  $.each(contribs, function (key, data) {
    if (data[1] > 0) {
      $('.days div[date="'+data[0]+'"]').append("<span class='github_wrapper'><span class='github_contrubutions'></span></span>");
      for (var i = 0; i < data[1]; i++) {
        $('<span/>', {k: key + i, css: {borderColor: $('.days div[date="'+data[0]+'"]').css('border-color'), opacity: 0.0}, title: data[1]+" github contributions"}).appendTo('.days div[date="'+data[0]+'"] .github_wrapper .github_contrubutions');
        $('.days div[date="'+data[0]+'"] span[k="'+(key+i)+'"]').animate({opacity: 1.0}, 2500 + (Math.random() * 2000));
      }    
    }
  });
  $("#timeline .days div[title='Today'] .github_contrubutions span").css({marginLeft: 0, 'border-width': 2});
}

function plusZero (num, month) {
  num = month ? num + 1 : num;
  if (num > 9) return num;
  return '0' + num;
}

function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    
    var numberOfItems = 90;
    var rainbow = new Rainbow(); 
    rainbow.setNumberRange(1, numberOfItems);
    rainbow.setSpectrum('#C0D8E8', '#8DA7D0');
    for (var i = 0; i < numberOfItems; i++) $("#dy2014 div:eq("+i+"), #dy2013 div:eq("+(numberOfItems-i-1)+")").css("border-color", '#'+rainbow.colourAt(i));

    while (date.getMonth() === month) {
      day = new Date(date);
      days.push(monthNames[day.getMonth()] + ', ' + day.getDate());

      $('#timeline #dy'+year+'>div:eq('+day.getDOY()+')').attr("title", monthNames[day.getMonth()] + ', ' + day.getDate()).attr('date', year + '/' + plusZero(day.getMonth(), true) + '/' + plusZero(day.getDate(), false));
      border_color = $('#timeline #dy'+year+' div:eq('+day.getDOY()+')').css('border-color');
      if (day.getDate() == 1 && year == 2013) $('#timeline #dy'+year+' div:eq('+day.getDOY()+')').append($("<span/>", {html: monthNames[day.getMonth()].substr(0, 3), class: 'month_name', css: {color: border_color}}));
      if ($('#timeline #dy'+year+' div:eq('+day.getDOY()+') .github_contrubutions').size() > 0) $('#timeline #dy'+year+' div:eq('+day.getDOY()+') .github_contrubutions span').css('border-color', border_color);
      date.setDate(date.getDate() + 1); 
    }

    $("#timeline .days div:eq("+(days.length + 1)+")").css({height: 20, marginBottom: -5});

    today = new Date();
    $("#timeline .days div[date='"+(today.getFullYear() + '/' + plusZero(today.getMonth(), true) + '/' + plusZero(today.getDate()))+"']").attr('title', 'Today').css({height: 20, borderWidth: 2, marginBottom: -5});

    $('#timeline #dy2013 div:last').css({height: 50, marginBottom: -20});
}

$(function() {
  mobile = $('.mobile').css("display") != "block"

  $('#timeline').css('overflow', 'hidden');

  Date.prototype.getDOY = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((this - onejan) / 86400000);
  }

  days = [];
  monthNames = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];
  
  $.get('contribs.js', addGithubContributions);

  $('#timeline #dy2013 div:last').append($("<span/>", {html: '2014', class: 'month_name huge_cap'}));
      
  for (i = 0; i < 12; i++) getDaysInMonth(i, 2013);
  for (i = 0; i < 3; i++) getDaysInMonth(i, 2014);

  $('#timeline').fadeTo(1500, 1.0, function () {
    var sly = new Sly($('#timeline'), {
      horizontal: true,
      itemSelector: '.days',
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      keyboardNavBy: 'items',
      scrollBy: 10,
      startAt: 0
    }).init();
    sly.slideTo(($('.days div[title="Today"]').offset().left - 750), 2300);
  });

});