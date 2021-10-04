const mongoose = require('mongoose')

const AnuncioSchema = mongoose.Schema({
    descricao: {type: String, required: true},
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
        }
    },
    preco: {type: Number, required: true, },
    anunciante: {type: Object, required: true},
    tipo_anuncio: {type: String, required: true, enum: ["Locação", "Venda"]},
    qtd_comodos: {
        garagem: {type: Number, default: 0},
        sala: {type: Number, default: 0},
        cozinha: {type: Number, default: 0},
        quarto: {type: Number, default: 0},
        banheiro: {type: Number, default: 1},
        quintal: {type: Number, default: 0},
        lavanderia: {type: Number, default: 0},
    },
    caracteristicas_aceitas: {
        crianca: {type: Boolean, default: true},
        pet: {type: Boolean, default: true},
        churrasqueira: {type: Boolean, default: false},
        piscina: {type: Boolean, default: false},
        area_gourmet: {type: Boolean, default: false},
        salao_jogos: {type: Boolean, default: false}
    },
    ativo: {type: Boolean, default: true}
},{timestamps:true})

module.exports = mongoose.model('anuncio',AnuncioSchema)