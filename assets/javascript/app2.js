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

  var database = firebase.database();
  database.ref().on("value", function(snapshot) {

  var data = snapshot.val();
  $('.newStuff').empty();

  $.each(data, function(key, value){
    
    var newRow = $('<tr>');
    
    newRow.addClass(".newStuff")
    
    var name1 = $('<td>');
    var dest1 = $('<td>');  
    var freq1 = $('<td>');
    var time1 = $('<td>');
    var nextTrain1 = $('<td>');
    var minutesAway1 = $('<td>');
    var remove1 = $('<td>');

    console.log('next1 ', nextTrain1)

    var frequency=value.freq;
    var firstTime=value.time;
    console.log('frequency', frequency);
    console.log('firstTime', firstTime);

    console.log('firstTime type:', typeof firstTime);

    var myMoment = moment(firstTime, "HH:mm");
    myMoment.format("HH:mm");
    console.log('myMoment: ', myMoment);
    console.log('myMoment type: ', typeof myMoment);

    var timeDifference = moment().diff(moment.unix(myMoment*(-1)), "minutes");
    var minutesAway = frequency-(timeDifference%frequency);
    var nextTrain = moment().add(minutesAway, "minutes").format('HH:mm');

    name1.text(value.name);
    dest1.text(value.dest);
    freq1.text(value.freq);
    time1.text(value.time);
    nextTrain1.text(nextTrain);
    minutesAway1.text(minutesAway);
    

    console.log('timeDifference: ', timeDifference);
    console.log('minsAway: ', minutesAway);
    console.log('nextTrain: ', nextTrain);

    newRow.append(name1)
    newRow.append(dest1)
    newRow.append(freq1)
    newRow.append(nextTrain1)
    newRow.append(minutesAway1)

    $('#table').append(newRow);
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
      freq:freq2,
    })

  $('#form').reset();

  return false;
  })
});

