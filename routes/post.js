const router = require("express").Router();
const Post = require("../models/Post")


//get all posts
router.get("/", (req, res) => {
    Post.find((err,post)=>{
      if(err){
        res.send(err)
      }else{
        res.json(post)
      }
    })
});

//add posts
router.post("/",(req,res)=>{
    let post = new Post(req.body)
    post.save()
        .then(post => {
            res.status(200).json({'post': 'post added successfully'})
        })
        .catch(err => {
            res.status(400).send('adding new post failed')
        })
})

// get post by id
router.get("/:id",(req,res)=>{
    let id = req.params.id
    Post.findById(id,(err,post)=>{
      if(err){
        res.send(err)
      }else{
        res.json(post)
      }
    })
  })

  //delete post by id
router.delete("/:id",(req,res)=>{
    let id = req.params.id
    Post.findByIdAndRemove(id)
    .then(()=>{
      res.json("deleted")
    }).catch(err=>{
      res.send(err)
    })
  })

  //update posts
  router.post('/edit/:id',  (req, res) => {
        const updatedPost = {
            title: req.body.title,
            paragraph: req.body.paragraph,
        };

        Post.findByIdAndUpdate(req.params.id, updatedPost, err => {
            if (err) throw err;
            else res.json({ success: 'success' });
        });
   
});

  //get posts by search
router.post("/search",(req,res)=>{
    const query = Post.find(req.body)
  
    //find by one gets 1 item the find gets all items
    // selecting the `title` and `paragraph` fields
    query.select('title paragraph')
    query.exec(function (err, post) {
      if (err) return handleError(err);
      
       res.json(post)
    });
  })

module.exports = router;