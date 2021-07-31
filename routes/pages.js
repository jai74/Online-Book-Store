const express = require('express');
const db = require("./connection");
const router = express.Router();
var i=0;
var cart=[];

router.get("/", (req, res) => {
    res.render("LogIn");
})

router.get("/SignUp", (req, res) => {
    res.render("SignUp");
})

router.get("/About", (req, res) => {
    res.render("About");
})

router.get("/Home", (req, res) => {
    db.query('SELECT * FROM book',(error,results)=>{
        if(error){
            console.log(error);
        }
        res.render("Home",{
            results
        });
    });       
});

router.get("/Art", (req, res) => {
    db.query('SELECT * FROM book WHERE cat = "Art"',(error,results)=>{
        console.log(results)
        if(error){
            console.log(error);
        }
        res.render("Art",{
            results
    });       
  });
})

router.get("/Autobiography", (req, res) => {
    db.query('SELECT * FROM book WHERE cat = "Autobiography"',(error,results)=>{
        if(error){
            console.log(error);
        }
        res.render("Autobiography",{
            results
    });       
  });
})

router.get("/Business", (req, res) => {
    db.query('SELECT * FROM book WHERE cat = "Business"',(error,results)=>{
        if(error){
            console.log(error);
        }
        res.render("Business",{
            results
    });       
  });
})

router.get("/CrimeFiction", (req, res) => {
    db.query('SELECT * FROM book WHERE cat = "Crime Fiction"',(error,results)=>{
        if(error){
            console.log(error);
        }
        res.render("CrimeFiction",{
            results
    });       
  });
})

router.get("/Romance", (req, res) => {
    db.query('SELECT * FROM book WHERE cat = "Romance"',(error,results)=>{
        if(error){
            console.log(error);
        }
        res.render("Romance",{
            results
    });       
  });
})

router.get("/Sci-Fi", (req, res) => {
    db.query('SELECT * FROM book WHERE cat = "Sci-Fi"',(error,results)=>{
        if(error){
            console.log(error);
        }
        res.render("Sci-Fi",{
            results
    });       
  });
})

router.get("/Checkout", (req, res) => {
    res.render("Checkout");
})

router.post('/Art', (req,res)=>{
    const bname = req.body.book;   
        db.query('SELECT * FROM book WHERE bookname = ?',[bname], (error,results)=>{
            cart.push(results[0]);
            if(error){
                res.status(401).render('Art',{
                    message: '[ Not available ]'
                })
            }
            else{
                res.redirect('Art');
       }
    })
});

router.post('/Autobiography', (req,res)=>{
    const bname = req.body.book;   
        db.query('SELECT * FROM book WHERE bookname = ?',[bname], (error,results)=>{
            cart.push(results[0]);
            if(error){
                res.status(401).render('Art',{
                    message: '[ Not available ]'
                })
            }
            else{
                res.redirect('Autobiography');
       }
    })
});

router.post('/Business', (req,res)=>{
    const bname = req.body.book;   
        db.query('SELECT * FROM book WHERE bookname = ?',[bname], (error,results)=>{
            cart.push(results[0]);
            if(error){
                res.status(401).render('Art',{
                    message: '[ Not available ]'
                })
            }
            else{
                res.redirect('Business');
       }
    })
});

router.post('/CrimeFiction', (req,res)=>{
    const bname = req.body.book;   
        db.query('SELECT * FROM book WHERE bookname = ?',[bname], (error,results)=>{
            cart.push(results[0]);
            if(error){
                res.status(401).render('Art',{
                    message: '[ Not available ]'
                })
            }
            else{
                res.redirect('CrimeFiction');
       }
    })
});

router.post('/Romance', (req,res)=>{
    const bname = req.body.book;   
        db.query('SELECT * FROM book WHERE bookname = ?',[bname], (error,results)=>{
            cart.push(results[0]);
            if(error){
                res.status(401).render('Art',{
                    message: '[ Not available ]'
                })
            }
            else{
                res.redirect('Romance');
       }
    })
});

router.post('/Sci-Fi', (req,res)=>{
    const bname = req.body.book;   
        db.query('SELECT * FROM book WHERE bookname = ?',[bname], (error,results)=>{
            cart.push(results[0]);
            if(error){
                res.status(401).render('Art',{
                    message: '[ Not available ]'
                })
            }
            else{
                res.redirect('Sci-Fi');
       }
    })
});

router.get("/Cart", (req, res) => {
    var bookid=[];
    for(var j=0; j<cart.length; j++)
    {
        bookid[j]=cart[j]['bookID'];
    }
    db.query('SELECT * FROM book WHERE bookID IN(?)',[bookid], (error,cart)=>{
        console.log(cart)
        if(error){
            res.status(401).render('Cart',{
                message: '[ Not available ]'
            })
        }
        else{
        res.render("Cart",{
            cart
        });
    }
    });
})

module.exports = router;