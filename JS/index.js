const express = require("express");
const app = express();
const path = require("path");
let port = 8080;

const { v4: uuidv4 } = require('uuid');
var methodoveride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodoveride('_method'));
 
app.set(`view engine`,`ejs`);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        s_no : 1,
        name: `Karan`,
        email : `karan12@gmail.com`,
        mobile : 8778643576,
        password : uuidv4(),
    },
    {
        s_no : 2,
        name: `Jasmeet`,
        email : `Jasmeet12@gmail.com`,
        mobile : 3468874457,
        password : uuidv4(),
    }
]
app.get("/posts",(req,res) => {
    res.render(`index.ejs`, {posts});
});
app.get("/posts/new",(req,res) => {
    res.render(`new.ejs`);
});
app.post("/posts",(req,res) => {
    let {name,email,mobile} = req.body;
    let s_no = posts.length+1;
    let password = uuidv4();
    posts.push({s_no,name,email,password,mobile});
    res.redirect("/posts");
});
app.get("/posts/:password/edit",(req,res) => {
    let {password} = req.params;
    let post = posts.find((p)=>password === p.password);
    res.render(`edit.ejs`,{post});
});
app.patch("/posts/:password", (req,res) => {
    let {password} = req.params;
    let Name = req.body.name;
    let Email = req.body.email;
    let Phone = req.body.mobile;
    let post = posts.find((p)=>password === p.password);
    post.name = Name;
    post.email = Email;
    post.mobile = Phone
    res.redirect("/posts");
});
app.delete("/posts/:password", (req,res) => {
    let {password} = req.params;
    posts = posts.filter((p)=>password !== p.password);
    res.redirect("/posts");
});
app.listen(port,() => {
    console.log(`listening to port ${port}`);
});