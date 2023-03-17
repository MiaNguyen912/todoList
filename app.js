const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");  //date.js is the module we created by our own, not installed by npm
                                                //when we run node app.js in terminal, it will go to date.js and read everything in their
//console.log(date()); //print out what is exported from the date module, which is function getDate, we add () to call the function and get the returned value


const app = express();

const items = ["Buy grocery", "Make dinner", "Learn more code"]; //we can change item inside const arrays, but cant assign them to other arrays
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); //let server use our static folder public

app.get("/", function (req, res) {
    // let day = date.getDate();  //"date.getDate" get what is exported from the date module, which is function getDate, we add () to call the function and get the returned value
    let day = date.getDay();

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


