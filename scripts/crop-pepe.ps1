Add-Type -AssemblyName System.Drawing

$inputPath = "D:\contribution\saas-boilerplate-platform\public\reference-hero.png"
$img = [System.Drawing.Image]::FromFile($inputPath)
$w = $img.Width
$h = $img.Height

# Mascot crop coordinates (x: 8% to 37%, y: 48% to 92%)
$x = [int]($w * 0.08)
$y = [int]($h * 0.48)
$width = [int]($w * 0.29)
$height = [int]($h * 0.44)

$cropArea = New-Object System.Drawing.Rectangle $x, $y, $width, $height
$bmp = New-Object System.Drawing.Bitmap $width, $height
$graphics = [System.Drawing.Graphics]::FromImage($bmp)
$destRect = New-Object System.Drawing.Rectangle 0, 0, $width, $height

$graphics.DrawImage($img, $destRect, $cropArea, [System.Drawing.GraphicsUnit]::Pixel)
$outputPath = "D:\contribution\saas-boilerplate-platform\public\pepe-exact.png"
$bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$graphics.Dispose()
$bmp.Dispose()
$img.Dispose()

Write-Host "Done! Cropped to $outputPath"
