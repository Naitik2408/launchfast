Add-Type -AssemblyName System.Drawing

$inputPath = "D:\contribution\saas-boilerplate-platform\public\dadum-full.webp"
# Webp might not be directly opened by GDI+ System.Drawing if codec missing, let's test:
try {
  $img = [System.Drawing.Image]::FromFile($inputPath)
  Write-Host "Success loading image: $($img.Width) x $($img.Height)"
  $img.Dispose()
} catch {
  Write-Host "Cannot open webp with System.Drawing directly: $_"
}
