# Guitar Tools Suite Launcher
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$indexPath = Join-Path $scriptPath "index.html"
Start-Process $indexPath


