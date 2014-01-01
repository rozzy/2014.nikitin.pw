function addGithubContributions (contribs) {
  console.log(contribs);
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

      $('#timeline #dy'+year+' div:eq('+day.getDOY()+')').attr("title", monthNames[day.getMonth()] + ', ' + day.getDate());
      border_color = $('#timeline #dy'+year+' div:eq('+day.getDOY()+')').css('border-color');
      if (day.getDate() == 1 && year == 2013) $('#timeline #dy'+year+' div:eq('+day.getDOY()+')').append($("<span/>", {html: monthNames[day.getMonth()].substr(0, 3), class: 'month_name', css: {color: border_color}}));
      if ($('#timeline #dy'+year+' div:eq('+day.getDOY()+') .github_contrubutions').size() > 0) $('#timeline #dy'+year+' div:eq('+day.getDOY()+') .github_contrubutions span').css('border-color', border_color);
      date.setDate(date.getDate() + 1); 
    }

    $("#timeline .days div:eq("+(days.length + 1)+")").css({height: 20, marginBottom: -5});
    $('#timeline #dy2013 div:last').css({height: 50, marginBottom: -20});
}

$(function() {
  mobile = $('.mobile').css("display") != "block"

  if (!mobile) {
    $("#timeline").mousewheel(function(event, delta) {
      this.scrollLeft -= (delta * 30);
      event.preventDefault();
    });
  }

  $('#timeline').css('overflow', 'hidden');

  Date.prototype.getDOY = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((this - onejan) / 86400000);
  }

  days = [];
  monthNames = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];
  
  $.get('https://github.com/users/rozzy/contributions_calendar_data?_=1388576157349', function (a) {
    s = [];
    $.each(a, function (b, c) {s[b] = c[1];});
    addGithubContributions(s);
  });

  $('#timeline #dy2013 div:last').append($("<span/>", {html: '2014', class: 'month_name huge_cap'}));
      
  for (i = 0; i < 12; i++) getDaysInMonth(i, 2013);
  for (i = 0; i < 3; i++) getDaysInMonth(i, 2014);
});