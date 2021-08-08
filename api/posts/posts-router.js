// implement your posts router here
const Posts = require("./posts-model");
const express = require("express");

const router = express.Router();


router.get("/", (req, res) => {
    Posts.find()
    .then(posts => {res.status(200).json(posts)})
    .catch(err => {
        res.status(500).json({ message: "The posts information could not be retrieved", err })
    })
});

router.get("/:id", (req, res) => {
    const {id} = req.params;
    Posts.findById(id)
    .then(post => {
        if(!post){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }else{
            res.status(200).json(post)
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The post information could not be retrieved"})
    })
});

router.get("/:id/comments", (req, res) => {
    const {id} = req.params
    const existingPost = Posts.findById(id)
    .then(comment => {
        if(!existingPost){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }else{
            Posts.findPostComments(id);
            res.status(200).json(comment)
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The comments information could not be retrieved" })
    })
})

router.post("/", (req, res) =>{
    const newPost = req.body;
    if(!newPost.title || !newPost.contents){
        res.status(400).json({ message: "The post with the specified ID does not exist" })
    }else{
        Posts.insert(newPost)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error while saving the post to the database" })
        })
    }
});

router.put("/:id", async (req, res) =>{
    const {id} = req.params
    const changes = req.body

    const existingPost = await Posts.findById(id)
    try {
        if(!existingPost){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }else{
            if(!changes.title || !changes.contents){
                res.status(400).json({ message: "Please provide title and contents for the post" })
            }else{
                const updatedPost = await Posts.update(id, changes) 
                res.status(200).json(updatedPost)
            }
        }
    }catch{
        res.status(500).json({ message: "The post information could not be modified" })
    }
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params
    const deletedPost = await Posts.remove(id)

    try{
        if(!deletedPost){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }else{
            res.status(200).json(deletedPost)
        }
    }catch(err){
        res.status(500).json({ message: "The post could not be removed" })
    }
})

module.exports = router;