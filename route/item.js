module.exports = function(app, bdd) {
    app.get('/item/:id', (req, res) => {
        bdd.query(`SELECT * FROM item WHERE item_id = ${req.params.id};`, (err, result, fields) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200);
                res.json(result);
            }
        });
    })

    app.get('/item/', (req, res) => {
        let filters = [];
        const fields = ["item_id", "item_name", "input_label"];
        fields.forEach((field) => {
            req.query[field] && (filters += `${filters.length ? ' AND ' : ''} \`${field}\` = '${req.query[field]}'`)
        })
        filters = (`WHERE ` + filters);
        bdd.query(`SELECT * FROM item ${filters} ${getOtherFilters(req.query)};`, (err, result, fields) => {
           if (err) {
               res.status(500).json(err);
           } else {
                res.status(200);
                res.json(result);
           }
       });
    })

    app.put('/item/:id', (req, res) => {
        let datas = [];
        const fields = ["item_name", "input_label"];
        fields.forEach((field) => {
            req.query[field] && (datas += `\`${field}\` = '${req.query[field]}',`)
        })
        datas = datas.substring(0, datas.length - 1);
        bdd.query(`UPDATE item SET ${datas} WHERE item_id = '${req.params.id}';`, (err, result, fields) => {
            res.status(err ? 500 : 200).json(!err);
        });
    })

    app.post('/item/', (req, res) => {
        bdd.query(`INSERT INTO item (item_id, item_name, input_label, input_id) VALUES(${req.query.item_id}, '${req.query.item_name}', '${req.query.input_label}', ${req.query.input_id});`, (err, result, fields) => {
            res.status(err ? 500 : 200).json(!err);
        });
    })

    app.delete('/item/:id', (req, res) => {
        bdd.query(`DELETE FROM item WHERE item_id = '${req.params.id}';`, (err, result, fields) => {
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
