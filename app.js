const express= require("express");
const bodyParser = require("body-parser");
const request= require("request");
const https= require("https");

const app=express();

app.use(express.static("public"));//for using static files
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" ,function(req,res){
    res.sendFile(__dirname+ "/signup.html");
});

app.post("/" ,function(req,res){ //posting started
    const firstName=req.body.fName;
    const secondName=req.body.lName;
    const email=req.body.email;
    // console.log(firstName,secondName,email);
    
    const data={
        members:[
            {
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:secondName
            }
        }
        ]
    };
    const jsonData= JSON.stringify(data);//for making datas in string
    const url='https://us21.api.mailchimp.com/3.0/lists/f0d380682b';
    const options={
        method:"POST",
        auth:"ashish1:53eb1d9820ea53724b9d5e4f83bbd477-us21"
    }
   
    const request= https.request(url,options, function(response){
        
        if(response.statusCode==200){
            res.sendFile(__dirname+ "/success.html");
        }
        else{
            res.sendFile(__dirname+ "/failure.html");
        }
     
        response.on("data", function(data){
    console.log(JSON.parse(data));
})
    })

    request.write(jsonData);
    request.end();
});//posting end

app.post("/failure" ,function(req,res){
res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
//APi
//

//LIST id
//f0d380682b