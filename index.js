#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
const todoList = [];
async function mainMenu() {
    const { action } = await inquirer.prompt({
        type: "list",
        name: "action",
        message: chalk.blue.bold.italic("What would you like to do?"),
        choices: ["Add Task", "View Task", "Mark as complete", "Delete Task", "Exit Task"],
    });
    switch (action) {
        case "Add Task":
            await addTask();
            break;
        case "View Task":
            viewList();
            break;
        case "Mark as complete":
            await markCompleted();
            break;
        case "Delete Task":
            await deleteTask();
            break;
        case "Exit Task":
            console.log(chalk.bgGreen.bold("Goodbye!"));
            return;
    }
    mainMenu();
}
let addTask = async () => {
    let { task } = await inquirer.prompt({
        type: "input",
        name: "task",
        message: "Enter the task"
    });
    todoList.push({ task, completed: false });
    console.log(chalk.bgGreen.bold("Task Added successfully"));
};
let viewList = () => {
    console.log(chalk.blue.bold.italic("**** TO DO LIST ****"));
    todoList.forEach((item, index) => {
        console.log(`${index + 1}.[${item.completed ? "x" : " "}] ${item.task}`);
    });
    console.log(chalk.blue.bold.italic("*****************************************"));
};
let markCompleted = async () => {
    let { index } = await inquirer.prompt({
        type: "number",
        name: "index",
        message: chalk.blue.bold.italic("Enter the index of the task you want to mark as completed:")
    });
    if (index < 1 || index > todoList.length) {
        console.log(chalk.bgRed.bold("Invalid task number. Please try again."));
        return;
    }
    todoList[index - 1].completed = true;
    console.log(chalk.bgGreen.bold("Task marked as completed successfully"));
};
let deleteTask = async () => {
    let { index } = await inquirer.prompt({
        type: "number",
        name: "index",
        message: chalk.bgRed.bold.italic("Enter the index of the task you want to delete:")
    });
    if (index < 1 || index > todoList.length) {
        console.log(chalk.bgRed.bold("Invalid task number. Please try again."));
        return;
    }
    todoList.splice(index - 1, 1);
    console.log(chalk.bgGreen.bold("Task deleted successfully"));
};
mainMenu();
