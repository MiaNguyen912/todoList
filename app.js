const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy grocery", "Make dinner", "Learn more code"];
let workItems = [];

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
    res.render("list", { listTitle: day, newListItem: items });

});

app.post("/", function(req, res){
    let item = req.body.newItem;
    // items.push(item);
    // res.redirect("/");  
    //console.log(req.body);  //req.body includes <input> (name="newItem") and <button> (name="list") inside <form> in the list.ejs
                              //in <form>, action="/", so it will post the added content in "/" eventhough we post from /work
                              //we use the if-else below to fix this problem:
    if(req.body.list === "Work"){  //when we post in /work, the listTitle is "Work List", which is shown as "Work" in req.body.list
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");  //when post request is triggered, we add req.body.newItem to the items array and redirect to "/", where there is new item updated in list

    }
})

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItem: workItems});
});
// app.post("/work", function(req, res){
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
// })

app.get("/about", function(req, res){
    res.render("about");
})

app.listen(3000, function () {
    console.log("server is running on port 3000");
});


