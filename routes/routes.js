const router = require('express').Router()
const Produto = require('../models/produto')
const Validator = require('../validators/productValidator')

//ENDPOINTS
router.get('/', async (req, res) => {
    const produtos = await Produto.find()
    return res.status(200).json({ produtos: produtos })
})

router.get ('/:id', async (req, res) =>{
    const id = req.params.id
    
    try{
        const produto = await Produto.findOne({_id: id})

        if(!produto)
           return res.status(400).json({mensagem:"Produto não encontrado"}) 
        
        return res.status(200).json(produto)
    }catch(error){
        return res.status(500).json({error: error})
    }
})

router.post('/novo-produto', async (req, res) => {
    const { nome, descricao, valor } = req.body

    let validator = Validator(nome, descricao, valor)

    if(validator == false)
        return res.status(400).json({mensagem: "Necessário preencher todos os campos"})

    const produto = {
        nome,
        descricao,
        valor
    }

    await Produto.create(produto)
    return res.status(200).json({ mensagem: 'Producto adicionado com sucesso!' })
})

router.put("/:id", async (req, res) => {
    const id = req.params.id

    const{nome, descricao, valor} = req.body

    const produto = {
        nome,
        descricao,
        valor
    }

    try {
        await Produto.updateOne({_id : id}, produto)
        return res.status(200).json({mensagem: "Produto atualizado com sucesso."})
        
    } catch {
        return res.status(400).json({mensagem: "Produto não encontrado."})        
    }
})

    router.delete('/:id', async(req, res) =>{
        const id = req.params.id

        try{
            await Produto.deleteOne({_id: id})
            return res.status(200).json({mensagem: "Produto deletado com sucesso."})
        } catch(error){
            return res.status(500).json({error: error})        
        }
    })


module.exports = router
