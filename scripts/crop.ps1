Add-Type -AssemblyName System.Drawing
$filePath = "D:\contribution\saas-boilerplate-platform\public\reference-hero.png"
$img = [System.Drawing.Image]::FromFile($filePath)
$w = $img.Width
$h = $img.Height
Write-Host "Dimensions: $w x $h"

$cropX = [int]($w * 0.05)
$cropY = [int]($h * 0.44)
$cropW = [int]($w * 0.35)
$cropH = [int]($h * 0.55)

$rect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
$bmp = New-Object System.Drawing.Bitmap $cropW, $cropH
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $cropW, $cropH), $rect, [System.Drawing.GraphicsUnit]::Pixel)
$outputPath = "D:\contribution\saas-boilerplate-platform\public\pepe-mascot-hero.png"
$bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
$img.Dispose()
Write-Host "Pepe mascot cropped successfully to $outputPath"
