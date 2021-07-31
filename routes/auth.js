const express = require('express');
const router = express.Router();
const db = require("../routes/connection");
var cart;

router.post('/SignUp', (req,res)=>{
    console.log(req.body);

    const name = req.body.name;
    const email = req.body.mail;
    const password = req.body.pswrd;
        
    db.query('SELECT email FROM account WHERE email = ?',[email],(error,results)=>{
    if(error){
        console.log(error);
    }
    if(results.length>0){
        return res.render('SignUp',{
            message: '[ E-mail account is already in use ]'
        })
    }

    db.query('Insert INTO account SET ?',{ username: name, email: email, password: password },(error,results)=>{
        if(error){
            console.log(error);
        }
        else{
            return res.render('LogIn',{
                message: '[ User Registered ]'
            })
        }
    })

   });

});

router.post('/', (req,res)=>{
    try{
        const name = req.body.name;
        const password = req.body.pswrd;
        
        db.query('SELECT * FROM account WHERE username = ?',[name], async (error,results)=>{
            if(results.length < 1){
                res.status(401).render('LogIn',{
                    message: '[ Username or password is incorrect ]'
                })
            }
            else{
                if(results[0].username===name&&results[0].password===password)
                {res.status(200).redirect("/Home");}
                else
                {
                    res.status(401).render('LogIn',{
                        message: '[ Username or password is incorrect ]'
                    })
                }
            }
        })
    }
    catch(error){
        console.log(error);
    }
});



module.exports = router;