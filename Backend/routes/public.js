const router = require("express").Router();

router.get('/public', (req, res)=>{
res.send("public stranica");
})

module.exports = router