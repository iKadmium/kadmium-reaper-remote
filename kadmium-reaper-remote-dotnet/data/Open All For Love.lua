local info = debug.getinfo(1,'S');
script_path = info.source:match[[^@?(.*[\/])[^\/]-$]]
dofile(script_path .. "BackingTrackSource.lua")
filename = string.sub( info.source, string.len(script_path) + 2)
songName = string.sub(filename, 6, -5)
reaper.Main_openProject(BackingTrackSource.getLocation(songName))