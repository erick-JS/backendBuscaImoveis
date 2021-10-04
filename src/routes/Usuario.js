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


//GET - Mostre as informações pelo ID informado
router.get('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findbyId(req.params.id)
        res.json(usuario)
    } catch (e) {
        res.status(500).send({
            errors: [
                {
                    message: `Não foi possível obter o ID ${req.params.id}.`
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

module.exports = router