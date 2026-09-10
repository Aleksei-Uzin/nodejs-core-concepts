# File System Command Watcher

The project demonstrates Node.js filesystem APIs by using `command.txt` as a simple command interface for performing filesystem operations.

## How to Run

From the project root:

```bash
cd FileSystem
node src/index.js
```

Start the application, open `command.txt`, enter one of the supported commands, and save the file. Paths in `command.txt` are resolved relative to the directory where the application is started.

## Commands

### Create a file

```text
create a file ./example.txt
```

### Delete the file

```text
delete the file ./example.txt
```

### Rename the file

```text
rename the file ./old.txt to ./new.txt
```

### Add to the file

```text
add to the file ./example.txt this content: Important information!
```

## File Watching

Saving `command.txt` can produce multiple `change` events, depending on the operating system and editor. The watcher forwards each event to the command handler, so create, delete, and rename commands may be attempted more than once.
