const inquirer = require('inquirer')
const chalk = require('chalk')

const fs = require('fs')

operation()
function operation(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: [
                'Adicionar Saldo',
                'Consultar saldo',
                'Sair'
            ],
        }
    ]).then((answer) => {
        const action = answer['action']
        console.log(action)
        if(action === 'Adicionar Saldo') {
            deposit()
        }

    }).catch((err) => console.log(err))
}


function deposit(){
    inquirer.prompt([
        {
            name: 'amount',
            message: 'Quanto você deseja adicionar?'
        }
    ]).then((answer) => {
        const amount = answer['amount']


        if(!fs.existsSync('saldo.json')) {
            const data = [{
                "balance": 0,
                "date": Date.now()
            }]
            fs.writeFileSync('saldo.json', JSON.stringify(data, null, 2),
                function(err) {
                    console.log(err)
                }

            )
        }

        addAmount(amount)    
    operation()
    }).catch(err => console.log(err))
}

function addAmount(amount) {
    if(!amount) {
        console.log(chalk.bgRed('Favor inserir uma quantidade'))
        return deposit()
    }

    const saldoJson = fs.readFileSync('saldo.json', 'utf8')
    const saldoData = JSON.parse(saldoJson)
    const saldoAdd = parseFloat(saldoData[saldoData.length-1].balance) + parseFloat(amount)
    
    const json = {
        "balance": saldoAdd,
        "date": Date.now()
    }
    
    saldoData.push(json)
    
    fs.writeFileSync('saldo.json', JSON.stringify(saldoData, null, 2), 
        function(err){console.log(err)} 
    )
    // console.log(chalk.green(`Saldo atual: ${saldoAdd}`))
}
