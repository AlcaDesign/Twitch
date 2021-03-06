# Line Bot-ish

## How to use

Open this link in a browser, fill in the "channel" input and then press enter or
click the "connect" button.

> `https://alcadesign.github.io/Twitch/projects/line-bot/v1/`

Options are automatically saved to the URL hash so you can reload or bookmark a
pre-setup page.

You can configure the join line and leave line commands by changing the text in
the input boxes in the "commands" section. Pressing the "clear all" button will
remove everyone from the line. You can remove specific users by clicking the "x"
by each name. You can sort the list by simply clicking and dragging a name in
the list.

The commands take 1 parameter to insert a specified name into the list. This
functionality is only available to moderators and up.

Example:

```
Alca: !joinline
> "Alca" gets added to the line

Alca: !joinline OtherPerson
> "OtherPerson" gets added to the line

Alca: !leaveline otherperson
> "OtherPerson" gets removed from the line

Alca: !leaveline alCA
> "Alca" gets removed from the line
```
