if(process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: 'mongodb://mukul8299:mukul123@ds033056.mlab.com:33056/vidjot-prod'
    }
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost/vidjot-dev'
    }
}