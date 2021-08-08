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
    .catch(err=> {
        res.status(500).json({ message: "The post information could not be retrieved", err })
    })
})

module.exports = router;