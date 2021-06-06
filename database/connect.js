let MongoClient = require('mongodb').MongoClient;
let url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/Simones?retryWrites=true&w=majority`;

module.exports = (callBack)=> {
    console.log(url ,process.env.DB_NAME);
    MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },
        function(err,db) {
        if (err) throw err;
            const dbo = db.db(process.env.DB_NAME);
            console.log(dbo)
            callBack(dbo ,db);
    });
}
