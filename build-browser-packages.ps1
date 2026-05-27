param(
  [switch]$PackYandex
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$dist = Join-Path $root "dist"
$chromeDist = Join-Path $dist "chrome"
$yandexDist = Join-Path $dist "yandex"
$firefoxDist = Join-Path $dist "firefox"

$commonFiles = @(
  "index.html",
  "script.js",
  "styles.css",
  "background.js",
  "auto-link-title.js",
  "image.png",
  "image2.png"
)

$assetDir = Join-Path $root "assets"

function Reset-DistDir($path) {
  if (Test-Path $path) {
    Remove-Item -Path $path -Recurse -Force
  }

  New-Item -Path $path -ItemType Directory -Force | Out-Null
  New-Item -Path (Join-Path $path "assets") -ItemType Directory -Force | Out-Null
}

function Copy-CommonFiles($target) {
  foreach ($file in $commonFiles) {
    Copy-Item -Path (Join-Path $root $file) -Destination (Join-Path $target $file) -Force
  }

  Copy-Item -Path (Join-Path $assetDir "*") -Destination (Join-Path $target "assets") -Recurse -Force
}

Reset-DistDir $chromeDist
Copy-CommonFiles $chromeDist
Copy-Item -Path (Join-Path $root "manifest.chrome.json") -Destination (Join-Path $chromeDist "manifest.json") -Force

Reset-DistDir $yandexDist
Copy-CommonFiles $yandexDist
Copy-Item -Path (Join-Path $root "manifest.yandex.json") -Destination (Join-Path $yandexDist "manifest.json") -Force
Copy-Item -Path (Join-Path $root "yandex-newtab-hotkey.ahk") -Destination (Join-Path $yandexDist "yandex-newtab-hotkey.ahk") -Force

Reset-DistDir $firefoxDist
Copy-CommonFiles $firefoxDist
Copy-Item -Path (Join-Path $root "manifest.firefox.json") -Destination (Join-Path $firefoxDist "manifest.json") -Force

Write-Host "Built Chrome package: $chromeDist"
Write-Host "Built Yandex package: $yandexDist"
Write-Host "Built Firefox package: $firefoxDist"

if ($PackYandex) {
  $browserCandidates = @(
    (Join-Path $env:LOCALAPPDATA "Yandex\YandexBrowser\Application\browser.exe"),
    (Join-Path $env:ProgramFiles "Yandex\YandexBrowser\Application\browser.exe"),
    (Join-Path ${env:ProgramFiles(x86)} "Yandex\YandexBrowser\Application\browser.exe")
  )
  $browserExe = $browserCandidates | Where-Object { $_ -and (Test-Path $_) } | Select-Object -First 1

  if (-not $browserExe) {
    throw "Yandex Browser executable was not found. Build completed, but CRX3 packaging could not be run."
  }

  $crxPath = Join-Path $dist "yandex.crx"
  $keyPath = Join-Path $dist "yandex.pem"
  $packArgs = @("--pack-extension=$yandexDist")
  if (Test-Path $keyPath) {
    $packArgs += "--pack-extension-key=$keyPath"
  }

  if (Test-Path $crxPath) {
    Remove-Item -Path $crxPath -Force
  }

  & $browserExe $packArgs

  Write-Host "Yandex CRX3 packaging requested: $crxPath"
  Write-Host "The browser may create the CRX file shortly after this command exits; check that it appears before installation."
  Write-Host "Keep $keyPath to preserve the extension ID for future packages."
}
