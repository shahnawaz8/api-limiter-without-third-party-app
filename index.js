const express = require("express");

const indexRouter = require("./route.js")

const app = express();

const cors = require('cors')

app.use(cors());

const port = process.env.PORT || 2345;

let excution_stack = [];
let c = 1

app.get('/', (req,res)=>{
    if(c>10){
        setTimeout(() => {
            c=0;
            excution_stack = [];
            console.log('time rest')
        }, 5000);
         return res.status(400).send({error:"api limit is end visit after 1 min"});
    }
    console.log(excution_stack,c)
    let flag = true;
    excution_stack.map((e)=>{
        if(e==req.ip){
            flag= false;
        }
    })
    if(flag) excution_stack.push(req.ip);
    if(!flag) c++
    
    return res.status(200).send([{
        id: 1,
        author: "elonmusk",
        title: "businessman",
        body: "post 1",
      },
      {
        id: 2,
        author: "elonmusk",
        title: "businessman",
        body: "post 2",
      }])
})

app.listen(port, () => {
    console.log(`app is runnning on port ${port}`);
})