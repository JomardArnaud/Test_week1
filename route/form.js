module.exports = function(app, bdd) {
    app.get('/form/:id', (req, res) => {
        bdd.query(`SELECT * FROM form WHERE form_id = ${req.params.id};`, (err, result, fields) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200);
                res.json(result);
            }
        });
    })

    app.get('/form/', (req, res) => {
        let filters = [];
        const fields = ["form_id", "form_name", "form_created_at"];
        fields.forEach((field) => {
            req.query[field] && (filters += `${filters.length ? ' AND ' : ''} \`${field}\` = '${req.query[field]}'`)
        })
        filters = (`WHERE ` + filters);
        bdd.query(`SELECT * FROM form ${filters} ${getOtherFilters(req.query)};`, (err, result, fields) => {
           if (err) {
               res.status(500).json(err);
           } else {
                res.status(200);
                res.json(result);
           }
       });
    })

    app.put('/form/:id', (req, res) => {
        let datas = [];
        const fields = ["form_name", "form_created_at"];
        fields.forEach((field) => {
            req.query[field] && (datas += `\`${field}\` = '${req.query[field]}',`)
        })
        datas = datas.substring(0, datas.length - 1);
        bdd.query(`UPDATE form SET ${datas} WHERE form_id = '${req.params.id}';`, (err, result, fields) => {
            res.status(err ? 500 : 200).json(!err);
        });
    })

    app.post('/form/', (req, res) => {
        bdd.query(`INSERT INTO form (form_id, form_name) VALUE('${req.query.form_id}', '${req.query.form_name}');`, (err, result, fields) => {
            res.status(err ? 500 : 200).json(!err);
        });
    })

    app.delete('/form/:id', (req, res) => {
        bdd.query(`DELETE FROM form WHERE form_id = '${req.params.id}';`, (err, result, fields) => {
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