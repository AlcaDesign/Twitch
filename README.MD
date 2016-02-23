# [Repository Site](https://alcadesign.github.io/Twitch/)
Work in progress.

---

## General Install Requirements

These requirements go for most of the projects in this repository, but some may specify other things to add.

- Streaming software like [OBS](https://obsproject.com/), [XSplit](https://www.xsplit.com/), or any other streaming software that supports web browser sources. (I don't suggest keying a capture of a browser window as it is a low-quality solution)
- [NodeJS](http://nodejs.org/) v5.6.x or higher
	- with NPM
- [Git](https://git-scm.com/download/) v1.x.x or higher.
	- I suggest choosing to "Use Git from the Windows Command Prompt" in Windows and however it applies elsewhere. Default options are perfect, otherwise.

## How to use a terminal

In the interest of these projects, some will require you to use a command prompt in order to make things work. Things like installing dependencies, running web servers, and more.

**Note:** when it gives you a command like `$ <command to run>`, the "$" means the prompt characters before the input area.

- *Windows*: this looks like "C:\path\to\folder>"
- *Unix systems*: this looks like "user@host: directory $"
- When you see `$ <command here>`, it wants to to put the command into the related terminal/console.

#### How to "cd" into a folder
If you see "`$ cd` into the folder", this means to open a command prompt and change the directory using the "cd" command.

As I only use a Windows desktop machine, the only shortcut I know is:

- Open the folder in an Explorer window or navigate to it, (`Windows Key` + `E` to open a new Explorer window)
- Click on the address bar or press `alt` + `D` to focus there
- Type "cmd" to open a Command Prompt that is defaulted to this folder.

#### Start a script
Type "`npm start`" or whatever may be specified in the project's README and press enter. Generally, you may use the command "`$ node index.js`" to start most scripts if the previous fails.

#### Stop a script
Press the `ctrl` + `C` shortcut. It may take multiple times to completely end a script. It's alright to use this when it says "Terminate batch job (Y/N)?" instead of typing "y" and pressing enter
