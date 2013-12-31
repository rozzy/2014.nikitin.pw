

$(function() {

   $("#timeline").scroll(function(event, delta) {
    console.log("t");
      this.scrollRight -= (delta * 30);
    
      event.preventDefault();

   });

  days = [];
  monthNames = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];
  function getDaysInMonth(month, year) {
       // Since no month has fewer than 28 days
       var date = new Date(year, month, 1);
       
       while (date.getMonth() === month) {
          day = new Date(date);
          days.push(monthNames[day.getMonth()] + ', ' + day.getDate());
          date.setDate(date.getDate() + 1);
       }
  }
      
  for (i = 0; i < 12; i++) getDaysInMonth(i, 2013);
  console.log(days.length);
});