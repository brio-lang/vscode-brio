import * as vscode from 'vscode';
import { Commands } from './contants';
import { getInterpreterPath, getBrioVersion } from './common';


/**
 * Registers the Brio extension status bar item.
 * 
 * @param context The vscode extension context
 * @param statusBarItem A status bar item instance to register
 */
export const registerStatusBar = (context: vscode.ExtensionContext, statusBarItem: vscode.StatusBarItem) => {
    statusBarItem.command = Commands.Set_Interpreter;
    context.subscriptions.push(statusBarItem);
    updateStatusBar(context, statusBarItem);
}

/**
 * Refreshes the Brio status bar item with the current interpreter. If the version is successfully
 * retrieved from the interpreter, it will be displayed. If the version is unsuccessfully
 * retrieved, it will be indicated in the status bar as well as displayed in an error message.
 * 
 * @param context The vscode extension context
 * @param statusBarItem A status bar item instance to register
 */
export const updateStatusBar = (context: vscode.ExtensionContext, statusBarItem: vscode.StatusBarItem) => {
    getBrioVersion(context).then((version) => {
        statusBarItem.text = version;
        statusBarItem.tooltip = String(getInterpreterPath(context));
    }).catch(() => {
        statusBarItem.text = "$(warning) Select Brio Interpreter";
        statusBarItem.tooltip = "Select Brio Interpreter";
        vscode.window.showErrorMessage(
            "No Brio interpreter is selected. You need to select a Brio interpreter to enable additional " +
            "extension features. To resolve, you may set the extension setting `brio.defaultInterpreterPath` " +
            "to the full path of the brio interpreter. You may also resolve by setting the workspace Brio " +
            "interpreter path with the command `Brio: Select Interpreter`.",
            ...["Select Brio Interpreter", "Download Brio"]
        ).then((selection) => {
            if (selection == "Select Brio Interpreter"){
                vscode.commands.executeCommand(Commands.Set_Interpreter);
            }else if (selection == "Download Brio"){
                vscode.env.openExternal(vscode.Uri.parse('https://www.brio-lang.org/download'));
            }
        });
    }).finally(() => {
        statusBarItem.show();
    });
}