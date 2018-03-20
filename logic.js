
//Initialize firebase
console.log("sanity");
var config = {
    apiKey: "AIzaSyCtqfjYiQK2p1HKg99koo3spZUlYJPR7bI",
    authDomain: "fir-train-7f200.firebaseapp.com",
    databaseURL: "https://fir-train-7f200.firebaseio.com",
    projectId: "fir-train-7f200",
    storageBucket: "fir-train-7f200.appspot.com",
    messagingSenderId: "765548561674"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // on click event that targets submit button

  $("#add-train-btn").on("click", function(e){
    e.preventDefault();

    //grabs user input from form fields
    var trainName = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
      name: trainName,
      destination: destination,
      time: trainTime,
      frequency: frequency
    };

    database.ref().push(newTrain);

    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

    alert("Choo Choo!");
    
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });

  //create firebase event for adding employee to the database and a row in the html current train scheudle
  
  //database.ref().on("child_added", function(childSnapshot, prevChildKey){

      //console.log(childSnapshot.val());
    
    //var trainName = childSnapshot.val().name;
    //var destination = childSnapshot.val().destination;
    //var trainTime = childSnapshot.val().time;
    //var frequency = childSnapshot.val().frequency;

    //console.log(trainName);
    //console.log(destination);
    //console.log(trainTime);
    //console.log(frequency);

    //child database firebase
  database.ref().orderByChild("dateAdded").limitToLast(100).on("child_added", function(snapshot) {
  //pull the values from firebase
  var trainName = snapshot.val().name;
  var destination = snapshot.val().destination;
  var trainTime = snapshot.val().time;
  var frequency = snapshot.val().frequency;
  //convert time
  var firstTimeConverted = moment(trainTime, "HH:mm a").subtract(1, "years");
  console.log(firstTimeConverted);
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  console.log(timeDiff);
  //divide minutes / frequency = get remainder
  var remainder = timeDiff % frequency;
  console.log(remainder);
  //subtract current time from the first train value in minutes
  var minsAway = frequency - remainder;
  console.log(minsAway);
  //add time till next train to current = time of next train
  var timeOfNext = moment().add(minsAway, "minutes");
  //format for military time
  var nextTrainMil = moment(timeOfNext).format("HH:mm");

    //adds data to train table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrainMil+ "</td><td>" + minsAway +"</td></tr>");

  });