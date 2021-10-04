const mongoose = require('mongoose')

const UsuarioSchema = mongoose.Schema({
    nome: { type: String, required: true },
    telefone: { type: String, required: true },
    cpf: { type: String, required: true, index: { unique: true } },
    data_nascimento: { type: Date, required: true },
    endereco: {
        logradouro: { type: String, required: true },
        numero: { type: String, required: true },
        bairro: { type: String, required: true },
        cidade: { type: String, required: true },
        uf: {
            type: String, enum: [
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
            ],
            required: true
        },
        cep: { type: String },
        complemento: { type: String }
    },
    email: { type: String, required: true, index: { unique: true } },
    senha: { type: String, required: true }
})

module.exports = mongoose.model('usuario',UsuarioSchema)