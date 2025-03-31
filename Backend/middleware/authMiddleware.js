const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    
    // Provera prisustva tokena u zaglavlju
    const token = req.headers.authorization;

//    const authToken = token.split(' ')[1]

    if (!token) {
        return res.status(401).json({ poruka: 'Niste autentifikovani. Token nije pronađen.' });
    }

    // try{
    //     const decodedToken = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWI5OGEzNzY5YTEzMGNjNTI1N2UwOWIiLCJ1c2VybmFtZSI6ImFuZHJlaiIsImlhdCI6MTcwNjc5MDMxMX0.q-MywuchCnR-pFcyMjg1-PkAX8fj0-0lK5vrlTpxYF0", 'secret');
    //     console.log(decodedToken)
    //     console.log("USPESNO JE OVDEE")
    
    // }catch(err){
    //     console.log("Greskaaa" + err)
    // }


    try {
        console.log(token)
        const decodedToken = jwt.verify(token, 'secret');
        
        req.user = decodedToken;//OVO mozda zakomentarisati

        // Nastavak izvršavanja, jer je korisnik autentifikovan
        next();
    } catch (error) {
        // Greška pri verifikaciji tokena
        return res.status(401).json({ poruka: 'Niste autentifikovani. Token nije validan.' });
    }



    // console.log('Middleware radi nešto pre poziva kontrolera.');
    // next();
};

module.exports = authMiddleware;