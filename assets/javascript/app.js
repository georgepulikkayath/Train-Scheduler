$(document).ready(function(){
var config = {
  apiKey: "AIzaSyBSsYeOoDW2mbwstS5xejY-r0-uaYMEBfc",
  authDomain: "train-c8d1d.firebaseapp.com",
  databaseURL: "https://train-c8d1d.firebaseio.com",
  projectId: "train-c8d1d",
  storageBucket: "train-c8d1d.appspot.com",
  messagingSenderId: "1067055114449"
};
 
firebase.initializeApp(config);

var database = firebase.database();


    $(".btn").on("click",function(event){
      event.preventDefault();
    
      debugger
var tname=$("#trainname").val();
var destination=$("#dest").val();
var ft=$("#tt").val();
var freq=$("#fr").val();
console.log(freq);
var firstTimeConverted = moment(ft, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    var tRemainder = diffTime % freq;
    console.log(tRemainder);
    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextt=moment(nextTrain).format("hh:mm");
    console.log("ARRIVAL TIME: " + nextt);
    var addTrain = {
      trainname:tname,
      destination:destination,
      Frequency:freq,
      nextArrival:nextt,
      MinutesAway:tMinutesTillTrain

    };
    debugger
database.ref().push(addTrain);
$("#trainname").val("");
$("#dest").val("");
$("#tt").val("");
$("#fr").val("");

});
database.ref().on("child_added",function(childSnapshot){
  var tname=childSnapshot.val().trainname;
  var dest=childSnapshot.val().destination;
  var fr=childSnapshot.val().Frequency;
  var na=childSnapshot.val().nextArrival;
  var ma=childSnapshot.val().MinutesAway;
  var newRow = $("<tr>").append(
    $("<td>").text(tname),
    $("<td>").text(dest),
    $("<td>").text(fr),
    $("<td>").text(na),
    $("<td>").text(ma),
    
  );
  $("#tablet > tbody").append(newRow);
});
});
