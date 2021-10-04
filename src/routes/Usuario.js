//API REST de Usuario
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Usuario = require('../model/Usuario')

//Validações
const validaUsuario = [
    check('nome', 'Nome do usuário é obrigatório!').notEmpty(),
    check('telefone', 'Telefone do usuário é obrigatório').notEmpty(),
    check('telefone', 'Telefone do usuário inválido!').isLength({ min: 11, max: 11 }),
    check('cpf', 'CPF do usuário é obrigatório!').notEmpty(),
    check('cpf', 'CPF do usuário inválido!').isLength({ min: 11, max: 11 }),
    check('data_nascimento', 'Data de nascimento do usuário é obrigatória!').notEmpty(),
    check('data_nascimento', 'Data de nascimento do usuário inválida!').isDate(),
    check('endereco.logradouro', 'Logradouro do usuário é obrigatório!').notEmpty(),
    check('endereco.bairro', 'Bairro do usuário é obrigatório!').notEmpty(),
    check('endereco.numero', 'Número do usuário é obrigatório!').notEmpty(),
    check('endereco.cidade', 'Cidade do usuário é obrigatória!').notEmpty(),
    check('endereco.uf', 'UF do usuário é obrigatória!').notEmpty(),
    check('endereco.uf', 'UF do usuário é inválida!').isIn(
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
    check('email', 'E-mail do usuário é obrigatório!').notEmpty(),
    check('email', 'E-mail do usuário é inválido!').isEmail(),
    check('senha', 'Senha do usuário é obrigatória!').notEmpty(),
    check('senha', 'Senha do usuário deve ter, no mínimo, 5 caracteres!').isLength({ min: 5 })
]


//GET - Liste todos os usuários
router.get('/', async (req, res) => {
    try {
        const usuario = await Usuario.find()
        res.json(usuario)
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
        const usuario = await Usuario.findById(req.params.id)
        res.json(usuario)
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

//POST - Cadastre um usuário
router.post('/', validaUsuario, async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(({
            errors: errors.array()
        }))
    }

    try {
        let usuario = new Usuario(req.body)
        await usuario.save()
        res.send(usuario)
    } catch (e) {
        return res.status(500).json({
            errors: [
                {
                    message: `Erro ao salvar usuário: ${e.message}`
                }
            ]
        })
    }
})

//PUT - Altere os dados do ID informado
router.put('/', validaUsuario, async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(({
            errors: errors.array()
        }))
    }

    try {
        let dados = req.body
        await Usuario.findByIdAndUpdate(req.body._id, {$set: dados}, {new: true})
        .then(usuario => {
            res.send({
                message: `Usuário ${usuario.nome} alterado com sucesso!`
            })
        })
        .catch(e => {
            return res.status(500).send({
                message: `Erro ao alterar o usuário com o id ${req.body._id}`
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

//DELETE - Apaga o usuário 
router.delete('/:id', async(req, res) => {
    await Usuario.findByIdAndRemove(req.params.id)
    .then(usuario => {
        res.send({
            message: `Usuário ${usuario.nome} removido com sucesso!`
        })
    })
    .catch(e => {
        errors: [{
            message: `Não foi possível excluir a categoria com o id ${req.params.id}`
        }]
    })
})

module.exports = router