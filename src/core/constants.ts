// Just a central file to edit constant variables across updates.
// I don't recommend changing this unless you know what you are doing.

export const version = '1.0';
export const baseAPI = 'https://api.clarioncorp.net';


// Yes I am fully aware that I put a token in the source code.
// This is basically the public permissions + 1 with a lot of rate limiting per origin.
// AKA, it barely does anything above just public usage of CC API.
export const cc_access = '';


// File Path Suffixes (after user home folder)
export const windows_log = 'AppData\\Local\\OmegaStrikers\\Saved\\Logs\\OmegaStrikers.log';
export const linux_log = '.steam/steam/steamapps/compatdata/1869590/pfx/drive_c/users/steamuser/AppData/Local/OmegaStrikers/Saved/Logs/OmegaStrikers.log';