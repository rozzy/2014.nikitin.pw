function chainFadein (objects) {
  start = 500; 
  $(objects.get().reverse()).each(function (a, b) {
    setTimeout(function () {$(b).fadeTo(0.0, 1.0);}, start)
    start += 20;
  });
}

function addGithubContributions (contribs) {
  contribs = JSON.parse(contribs);
  $.each(contribs, function (key, data) {
    if (data[1] > 0) {
      $('.days div[date="'+data[0]+'"]').append("<span class='github_wrapper'><span class='github_contrubutions'></span></span>");
      for (var i = 0; i < data[1]; i++) {
        $('<span/>', {k: key + i, css: {borderColor: $('.days div[date="'+data[0]+'"]').css('border-color'), opacity: 0.0}, title: data[1]+" github contributions"}).appendTo('.days div[date="'+data[0]+'"] .github_wrapper .github_contrubutions');
      }    
      chainFadein($('.days div[date="'+data[0]+'"] .github_contrubutions').children());
    }
  });
  $("#timeline .days div[title='Today'] .github_contrubutions span").css({marginLeft: 0, 'border-width': 2});
}

function switchYear () {
  year = $('#today_line').offset().left > $('#timeline .days #dy2014').offset().left - 10 ? '2014' : '2013';
  // year = $('#timeline .days #dy2014').offset().left <= 732 ? '2014' : '2013';
    // getting active date
    // a = $('.days #dy' + year, document.body).children().filter(function () {
    //   todayOffset = (-1 * $('#timeline .days #dy' + year).offset().left) + $(window).width()/2;
    //   innerOffset = 5;
    //   return this.offsetLeft >= todayOffset - innerOffset && this.offsetLeft <= todayOffset + innerOffset;
    // });
    // console.log(a);
    if ($('.yearstamp.active').attr('id') != '#y' + year) {
      $('.yearstamp.active').addClass('hidden').removeClass('active');
      $('.yearstamp#y' + year).addClass('active').removeClass('hidden');
    }
}

function plusZero (num, month) {
  num = month ? num + 1 : num;
  if (num > 9) return num;
  return '0' + num;
}

function highlightTip () {
  if ($('.drag_tip').size() > 0) {
    $('.drag_tip').toggleClass('active');
    setTimeout(highlightTip, 5000);
  }
}

function getPeriodPosition (date) {
  if ($('.days div[date="'+ date +'"]').size() > 0) {}
  else return buildDate();
}

function createPeriod (start, end) {
  if ($('.days div[date="'+ start +'"]').size() > 0) {
    start_pos = getPeriodPosition(start);
    end_pos = getPeriodPosition(end);
    console.log('length: ', length);
  }
}

function buildDate (year, month, day) {
  return year + '/' + plusZero(month, true) + '/' + plusZero(day);
}

function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    
    var numberOfItems = 90;
    var rainbow = new Rainbow(); 
    rainbow.setNumberRange(1, numberOfItems);
    rainbow.setSpectrum('#C0D8E8', '#8DA7D0');
    for (var i = 0; i < numberOfItems; i++) $("#dy2014 div:eq("+i+")").css("border-color", '#'+rainbow.colourAt(i));

    while (date.getMonth() === month) {
      day = new Date(date);
      days.push(monthNames[day.getMonth()] + ', ' + day.getDate());

      $('#timeline #dy'+year+'>div:eq('+day.getDOY()+')').attr("title", monthNames[day.getMonth()] + ', ' + day.getDate()).attr('date', buildDate(year, day.getMonth(), day.getDate()));
      border_color = $('#timeline #dy'+year+' div:eq('+day.getDOY()+')').css('border-color');
      if (day.getDate() == 1 && year == 2013) $('#timeline #dy'+year+' div:eq('+day.getDOY()+')').append($("<span/>", {html: monthNames[day.getMonth()].substr(0, 3), class: 'month_name', css: {color: border_color}}));
      if ($('#timeline #dy'+year+' div:eq('+day.getDOY()+') .github_contrubutions').size() > 0) $('#timeline #dy'+year+' div:eq('+day.getDOY()+') .github_contrubutions span').css('border-color', border_color);
      date.setDate(date.getDate() + 1); 
    }
    $("#timeline .days div:eq("+(days.length + 1)+")").css({height: 20, marginBottom: -5});

    today = new Date();
    $("#timeline .days div[date='"+(buildDate(today.getFullYear(), today.getMonth(), today.getDate()))+"']").attr('title', 'Today').css({height: 20, borderWidth: 2, marginBottom: -5});
    $('#timeline #dy2013 div:last').css({height: 50, marginBottom: -20});
}

$(function() {
  mobile = $('.mobile').css("display") != "block"

  $('#timeline').css('overflow', 'hidden');
  $('.fadein').css('opacity', 0.0);

  Date.prototype.getDOY = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((this - onejan) / 86400000);
  }

  days = [];
  monthNames = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

  $('#timeline #dy2013 div:last').append($("<span/>", {html: '2014', class: 'month_name huge_cap'}));
      
  for (i = 0; i < 12; i++) getDaysInMonth(i, 2013);
  for (i = 0; i < 3; i++) getDaysInMonth(i, 2014);
  $('#timeline .days #dy2013 .month_name:first').css('left', 0);
  
  highlightTip();

  sly = new Sly($('#timeline'), {
    horizontal: true,
    itemSelector: '.days',
    mouseDragging: 1,
    touchDragging: 1,
    releaseSwing: 1,
    scrollBy: 100,
    startAt: 0
  });

  sly.one('load', function () {
    $.get('contribs.js', addGithubContributions);
    $('#timeline, .fadein').fadeTo(1500, 1.0);
    if (!mobile) $(window).resize(function () {
      switchYear();
      sly.reload();
      console.log($('#timeline .days #dy2014').offset().left);
    });
    createPeriod("2013/02/10");
    sly.slideTo($('.days div[title="Today"]').offset().left - $(window).width()/2);
    
    $('#timeline').bind('mousedown', function () {
      $(this).removeClass('grab').addClass('grabbing');
    });

    $('#timeline').bind('mouseup', function () {
      $(this).removeClass('grabbing').addClass('grab');
    });
    
    sly.on('moveStart', function () {
     $('.drag_tip').addClass('removed');
     setTimeout(function () {$('.drag_tip').parent().remove();}, 4000);
    });

    sly.on('moveEnd', switchYear);
  });
  sly.init();
});