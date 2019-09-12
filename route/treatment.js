module.exports = function(app, bdd) {
    app.get('/treatment/:id', (req, res) => {
        bdd.query(`SELECT * FROM treatment WHERE treatment_id = ${req.params.id};`, (err, result, fields) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200);
                res.json(result);
            }
        });
    })

    app.get('/treatment/', (req, res) => {
        let filters = [];
        const fields = ["treatment_id", "treatment_name", "treatment_color", "treatment_created_at"];
        fields.forEach((field) => {
            req.query[field] && (filters += `${filters.length ? ' AND ' : ''} \`${field}\` = '${req.query[field]}'`)
        })
        filters = (`WHERE ` + filters);
        bdd.query(`SELECT * FROM treatment ${filters} ${getOtherFilters(req.query)};`, (err, result, fields) => {
           if (err) {
               res.status(500).json(err);
           } else {
                res.status(200);
                res.json(result);
           }
       });
    })

    app.put('/treatment/:id', (req, res) => {
        let datas = [];
        const fields = ["treatment_name", "treatment_color", "treatment_created_at"];
        fields.forEach((field) => {
            req.query[field] && (datas += `\`${field}\` = '${req.query[field]}',`)
        })
        datas = datas.substring(0, datas.length - 1);
        bdd.query(`UPDATE treatment SET ${datas} WHERE treatment_id = '${req.params.id}';`, (err, result, fields) => {
            res.status(err ? 500 : 200).json(!err);
        });
    })

    app.post('/treatment/', (req, res) => {
        bdd.query(`INSERT INTO treatment (treatment_id, treatment_name, treatment_color) VALUE('${req.query.treatment_id}', '${req.query.treatment_name}', '${req.query.treatment_color}');`, (err, result, fields) => {
            res.status(err ? 500 : 200).json(!err);
        });
    })

    app.delete('/treatment/:id', (req, res) => {
        bdd.query(`DELETE FROM treatment WHERE treatment_id = '${req.params.id}';`, (err, result, fields) => {
            res.status(err ? 500 : 200).json(!err);
        });
    })
}

function getOtherFilters(filters) { 
    let tmpFilters = "";

    tmpFilters += filters.orderBy ? `ORDER BY \`${filters.sortBy}\` ${filters.orderBy} ` : "";
    tmpFilters += filters.limit > 0 ? `LIMIT ${filters.limit} ` : "";
    tmpFilters += filters.offset > 0 ? `OFFSET ${filters.offset} ` : "";
    return tmpFilters;
}