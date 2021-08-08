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

router.post("/", (req, res) =>{
    const newPost = req.body;
    if(!newPost.title || !newPost.contents){
        res.status(400).json({ message: "The post with the specified ID does not exist" })
    }else{
        Posts.insert(newPost)
        .then(post => {
            res.status(201).json({ message: post })
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error while saving the post to the database" })
        })
    }
});

module.exports = router;