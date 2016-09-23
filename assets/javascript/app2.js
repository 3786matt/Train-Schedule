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

    // var timeDifference = moment().diff(moment.unix(trainFirst), "minutes");
    // var minutesAway = trainFrequency - (timeDifference % trainFrequency);
    // var nextTrain = moment().add(minutesAway, "minutes").format('HH:mm');

    // var timeDifference = moment().diff(moment.unix(firstTime), "minutes");
    // var minutesAway = frequency-(timeDifference%frequency);
    // var nextTrain = moment().add(minutesAway, "minutes").format('HH:mm');

    // console.log(timeDifference);
    // console.log(minutesAway);
    // console.log(nextTrain);

    // console.log('freq2',freq2);
    // console.log('minsaway= ', minutesAway);
    // console.log('next=', nextTrain);
  
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

    var newTime=moment(new Date(firstTime));
    console.log('newTime:', newTime);

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

    var firstArrivalToCurrent = moment(time2).diff(moment(), "hours")*(-1);
    console.log(firstArrivalToCurrent);


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

// 1) how do i use moment js to add the frequency variable to the current time(in order to get the next train time)?

// 2) how do i use moment js to subtract the current time from the next train time (in order to get the mins away)?

// 3) how do i make the above 2 happen for each entry and display it to the page?

// 4)how do i get the form fields to clear when i click the submit button? This was working, but stopped at some point.

// 5)how do i delete data with a button from the front end and database?

  

// // Determine when the next train arrives.
// var timeDifference = moment().diff(moment.unix(trainFirst), "minutes");
// var minutesAway = trainFrequency - (timeDifference % trainFrequency);
// var nextTrain = moment().add(minutesAway, "minutes").format('HH:mm');


    // var convertedDate = moment(new Date(time1));
    // console.log('test1: '+ convertedDate);

//add data attribute to reference the object key;
    //pass that key into a firebase .remove() function
    

    //for moment subtraction use diff

//   var converted = moment(new Date(value.freq2)).format('X');
// console.log(converted);

// $('.newStuff').on('click', function(){
//   $('.newStuff').empty();

// });

// var timeDifference = moment().diff(moment.unix(trainFirst), "minutes");
// var minutesAway = trainFrequency - (timeDifference % trainFrequency);
// var nextTrain = moment().add(minutesAway, "minutes").format('HH:mm');
  
// var calc function(){
//   var timeDifference = moment().diff(moment.unix(time2), "minutes");
//   var minutesAway = freq2-(timeDifference%freq2);
//   console.log('freq2',freq2);
//   var nextTrain = moment().add(minutesAway, "minutes").format('HH:mm');
// console.log('minsaway= '+minutesAway);
// console.log('next=', nextTrain);
  // $('#nextTime').text(nextTrain);
  // $('#minsAway').text(minutesAway);


  // var nextArrival1;

  //  nextArrival = moment(new Date())+$("#freq2").val().trim();


  //   nextArrival1=moment(nextArrival).format('MMMM Do YYYY, HH:mm:ss');

  // console.log('next:' + nextArrival);
  //   console.log('next1:' + nextArrival1);