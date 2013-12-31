$(function() {
  mobile = $('.mobile').css("display") != "block"
  



  alert("upd");



  $("#timeline").mousewheel(function(event, delta) {
    this.scrollLeft -= (delta * 30);
    event.preventDefault();
  });

  days = [];
  monthNames = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];
  function getDaysInMonth(month, year) {
       var date = new Date(year, month, 1);
       
       while (date.getMonth() === month) {
          day = new Date(date);
          console.log(day.getDate());
          days.push(monthNames[day.getMonth()] + ', ' + day.getDate());
          date.setDate(date.getDate() + 1);
       }
       $("#timeline .days div:eq("+days.length+")").css({height: 20, marginBottom: -5});
  }
      
  for (i = 0; i < 12; i++) getDaysInMonth(i, 2013);
  console.log(days.length);
});