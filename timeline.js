$(function() {
  mobile = $('.mobile').css("display") != "block"

  if (!mobile) {
    $("#timeline").mousewheel(function(event, delta) {
      this.scrollLeft -= (delta * 30);
      event.preventDefault();
    });
  }

  days = [];
  monthNames = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];
  
  function getDaysInMonth(month, year) {
       var date = new Date(year, month, 1);
       
       while (date.getMonth() === month) {
          day = new Date(date);
          days.push(monthNames[day.getMonth()] + ', ' + day.getDate());
          date.setDate(date.getDate() + 1); 
       }

      $("#timeline .days div:eq("+days.length+")").css({height: 20, marginBottom: -5});

      if (year == 2014) {
        var numberOfItems = 90;
        var rainbow = new Rainbow(); 
        rainbow.setNumberRange(1, numberOfItems);
        rainbow.setSpectrum('#C0D8E8', '#8DA7D0');
        for (var i = 0; i < numberOfItems; i++) $("#dy2014 div:eq("+i+")").css("border-color", '#'+rainbow.colourAt(i));
      }
  }
      
  for (i = 0; i < 12; i++) getDaysInMonth(i, 2013);
  for (i = 0; i < 3; i++) getDaysInMonth(i, 2014);
});