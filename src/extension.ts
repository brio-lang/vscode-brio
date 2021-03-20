import * as vscode from 'vscode';
import { registerCommands } from './commands';
import { registerStatusBar } from './statusbar';


/**
 * Wrapper that encapsulates the Brio language extension functionality.
 */
class BrioExtension {
	context: vscode.ExtensionContext;
	statusBarItem: vscode.StatusBarItem;
	
	constructor(context: vscode.ExtensionContext){
		this.context = context;
		this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	}

	activate() {
		registerStatusBar(this.context, this.statusBarItem);
		registerCommands(this.context, this.statusBarItem);
	}
}

/**
 * Invoked when the extension is activated.
 * 
 * @param context The vscode extension context
 */
export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "brio" is now active.');
	new BrioExtension(context).activate();
}

/**
 * Invoked when the extension is deactivated.
 */
export function deactivate() {}