# Brio support for Visual Studio Code

Adds support for the [Brio language](https://www.brio-lang.org) to Visual Studio Code.

## Quick Start
- **Step 1**: [Download](https://www.brio-lang.org/download/) and build Brio on your system.
- **Step 2**: Install the Brio extension for Visual Studio Code.
- **Step 3**: Open or create a Brio file and start coding!

## Set Up Your Environment

* Select your Brio interpreter by clicking on the status bar:

![Select Interpreter](https://brio-lang-static-files.s3-us-west-2.amazonaws.com/vscode-brio/select_interpreter.gif)

By default, the extension will attempt to resolve the interpreter with `brio`. However, if `brio` is not in your PATH or you wish to use a custom version, you may set a workspace interpreter by providing the full path to your Brio interpeter. 

Note: If you are on Windows, it is recommended to build Brio in a WSL environment and connect via [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack).

## Extension Demo
![Demo](https://brio-lang-static-files.s3-us-west-2.amazonaws.com/vscode-brio/code_example.gif)

## Useful Commands
Open the Command Palette and enter one of the following commands:

| Command | Description |
| --- | --- |
| `Brio: Select Interpreter` | Set the workspace Brio interpreter path. |
| `Brio: Clear Interpreter` | Clear the workspace Brio interpreter (default will be used). |
| `Brio: Start REPL` | Start an interactive Brio REPL in the VS Code terminal. |
| `Brio: Run Brio File in Terminal` | Runs the active Brio file in the VS Code terminal. |

## Release Notes

### 1.1.0

- Added the following commands:
  - `Brio: Select Interpreter`
  - `Brio: Clear Interpreter`
  - `Brio: Start REPL`
  - `Brio: Run Brio File in Terminal`

- Added the ability to define a default and workspace Brio interpreter. 

- Added a run/play icon for easier execution of Brio programs. 

- Added improvements to syntax highlighting.

## 1.0.0

- Initial release with syntax highlighting support