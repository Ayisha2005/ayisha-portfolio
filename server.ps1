$port = 3000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

try {
    $listener.Start()
    Write-Host "=========================================="
    Write-Host "  Ayisha Parveen A Portfolio Web Server"
    Write-Host "  Running live at: http://localhost:$port/"
    Write-Host "=========================================="
} catch {
    Write-Host "Failed to start listener on port ${port}"
    exit 1
}

$root = $PSScriptRoot
$logFile = Join-Path $root "contact_messages.json"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or [string]::IsNullOrWhiteSpace($urlPath)) { 
            $urlPath = "/index.html" 
        }
        
        # Handle API POST /api/contact
        if ($request.HttpMethod -eq "POST" -and $urlPath -eq "/api/contact") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
            $jsonBody = $reader.ReadToEnd()
            $reader.Close()
            
            # Save message entry to contact_messages.json log
            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            $entry = "[${timestamp}] ${jsonBody}`n"
            [System.IO.File]::AppendAllText($logFile, $entry)
            
            $resPayload = '{"success":true,"message":"Message sent successfully to Ayisha Parveen A!"}'
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($resPayload)
            $response.ContentType = "application/json; charset=utf-8"
            $response.StatusCode = 200
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        # Handle API POST /api/newsletter
        if ($request.HttpMethod -eq "POST" -and $urlPath -eq "/api/newsletter") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
            $jsonBody = $reader.ReadToEnd()
            $reader.Close()
            
            $resPayload = '{"success":true,"message":"Subscribed successfully!"}'
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($resPayload)
            $response.ContentType = "application/json; charset=utf-8"
            $response.StatusCode = 200
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        $filePath = Join-Path $root ($urlPath.TrimStart('/').Replace('/', '\'))
        
        # Fallback check for /public/ or root files if path not found directly
        if (-not (Test-Path $filePath -PathType Leaf)) {
            $altPath = Join-Path $root ("public" + $urlPath.Replace('/', '\'))
            if (Test-Path $altPath -PathType Leaf) {
                $filePath = $altPath
            }
        }
        
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            
            switch ($ext) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css"  { $response.ContentType = "text/css; charset=utf-8" }
                ".js"   { $response.ContentType = "application/javascript; charset=utf-8" }
                ".pdf"  { 
                    $response.ContentType = "application/pdf"
                    $response.AddHeader("Content-Disposition", "attachment; filename=Ayisha_Parveen_A_Resume.pdf")
                }
                ".jpg"  { $response.ContentType = "image/jpeg" }
                ".jpeg" { $response.ContentType = "image/jpeg" }
                ".png"  { $response.ContentType = "image/png" }
                ".svg"  { $response.ContentType = "image/svg+xml" }
                ".json" { $response.ContentType = "application/json" }
                default { $response.ContentType = "application/octet-stream" }
            }
            
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 - Not Found")
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        $response.Close()
    } catch {
        # Handle client disconnects gracefully
    }
}
