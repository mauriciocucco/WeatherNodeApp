const inquirer = require('inquirer');
require('colors');

const menuQuestions = [
    {
        type: 'list',
        name: 'opt',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.magenta} Buscar ciudad`
            },
            {
                value: '2',
                name: `${'2.'.magenta} Historial`
            },
            {
                value: '0',
                name: `${'0.'.magenta} Salir`
            }
        ]
    }
];

const continueByEnter = [
    {
        type: 'input',
        name: 'pause',
        message: `\nPresione ${'ENTER'.bgCyan} para continuar\n`
    }
];

const inquirerMenu = async () => {
    console.clear();

    console.log('============================'.green);
    console.log('    Seleccione una opción'.white);
    console.log('============================\n'.green);

    const { opt }= await inquirer.prompt(menuQuestions);

    return opt;
};

const inquirerPause = async () => {
    console.log('\n');
    await inquirer.prompt(continueByEnter); 
};

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate: (value) => {
                if (value.length === 0)  return 'Debe ingresar un valor';

                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question)

    return desc;
}

const citiesList = async ( cities = []) => {
    const choices = cities.map((city, index) => {   
        return {
                    value: city.id,
                    name: `${(index + 1 + '.').green} ${city.name}`
                }
    });

    choices.push({
        value: '0',
        name: `${'0.'.green} Cancelar`
    })

    const question = [
        {
            type: 'list',
            name: 'id',
            message: '\nElija la ubicación que desea:\n',
            choices
        }
    ];

    const { id }= await inquirer.prompt(question);

    return id;
}

module.exports = {
    inquirerMenu,
    inquirerPause,
    readInput,
    citiesList
}