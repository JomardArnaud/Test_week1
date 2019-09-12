module.exports = function(app, bdd) {
    app.get('/input/:id', (req, res) => {
        bdd.query(`SELECT * FROM input WHERE input_id = ${req.params.id};`, (err, result, fields) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200);
                res.json(result);
            }
        });
    })

    app.get('/input/', (req, res) => {
        let filters = [];
        const fields = ["input_id", "input_name", "input_type", "input_default", "input_required", "input_min", "input_max", "input_step", "input_start_label", "input_end_label", "form_id"];
        fields.forEach((field) => {
            req.query[field] && (filters += `${filters.length ? ' AND ' : ''} \`${field}\` = '${req.query[field]}'`)
        })
        filters = (`WHERE ` + filters);
        bdd.query(`SELECT * FROM input ${filters} ${getOtherFilters(req.query)};`, (err, result, fields) => {
           if (err) {
               res.status(500).json(err);
           } else {
                res.status(200);
                res.json(result);
           }
       });
    })

    app.put('/input/:id', (req, res) => {
        let datas = [];
        const fields = ["input_name", "input_type", "input_default", "input_required", "input_min", "input_max", "input_step", "input_start_label", "input_end_label", "form_id"];
        fields.forEach((field) => {
            req.query[field] && (datas += `\`${field}\` = '${req.query[field]}',`)
        })
        datas = datas.substring(0, datas.length - 1);
        bdd.query(`UPDATE input SET ${datas} WHERE input_id = '${req.params.id}';`, (err, result, fields) => {
            res.status(err ? 500 : 200).json(!err);
        });
    })

    app.post('/input/', (req, res) => {
        bdd.query(`INSERT INTO input (input_id, input_name, input_type, input_default, input_required, input_min, input_max, input_step, input_start_label, input_end_label, form_id) VALUE('${req.query.input_id}', '${req.query.input_name}', '${req.query.input_type}', '${req.query.input_default}', '${req.query.input_required}', '${req.query.input_min}', '${req.query.input_max}', '${req.query.input_step}', '${req.query.input_start_label}', '${req.query.input_end_label}', '${req.query.form_id}');`, (err, result, fields) => {
            res.status(err ? 500 : 200).json(!err);
        });
    })

    app.delete('/input/:id', (req, res) => {
        bdd.query(`DELETE FROM input WHERE input_id = '${req.params.id}';`, (err, result, fields) => {
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