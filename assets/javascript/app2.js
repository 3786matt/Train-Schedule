// console.log('hello')
 var config = {
  apiKey: "AIzaSyDhedaxXi6_taQ3k5GThqOKM-VicYZ9N-A",
  authDomain: "train-3db07.firebaseapp.com",
  databaseURL: "https://train-3db07.firebaseio.com",
  storageBucket: "train-3db07.appspot.com",
  messagingSenderId: "676392197807"
 };
 firebase.initializeApp(config);

$(document).ready(function(){

  var dateTime=null;
  var date1=null;

  var update=function(){
    date1=moment(new Date())
    dateTime.html(date1.format('MMMM Do YYYY, HH:mm:ss'));
  };

  dateTime=$('#clock');
  update();
  setInterval(update, 1000);


  var test =moment().add(30, 'm');


  // console.log(test);

  var database = firebase.database();
  database.ref().on("value", function(snapshot) {

  var data = snapshot.val();
  $('.newStuff').empty();
  // console.log('testtest')
  $.each(data, function(key, value){
    // console.log(key, value);

    var newRow = $('<tr>');
    
    newRow.addClass(".newStuff")
    
    var name1 = $('<td>');
    var dest1 = $('<td>');  
    var freq1 = $('<td>');
    var time1 = $('<td>');

    name1.text(value.name)
    dest1.text(value.dest)
    freq1.text(value.freq)
    time1.text(value.time)

    var frequency=value.freq;
    var firstTime=value.time;
    console.log('frequency', frequency);
    console.log('firstTime', firstTime);

    // var newTime=moment(new Date(firstTime));
    // console.log('newTime:', newTime);

    var timeDifference = moment().diff(moment.unix(firstTime), "minutes");
    var minutesAway = frequency-(timeDifference%frequency);
    var nextTrain = moment().add(minutesAway, "minutes").format('HH:mm');

    console.log(timeDifference);
    console.log(minutesAway);
    console.log(nextTrain);


    newRow.append(name1)
    newRow.append(dest1)
    newRow.append(freq1)
    newRow.append(nextTrain)
    newRow.append(minutesAway)
    

    $('#table').append(newRow);

    var nextTrain;
    var minsToArrival;

    // var firstArrivalToCurrent = moment(time2).diff(moment(), "minutes")*(-1);
    // console.log(firstArrivalToCurrent);


  });


 });

  $("#submit").on('click', function(){

    var name2 = $("#name2").val().trim();
    var dest2 = $("#dest2").val().trim();
    var time2 = $("#time2").val().trim();
    var freq2 = $("#freq2").val().trim();

    
  $('#tbody').text('');

    database.ref().push({
      name:name2,
      dest:dest2,
      time:time2,
      freq:freq2
    })

$('#form').reset();





return false;

})



});

