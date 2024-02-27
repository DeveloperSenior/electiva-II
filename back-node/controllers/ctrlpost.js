const {Response} = require('express')

const postsList = [{id:123, name:"andres"},{id:1234, name:"felipe"},{id:12345, name:"escobar"}]
const posts = (req, res = Response)=>{
    var id = Number(req.params.id);
    res.statusCode = 200;
    if(id){
        const filterpost = postsList.filter(post => post.id === id);
        res.json(filterpost)
    }else{
        res.json(postsList)
    }
}

const save = (req, res = Response)=>{
    console.log(req.body)
    res.statusCode = 200
    res.json({ok:true})
}

module.exports = {posts, save}