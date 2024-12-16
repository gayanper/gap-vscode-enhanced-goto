# Enhanced Goto Commands

This extension brings you some missing commands in VS Code using already existing features in vscode

## Features

| Command | Description |
|---------|-------------|
| "Go to Problem in File"| Navigate to the next problem (error, warning) in the current file |
| "Go to Next Symbol in File" | Jump to the next symbol (function, class, etc.) in the current file |
| "Go to Previous Symbol in File" | Jump to the previous symbol (function, class, etc.) in the current file |


## Requirements

- The Symbol commands depends on the symbols provided by the underlying language symbol provider in vscode.
- The Problem command depends on the diagnostics provided by the underlying language symbol provider in vscode. 

## Release Notes

### Release History

- **1.0.0** : Initial release of features
    - "Go to Problem in File"
    - "Go to Next Symbol in File" 
    - "Go to Previous Symbol in File" |