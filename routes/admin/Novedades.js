var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');


/* GET home page. */
router.get('/', async function (req, res, next) {

    var novedades = await novedadesModel.getNovedades();

    res.render('admin/Novedades', {
        layout: 'admin/layout',
        persona: req.session.nombre,
        novedades
    });
});

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    })
});

router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await novedadesModel.insertNovedad(req.body);
            res.redirect('/admin/Novedades');
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos deben ser completados'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se detecto la carga del contenido'
        })
    }
})

router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await novedadesModel.deleteNovedadesById(id);
    res.redirect('admin/Novedades');
});

router, get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var novedades = await novedadesModel.getNovedadesById(id);

    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedades
    });
});

router.post('modificar', async (req, res, next) => {
    try {

        var obj = {
            Titulo: req.body.Titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo
        }
        console.log(obj)

        await novedadesModel.modificarNovedadById(obj, req.body, id);
        res.redirect('admin/Novedades');

    } catch (error) {
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            message: "No se modifico la novedad"
        })
    }
})

module.exports = router;