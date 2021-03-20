import * as vscode from 'vscode';
import { Settings } from './contants';

import util = require('util');
const exec = util.promisify(require('child_process').exec);


/** 
 * Returns the full path to the Brio interpreter. If a workspace interpreter is set it will be used,
 * otherwise the extension setting `brio.defaultInterpreterPath` will be used. 
 * 
 * @param context The vscode extension context
 */
export const getInterpreterPath = (context: vscode.ExtensionContext) => {
    let defaultInterpreter = vscode.workspace.getConfiguration().get(Settings.Default_Interpreter_Path);
    let workspaceInterpreter = context.workspaceState.get(Settings.Workspace_Interpreter_Path);

    if (workspaceInterpreter != undefined){
        return workspaceInterpreter;
    }

    return defaultInterpreter;
}

/**
 * Sets the workspace Brio interpreter to the provided path.
 * 
 * @param context The vscode extension context
 * @param path The full path to a brio intepreter
 */
export const setInterpreterPath = (context: vscode.ExtensionContext, path: string | undefined) => {
    context.workspaceState.update(Settings.Workspace_Interpreter_Path, path);
}

/**
 * Executes `brio --version` with the configured Brio intepreter.
 * 
 * @param context The vscode extension context
 * @returns stdout
 */
export async function getBrioVersion(context: vscode.ExtensionContext) {
    let interpreter = getInterpreterPath(context);
    const { stdout } = await exec(interpreter + " --version")
    return stdout;
}