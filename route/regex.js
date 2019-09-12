module.exports = function(app, bdd) {
    app.get('/regex/:id', (req, res) => {
        bdd.query(`SELECT * FROM regex WHERE regex_id = ${req.params.id};`, (err, result, fields) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200);
                res.json(result);
            }
        });
    })

    app.get('/regex/', (req, res) => {
        let filters = [];
        const fields = ["regex_id", "regex_name", "treatment_id", "form_id", "regex_created_at"];
        fields.forEach((field) => {
            req.query[field] && (filters += `${filters.length ? ' AND ' : ''} \`${field}\` = '${req.query[field]}'`)
        })
        filters = (`WHERE ` + filters);
        bdd.query(`SELECT * FROM regex ${filters} ${getOtherFilters(req.query)};`, (err, result, fields) => {
           if (err) {
               res.status(500).json(err);
           } else {
                res.status(200);
                res.json(result);
           }
       });
    })

    app.put('/regex/:id', (req, res) => {
        let datas = [];
        const fields = ["regex_name", "treatment_id", "form_id"];
        fields.forEach((field) => {
            req.query[field] && (datas += `\`${field}\` = '${req.query[field]}',`)
        })
        datas = datas.substring(0, datas.length - 1);
        bdd.query(`UPDATE regex SET ${datas} WHERE regex_id = '${req.params.id}';`, (err, result, fields) => {
            res.status(err ? 500 : 200).json(!err);
        });
    })

    app.post('/regex/', (req, res) => {
        bdd.query(`INSERT INTO regex (regex_id, regex_name, treatment_id, form_id) VALUE('${req.query.regex_id}', '${req.query.regex_name}', '${req.query.treatment_id}', '${req.query.form_id}');`, (err, result, fields) => {
            res.status(err ? 500 : 200).json(!err);
        });
    })

    app.delete('/regex/:id', (req, res) => {
        bdd.query(`DELETE FROM regex WHERE regex_id = '${req.params.id}';`, (err, result, fields) => {
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