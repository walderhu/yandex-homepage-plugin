$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$server = Join-Path $root "voice_server.py"
$pythonw = Join-Path $env:ProgramFiles "Python312\pythonw.exe"
$startup = [Environment]::GetFolderPath("Startup")
$shortcutPath = Join-Path $startup "Walderhu Voice Search.lnk"

if (-not (Test-Path $server)) {
  throw "Voice server not found: $server"
}

if (-not (Test-Path $pythonw)) {
  $pythonw = (Get-Command pythonw.exe -ErrorAction Stop).Source
}

$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $pythonw
$shortcut.Arguments = "`"$server`""
$shortcut.WorkingDirectory = $root
$shortcut.Description = "Start Walderhu voice transcription service"
$shortcut.Save()

Start-Process -FilePath $shortcut.TargetPath -ArgumentList $shortcut.Arguments -WindowStyle Hidden
Write-Host "Walderhu voice recognition will now start silently with Windows."
