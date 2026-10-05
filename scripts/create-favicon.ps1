# Render the original brand mark as native SVG paths for the browser tab.
# The source PNG remains unchanged. Its wordmark is outside this view.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$projectDirectory = Split-Path -Parent $PSScriptRoot
$sourcePath = Join-Path $projectDirectory 'public/images/logo-servinex.png'
$outputPath = Join-Path $projectDirectory 'public/favicon-servinex.svg'
$sourceLogo = [System.Drawing.Bitmap]::new($sourcePath)
$navyPath = [System.Text.StringBuilder]::new()
$orangePath = [System.Text.StringBuilder]::new()

try {
  if ($sourceLogo.Width -ne 1254 -or $sourceLogo.Height -ne 1254) {
    throw 'The favicon framing expects the original 1254 x 1254 logo.'
  }
  foreach ($tone in @('navy', 'orange')) {
    $svgPath = if ($tone -eq 'navy') { $navyPath } else { $orangePath }
    for ($row = 520; $row -lt 716; $row++) {
      $runStart = -1
      for ($column = 64; $column -le 441; $column++) {
        $inside = $false
        if ($column -lt 441) {
          $pixel = $sourceLogo.GetPixel($column, $row)
          $inside = if ($tone -eq 'navy') {
            $pixel.B -gt ($pixel.R + 25) -and $pixel.R -lt 120 -and $pixel.G -lt 170
          } else {
            $pixel.R -gt 180 -and $pixel.G -gt 50 -and $pixel.G -lt 190 -and $pixel.B -lt 120
          }
        }
        if ($inside -and $runStart -lt 0) { $runStart = $column }
        if (!$inside -and $runStart -ge 0) {
          [void]$svgPath.Append(('M{0} {1}h{2}v1H{0}z' -f $runStart, $row, ($column - $runStart)))
          $runStart = -1
        }
      }
    }
  }
} finally { $sourceLogo.Dispose() }

if ($navyPath.Length -eq 0 -or $orangePath.Length -eq 0) { throw 'The brand colors were not found.' }
$svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" rx="65" fill="white"/><g transform="translate(-58 -418)"><path fill="#082b50" d="' + $navyPath + '"/><path fill="#ff792b" d="' + $orangePath + '"/></g></svg>'
[System.IO.File]::WriteAllText($outputPath, $svg, [System.Text.UTF8Encoding]::new($false))
Write-Output 'Created public/favicon-servinex.svg from the supplied brand mark.'
