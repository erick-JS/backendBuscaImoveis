//API REST de Usuario
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Anuncio = require('../model/Anuncio')

//Validações
const validaAnuncio = [
    check('descricao', 'Descrição do anúncio é obrigatória!').notEmpty(),
    check('endereco.logradouro', 'Logradouro do anúncio é obrigatório!').notEmpty(),
    check('endereco.bairro', 'Bairro do anúncio é obrigatório!').notEmpty(),
    check('endereco.numero', 'Número do anúncio é obrigatório!').notEmpty(),
    check('endereco.cidade', 'Cidade do anúncio é obrigatória!').notEmpty(),
    check('endereco.uf', 'UF do anúncio é obrigatória!').notEmpty(),
    check('endereco.uf', 'UF do anúncio é inválida!').isIn(
        [
            'AC',
            'AL',
            'AP',
            'AM',
            'BA',
            'CE',
            'ES',
            'GO',
            'MA',
            'MT',
            'MS',
            'MG',
            'PA',
            'PB',
            'PR',
            'PE',
            'PI',
            'RJ',
            'RN',
            'RS',
            'RO',
            'RR',
            'SC',
            'SP',
            'SE',
            'TO',
            'DF'
        ]
    ),
    check('preco', 'Preco do anúncio é obrigatório!').notEmpty(),
    check('preco', 'Preco do anúncio é inválido!').isNumeric(),
    check('tipo_anuncio', 'Tipo do anúncio é obrigatório!').notEmpty(),
    check('tipo_anuncio', 'Tipo do anúncio é inválido!').isIn(["Locação", "Venda"])
]


//GET - Liste todos os anúncios
router.get('/', async (req, res) => {
    try {
        const anuncio = await Anuncio.find()
        res.json(anuncio)
    } catch (e) {
        res.status(500).send({
            errors: [
                {
                    message: `Não foi possível listar os registros.`
                }
            ]
        })
    }
})

//GET - Liste os dados pelo ID informado
router.get('/:id', async (req, res) => {
    try {
        const anuncio = await Anuncio.findById(req.params.id)
        res.json(anuncio)
    } catch (e) {
        res.status(500).send({
            errors: [
                {
                    message: `Não foi possível listar os dados do ID ${req.params.id}.`
                }
            ]
        })
    }
})

//GET - Liste os anúncios do anunciante
router.get('/', async (req, res) => {
    try {
        const anuncio = await Anuncio.findAll().paginate({anunciante: req.query.anunciante}).exec()
        res.json(anuncio)
    } catch (e) {
        res.status(500).send({
            errors: [
                {
                    message: `Não foi possível listar os anúncios do anunciante ${req.query.anunciante}.`
                }
            ]
        })
    }
})

//POST - Cadastre um anúncio
router.post('/', validaAnuncio, async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(({
            errors: errors.array()
        }))
    }

    try {
        let anuncio = new Anuncio(req.body)
        await anuncio.save()
        res.send(anuncio)
    } catch (e) {
        return res.status(500).json({
            errors: [
                {
                    message: `Erro ao salvar anúncio: ${e.message}`
                }
            ]
        })
    }
})

//PUT - Altere os dados do ID informado
router.put('/', validaAnuncio, async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(({
            errors: errors.array()
        }))
    }

    try {
        let dados = req.body
        await Anuncio.findByIdAndUpdate(req.body._id, {$set: dados}, {new: true})
        .then(anuncio => {
            res.send({
                message: `Anúncio alterado com sucesso!`
            })
        })
        .catch(e => {
            return res.status(500).send({
                message: `Erro ao alterar o anúncio com o id ${req.body._id}`
            })
        })
    } catch (e) {
        return res.status(500).json({
            errors: [{
                message: `Erro ao alterar o usuário: ${e.message}`
            }]
        })
    }
})

//DELETE - Apaga o anúncio 
router.delete('/:id', async(req, res) => {
    await Anuncio.findByIdAndRemove(req.params.id)
    .then(anuncio => {
        res.send({
            message: `Anúncio ${anuncio.id} removido com sucesso!`
        })
    })
    .catch(e => {
        errors: [{
            message: `Não foi possível excluir o anúncio com o id ${req.params.id}`
        }]
    })
})

module.exports = router