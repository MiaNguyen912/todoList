const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy grocery", "Make dinner", "Learn more code"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); //let server use our static folder public

app.get("/", function (req, res) {
    let today = new Date();
    let options = {  //to format the day on javacript
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
    res.render("list", { kindOfDay: day, newListItem: items });

});

app.post("/", function(req, res){
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");  //when post request is triggered, we same the req.body.newItem and redirect to "/", where there is new item updated in list
})

app.listen(3000, function () {
    console.log("server is running on port 3000");
});


// if (kindOfDay === "Saturday" || kindOfDay === "Sunday"){   <!--<% is scriptlet tag, for control-flow, no output--> 
//     <h1 style="color: purple"><%= kindOfDay %> To Do List</h1>   <!-- <%= will output the value into the template (html escape)-->
// } else {
//     <h1 style="color: blue"><%= kindOfDay %> To Do List</h1>
// } 
