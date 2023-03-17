//this is a js module we created, which will provide helping functions like how we use express or body-Parser modules to get helping functions
//we can use this module inside app.js or other files
//console.log(module);  //print out the info of this module

module.exports.getDate = getDate; //the module.exports is an object created by the Module system
                            //we can just use the "exports" keyword
                            //if we use getDate(), we will call the function right away when app.js read to "const date = require(__dirname + "/date.js");"
                            //we don't want that to happen, we want to let the app.js determine when to call it
function getDate(){
    const today = new Date();
    const options = {  //to format the day on javacript
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let day = today.toLocaleDateString("en-US", options);  //day will be "Monday" to "Sunday", this method is equal to the switch statement below

    // let currentDay = today.getDay();
    // let day = "";
    // switch (currentDay) {
    //     case 0:
    //         day = "Sunday";
    //         break;
    //     case 1:
    //         day = "Monday";
    //         break;
    //     case 2:
    //         day = "Tuesday";
    //         break;
    //     case 3:
    //         day = "Wednesday";
    //         break;
    //     case 4:
    //         day = "Thursday";
    //         break;
    //     case 5:
    //         day = "Friday";
    //         break;
    //     case 6:
    //         day = "Saturday";
    //         break;
    //     default:
    //         console.log("Error: current day is equal to: " + currentDay);
    //}
    return day;
}

//--------------------------------------------------------


exports.getDay = function getDay (){  //get the day of the week
    const today = new Date(); 
    const options = {  //format the day on javacript to just get the weekday only
        weekday: "long",
    }
    return today.toLocaleDateString("en-US", options); 
}

