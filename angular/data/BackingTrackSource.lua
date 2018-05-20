BackingTrackSource = {}
root = "D:/Temp/backingtracks/backingtracks"
function BackingTrackSource.getLocation(name)
    return root .. "/" .. name .. "/" .. name .. ".RPP"
end
