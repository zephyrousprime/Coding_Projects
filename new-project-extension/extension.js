const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
    let disposable = vscode.commands.registerCommand('newProject.create', async () => {
        const folderName = await vscode.window.showInputBox({
            prompt: 'Enter the new project folder name',
            placeHolder: 'my-new-project'
        });

        if (!folderName) return;

        const config = vscode.workspace.getConfiguration('newProject');
        const files = config.get('files', ['index.html', 'style.css', 'script.js']);
        const templateDirName = config.get('templateDir', '01_new projects');

        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath;
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder open');
            return;
        }

        const templateDir = path.join(workspaceFolder, templateDirName);
        const newDir = path.join(templateDir, folderName);

        if (!fs.existsSync(templateDir)) {
            vscode.window.showErrorMessage(`Template folder "${templateDirName}" not found`);
            return;
        }

        if (fs.existsSync(newDir)) {
            vscode.window.showErrorMessage(`Folder "${folderName}" already exists`);
            return;
        }

        try {
            fs.mkdirSync(newDir, { recursive: true });

            const copiedFiles = [];
            for (const file of files) {
                const src = path.join(templateDir, file);
                const dest = path.join(newDir, file);
                if (fs.existsSync(src)) {
                    fs.copyFileSync(src, dest);
                    copiedFiles.push(file);
                } else {
                    vscode.window.showWarningMessage(`Template file "${file}" not found, skipping`);
                }
            }

            vscode.window.showInformationMessage(`Project "${folderName}" created with ${copiedFiles.length} files`);

            for (const file of copiedFiles) {
                const doc = await vscode.workspace.openTextDocument(path.join(newDir, file));
                await vscode.window.showTextDocument(doc, { preview: false });
            }
        } catch (err) {
            vscode.window.showErrorMessage(`Failed to create project: ${err.message}`);
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = { activate, deactivate };
