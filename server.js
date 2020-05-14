const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine","njk")

nunjucks.configure("views", {
    express:server,
    autoescape:false,
    noCache:true
})

// get para pegar algo na tela,req para qdo receber algo do usuario e res para responder algo
server.get("/",function(req,res){
    const about = {
        avatar_url:"https://avatars2.githubusercontent.com/u/56279938?s=460&u=8c97d8ff05f03785bad3e6bef5a2fb8cf5a9ba23&v=4",
        name:"Ricardo Ricarte",
        role:"Estudante - Rocketseat",
        description:'Gosto de solucionar problemas através da tecnologia, sempre buscando inovar e me especializar cada vez mais para que um dia possa me tornar referência na área compartilhando meus conhecimentos e experiências para ajudar outras pessoas. Estudante da <a href="https://rocketseat.com.br/" target="_blank">RocketSeat</a>',
        links:[
            {name:"Github",url:"http://github.com/ricardoricarte/"},
            {name:"Instagram",url:"http://instagram.com/jricardo.ricarte"},
            {name:"Linkedin",url:"http://linkedin.com/in/jose-ricardo-silva-082837191//"}     
        
        ]
    }
    return res.render("about",{about})
})

server.get("/portfolio",function(req,res){
    return res.render("portfolio",{ items:videos })
})

server.get("/video",function(req,res){
    const id = req.query.id
    
    const video = videos.find(function(video){
        return video.id == id
    })
    if (!video){
        return res.send("Video not found!")
    }
    return res.render("video",{item: video })
})

server.listen(5000,function(){
    console.log("server is running")
})