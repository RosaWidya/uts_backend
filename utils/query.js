const db = require("./../config/db");

const WithoutParams = ( sql ) => {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if(err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const WithParams = ( sql, params ) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if(err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}


module.exports = {
    WithoutParams,
    WithParams
}