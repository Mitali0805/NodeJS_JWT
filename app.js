const express = require('express')
const jwt = require('jsonwebtoken')


const app = express()

app.get('/api', (req, res) => {
    res.json({
        message: "Welcome"
    })
})

app.post('/api/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, authdata) => {
        if (err) {
            res.sendStatus(403)
        }
        else {
            res.json({
                message: "New Post Created ",
                authdata
            })
        }
    })

})

app.post('/api/auth/:id', (req, res) => {
    jwt.sign({ id: req.params.id }, 'secret', { expiresIn: '30s' }, (err, token) => {
        res.json({ token })
        localStorage.setItem("token", token)
    })
})


function verifyToken(req, res, next) {
    //Get auth header value   
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        //split at the space
        const bearer = bearerHeader.split(' ')
        console.log("bearer", bearer)
        //Get token frm array
        const bearerToken = bearer[1]
        console.log("bearerToken", bearerToken)

        //set token
        req.token = bearerToken
        next()
    }
    else {
        res.sendStatus(403)
    }

}

function split_a() {
    const a = "hello,Mitali"
    const b = a.split(',')
    console.log(b)
    console.log(b[0])

    let abc = "bearer"
    let abc1 = "Bearer"

    if (abc.toUpperCase() == abc1.toUpperCase()) {
        console.log("hi")
    }


}

split_a();

app.listen(6000, () => console.log('Server listening on 6000'))