const express = require('express')
const app = express();
const path = require('path')
const fs=require('fs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
    fs.readdir(`./files`,(err,files)=>{
        res.render("index",{files:files})
        // console.log(files);
    })
})
app.post("/create",(req,res)=>{
    if(req.body.title=="" || req.body.details==""){
       return
    }
    fs.writeFile(`./files/${req.body.title.split(" ").join('')}.txt`,req.body.details,(err)=>{
        res.redirect('/')
    })
    // console.log(req.body);
})

app.get("/files/:filename",(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,filedata)=>{
        res.render("show",{data:filedata,filename:req.params.filename});
    })
})
app.post("/edit",(req,res)=>{
//    console.log(req.body)
fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}` ,(err)=>{
    res.redirect('/')
})
})

app.get("/edit/:filename",(req,res)=>{
    res.render("edit",{prev:req.params.filename})
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})
app.post("/login",(req,res)=>{
    console.log(req.body)
    res.redirect('/')
})
app.get("/contact",(req,res)=>{
    res.render("contact")
})
// app.get("/profile/:username", (req, res) => {
//     let name = req.params.username;
//     res.send(`this is ${name}'s profile`)
// })
// app.get("/profile/:username/:age", (req, res) => {
//     let name = req.params;
//     res.send(`<h1>Welcome ${name.username} with age ${name.age}</h1>`)
// })

app.listen(3000, () => {
    console.log("port listening at 3000");
})