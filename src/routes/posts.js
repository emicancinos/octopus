const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { isAuthenticated } = require('../helpers/auth');
const Comment = require('../models/Comment');


router.get('/posts/add', isAuthenticated, (req, res) => {
    res.render('posts/new-post.hbs');
})

router.post('/posts/new-post', isAuthenticated, async (req, res) => {
    const { title, description, date, autor } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: 'Por favor ingrese un titulo' })
    }
    if (!description) {
        errors.push({ text: 'Por favor ingrese una descripcion' })
    }
    if (!autor) {
        errors.push({ text: 'Por favor ingrese el nombre del autor' })
    }
    if (errors.length > 0) {
        res.render('posts/new-post', {
            errors,
            title,
            description,
            autor,
            date
        });
    } else {
        const newPost = new Post({ title, description, date, autor });
        await newPost.save();
        req.flash('success_msg', 'Publicacion creada con exito');
        res.redirect('/posts');
    }

});

router.get('/posts', isAuthenticated, async (req, res) => {
    const posts = await Post.find().lean();
    res.render('posts/all-posts.hbs', { posts });
});

router.get('/posts/edit/:id', isAuthenticated, async (req, res) => {
    const post = await Post.findById(req.params.id).lean();
    res.render('posts/edit-posts.hbs', { post })
});

router.put('/posts/edit-post/:id', isAuthenticated, async (req, res) => {
    const { title, description, autor } = req.body;
    await Post.findByIdAndUpdate(req.params.id, { title, description, autor }).lean();
    req.flash('success_msg', 'Publicacion actualizada satisfactoriamente');
    res.redirect('/posts');
});

router.get('/posts/comment/:id', isAuthenticated, async (req, res) => {
    const post = await Post.findById(req.params.id).lean();
    res.render('posts/comment-posts.hbs', { post });
    const newComment = new Comment();
    await newComment.save();
});

router.post('/posts/comment', isAuthenticated, async (req, res) => {
    const { name, email, comment } = req.body;
    const errors = [];
    if (!name) {
        errors.push({ text: 'Por favor ingrese un nombre' })
    }
    if (!email) {
        errors.push({ text: 'Por favor ingrese un email' })
    }
    if (!comment) {
        errors.push({ text: 'Por favor ingrese un comentario' })
    }
    if (errors.length > 0) {
        res.render('posts/new-post', {
            name,
            email,
            comment
        });
    } else {
        const newComment = new Comment({ name, email, comment });
        await newComment.save();
        req.flash('success_msg', 'Comentario publicado');
        res.redirect('/posts');
    }

});



router.delete('/posts/delete/:id', isAuthenticated, async (req, res) => {
    await Post.findByIdAndDelete(req.params.id).lean();
    req.flash('success_msg', 'Publicacion eliminada con exito');
    res.redirect('/posts');
});

module.exports = router;