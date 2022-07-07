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

        // console.log(amount)

        if(!fs.existsSync('saldo.json')) {
            fs.writeFileSync('saldo.json', `{"balance": ${amount}}`,
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

    const saldoJson = fs.readFileSync('saldo.json', {
        encoding: 'utf8',
        flag: 'r',
    })
    const saldoData = JSON.parse(saldoJson)

    console.log(saldoData)
    console.log(saldoData.balance)
    return
}
