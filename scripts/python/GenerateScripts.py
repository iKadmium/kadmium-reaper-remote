from pathlib import Path
from shutil import copyfile

sourceName = "OpenFileScriptTemplate.lua"

directoryTemplate = Path('.')
paths = []

for filePath in directoryTemplate.iterdir():
    if not filePath.name.startswith(".") and filePath.is_dir():
        paths.append(filePath)

for path in paths:
    print("Creating script for " + path.name)
    destName = "Open " + path.name + ".lua"
    copyfile(sourceName, "Open " + path.name + ".lua")
