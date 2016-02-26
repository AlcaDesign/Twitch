# [Repository Site](https://alcadesign.github.io/Twitch/)
Work in progress.

---

## General Install Requirements

These requirements go for most of the projects in this repository, but some may specify other things to add. Some projects *may not* require you to even clone this repository.

- Streaming software like [OBS](https://obsproject.com/), [XSplit](https://www.xsplit.com/), or any other streaming software that supports web browser sources. (I don't suggest keying a capture of a browser window as it is a low-quality solution)
- [NodeJS](http://nodejs.org/) v5.6.x or higher
	- with NPM
- [Git](https://git-scm.com/download/) v1.x.x or higher.
	- I suggest choosing to "Use Git from the Windows Command Prompt" in Windows and however it applies elsewhere. Default options are perfect, otherwise.


## How to clone this repository

In order to use some of these projects, you may have to install software and/or "clone this repository." This means that you will need to download the contents in this repository to your local machine. You can either:
- Download it [as a .zip](https://github.com/AlcaDesign/Twitch/archive/gh-pages.zip) and extract the files
- Use "git" in a terminal
	- `$ git clone https://github.com/AlcaDesign/Twitch.git`


## How to use a terminal

In the interest of these projects, some will require you to use a terminal or command prompt in order to make things work. Things like installing dependencies, running web servers, and more.

**Note:** when it gives you a command like `$ <command to run>`, the "$" means the prompt characters before the input area.

- *Windows*: this looks like "C:\path\to\folder>"
- *Unix systems*: this looks like "user@host: directory $"
- When you see `$ <command here>`, it wants to to put the command into the related terminal/console

### How to "cd" into a folder
If you see "`$ cd` into the folder", this means to open a command prompt and change the directory using the "cd" command.

As I only use a Windows desktop machine, the only shortcut I know is:

- Open the folder in an Explorer window or navigate to it, (`Windows Key` + `E` to open a new Explorer window)
- Click on the address bar or press `alt` + `D` to focus there
- Type "cmd" to open a Command Prompt that is defaulted to this folder

### Start a script
Type "`npm start`" or whatever may be specified in the project's README and press enter. Generally, you may use the command "`$ node index.js`" to start most scripts if the previous fails. The "`npm start`" command is setup by adding it in the `package.json` file for a project. It's either a shortcut or simplification (via uniformity) for the purposes of my projects. 

### Stop a script
Press the `ctrl` + `C` shortcut. It may take multiple times to completely end a script. It's alright to use this when it says "Terminate batch job (Y/N)?" instead of typing "y" and pressing enter.


## Color Guide

These are color inputs that are taken by CSS and are allowed for use in the projects. All of the examples are equivalent to each other.

| Type | Example                     |
|------|-----------------------------|
| HEX  | `#08F`                      |
|      | `#0088FF`                   |
| RGB  | `rgb(0, 136, 255)`          |
|      | `rgba(0, 136, 255, 0.5)`    |
| HSL  | `hsl(208, 100%, 50%)`       |
|      | `hsla(208, 100%, 50%, 0.5)` |


## Questions, Suggestions, Requests

If you have any questions, suggestions, or requests to add, either start an issue or open a pull request.
