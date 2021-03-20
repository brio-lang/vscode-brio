/**
 * The commands supported by the Brio extension.
 */
export namespace Commands {
    export const Set_Interpreter = "brio.setInterpreter";
    export const Clear_Interpreter = "brio.clearInterpreter";
    export const Start_REPL = "brio.startREPL";
    export const Exec_In_Terminal = "brio.execInTerminal";
    export const Exec_In_Terminal_Icon = "brio.execInTerminal-icon";
}

/**
 * The settings supported by the Brio extension.
 */
export namespace Settings {
    export const Default_Interpreter_Path = "brio.defaultInterpreterPath";
    export const Workspace_Interpreter_Path = "brio.workspaceInterpreterPath";
}