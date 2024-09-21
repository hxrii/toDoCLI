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

program.parse();


console.log(chalk.blue.bold("\n\nToDo CLI [Disconnected]\n"))