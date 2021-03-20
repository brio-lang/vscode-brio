import * as vscode from 'vscode';
import { Commands } from './contants';
import { getInterpreterPath, setInterpreterPath } from './common';
import { updateStatusBar } from './statusbar';


/**
 * Registers the supported Brio extension commands.
 * 
 * @param context The vscode extension context
 * @param statusBarItem A status bar item instance to register
 */
export const registerCommands = (context: vscode.ExtensionContext, statusBarItem: vscode.StatusBarItem) => {
    let brioExecTerminal: vscode.Terminal | undefined = undefined;

    const getTerminal = () => {
        if (brioExecTerminal == undefined){
            brioExecTerminal = vscode.window.createTerminal("Brio");
        }
        return brioExecTerminal;
    }
    
    const commandSetInterpreter = () => {
        vscode.window.showInputBox({
            prompt: "Enter the full path to Brio to use for this workspace.",
            value: String(getInterpreterPath(context))
        }).then((data) => {
            if (data != undefined){
                vscode.window.showInformationMessage("Workspace Brio interpreter updated.");
                setInterpreterPath(context, data);
                updateStatusBar(context, statusBarItem);
            }
        });
    }

    const commandClearInterpreter = () => {
        vscode.window.showInformationMessage("Workspace Brio interpreter cleared.");
        setInterpreterPath(context, undefined);
        updateStatusBar(context, statusBarItem);
    }

    const commandStartREPL = () => {
        let terminal = vscode.window.createTerminal("Brio", String(getInterpreterPath(context)), ["-i"]);
        terminal.show();
    };
    
    const commandExecInTerminal = () => {
        if (vscode.window.activeTextEditor == undefined){
            return;
        }

        let currentlyOpenFile = vscode.window.activeTextEditor?.document.uri.fsPath;
        let terminal = getTerminal();

        terminal.show();
        terminal.sendText(String(getInterpreterPath(context)) + " " + String(currentlyOpenFile))
    }
    
    const commandExecInTerminalIcon = () => {
        commandExecInTerminal();
    }

    vscode.window.onDidCloseTerminal(terminal => {
        if (terminal.processId == brioExecTerminal?.processId){
            brioExecTerminal = undefined;
        }
    });

    context.subscriptions.push(
		vscode.commands.registerCommand(Commands.Start_REPL, commandStartREPL),
		vscode.commands.registerCommand(Commands.Set_Interpreter, commandSetInterpreter),
        vscode.commands.registerCommand(Commands.Clear_Interpreter, commandClearInterpreter),
		vscode.commands.registerCommand(Commands.Exec_In_Terminal, commandExecInTerminal),
		vscode.commands.registerCommand(Commands.Exec_In_Terminal_Icon, commandExecInTerminalIcon)
	);
}