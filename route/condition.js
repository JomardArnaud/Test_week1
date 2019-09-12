module.exports = function(app, bdd) {
    app.get('/condition/:id', (req, res) => {
        bdd.query(`SELECT * FROM \`condition\` WHERE condition_id = ${req.params.id};`, (err, result, fields) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200);
                res.json(result);
            }
        });
    })

    app.get('/condition/', (req, res) => {
        let filters = [];
        const fields = ["condition_id", "condition_operator", "condition_check", "condition_value_check", "condition_optional_value_check", "regex_id"];
        fields.forEach((field) => {
            req.query[field] && (filters += `${filters.length ? ' AND ' : ''} \`${field}\` = ${req.query[field]}`)
        })
        filters = (`WHERE ` + filters);
        bdd.query(`SELECT * FROM \`condition\` ${filters} ${getOtherFilters(req.query)};`, (err, result, fields) => {
           if (err) {
               res.status(500).json(err);
           } else {
                res.status(200);
                res.json(result);
           }
       });
    })

    app.put('/condition/:id', (req, res) => {
        let datas = [];
        const fields = ["condition_operator", "condition_check", "condition_value_check", "condition_optional_value_check", "regex_id"];
        fields.forEach((field) => {
            req.query[field] && (datas += `\`${field}\` = '${req.query[field]}',`)
        })
        datas = datas.substring(0, datas.length - 1);
        bdd.query(`UPDATE \`condition\` SET ${datas} WHERE condition_id = '${req.params.id}';`, (err, result, fields) => {
            res.status(err ? 500 : 200).json(!err);
        });
    })

    app.post('/condition/', (req, res) => {
        bdd.query(`INSERT INTO \`condition\` (condition_id, condition_operator, condition_check, condition_value_check, condition_optional_value_check, regex_id) VALUE('${req.query.condition_id}', '${req.query.condition_operator}', '${req.query.condition_check}',${req.query.condition_value_check}', '${req.query.condition_optional_value_check}', '${req.query.regex_id}');`, (err, result, fields) => {
            res.status(err ? 500 : 200).json(!err);
        });
    })

    app.delete('/condition/:id', (req, res) => {
        bdd.query(`DELETE FROM \`condition\` WHERE condition_id = '${req.params.id}';`, (err, result, fields) => {
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