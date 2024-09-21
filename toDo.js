import { Command } from 'commander';

const program = new Command();

import fs from 'fs'
import chalk from 'chalk'


console.log(chalk.blue.bold("\nToDo CLI [Connected]\n\n"))

program
    .name('ToDo CLI')
    .description('A CLI based toDo System')
    .version('1.0.0')


const savePath = "./toDoList.txt"


const readTodo = ()=>{
    try{
        //console.log(chalk.green("Hi"))
       const data = fs.readFileSync(savePath, "utf8");
       return data.split("\n").filter(Boolean);
    }
    catch(err){
        console.error(chalk.red("Error reading file:", err.message));
        return [];
    }
}

const writeTodo = (todos)=>{
    const data = todos.join('\n');
    fs.writeFileSync(savePath, data);
}



    program.command('addTodo')
    .argument('<string>', 'New Todo to be added')
    .description('Add a new toDo')
    .action((todo)=>{
        let todos = readTodo();
        todos.push(todo);
        writeTodo(todos);
        console.log(chalk.green("Added Todo:", todo));
    })

    program.command('showTodo')
    .description('Show full list of ToDo')
    .action(()=>{
        let todos = readTodo();
        if (todos.length === 0) {
            console.log(chalk.yellow('Todo is Empty'));

        } else {
            todos.forEach((element, index) => {

                if (element.startsWith('[Completed]')) {

                    console.log(chalk.green(`${index + 1}: ${element}`));

                } else {

                    console.log(chalk.red(`${index + 1}: ${element}`));
                }
            });
        }
    })

    program.command('rmTodo')
    .argument('<integer>','Index of ToDo to be deleted')
    .description('delete the todo of input index')
    .action((index) => {
        let todos = readTodo();

        if (todos.length !== 0) {
            let deleted = todos[index-1]
            todos.splice(index-1,1)
            console.log(chalk.green(`Todo deleted : ${deleted}`));
            writeTodo(todos)

        } else {
            console.log(chalk.yellow(`Your todo is empty`));

        }
    });



    program.command('comTodo')
    .description('Marks the todo as complete')
    .argument('<integer>', 'Add the index of the todo to be marked completed')
    .action((index) => {
        let todos = readTodo();

        
        if (index === -1) {
            console.log(chalk.yellow('Todo not found.'));
        } else {
            todos[index] = `[Completed] ${todos[index]}`;
            console.log(chalk.green.bold(`${todos[index]}`))
            writeTodo(todos);
        }

    })

program.parse();


console.log(chalk.blue.bold("\n\nToDo CLI [Disconnected]\n"))