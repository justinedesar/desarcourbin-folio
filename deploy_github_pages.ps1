# ============================================================
# DEPLOY - Desar Courbin Portfolio vers GitHub Pages
# Prerequis : git + bun installes, PowerShell
# ============================================================
# 1. Lance : & ".\deploy_github_pages.ps1"
# 2. Saisis ton token GitHub quand demande
# ============================================================

$GH_USER = "justinedesar"
$GH_REPO = "desarcourbin-folio"
$PROJECT = "C:\Users\justi\OneDrive\0_site\Github\desarcourbin-folio"

# ----- Ne pas modifier en dessous -----

# Ajoute git au PATH si necessaire
$env:PATH = "C:\Program Files\Git\cmd;C:\Program Files\Git\bin;" + $env:PATH

$TOKEN = Read-Host "GitHub Personal Access Token (scope: repo)" -AsSecureString
$TOKEN = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($TOKEN))

$HDR = @{
    Authorization  = "token $TOKEN"
    Accept         = "application/vnd.github.v3+json"
    "Content-Type" = "application/json"
}

# === 1. Build ===
Write-Host ""
Write-Host "=== 1. Build ===" -ForegroundColor Cyan
Set-Location $PROJECT
bun run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERREUR] Build echoue." -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Build termine - dist/ genere" -ForegroundColor Green

# .nojekyll requis pour que GitHub Pages serve les assets avec underscore
New-Item -ItemType File -Path "$PROJECT\dist\.nojekyll" -Force | Out-Null

# === 2. Creation du repo GitHub si necessaire ===
Write-Host ""
Write-Host "=== 2. Creation du repo GitHub ===" -ForegroundColor Cyan
$repoBody = @{ name = $GH_REPO; private = $false; auto_init = $false } | ConvertTo-Json -Compress
try {
    Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method POST -Headers $HDR -Body $repoBody | Out-Null
    Write-Host "[OK] Repo cree : github.com/$GH_USER/$GH_REPO" -ForegroundColor Green
} catch {
    Write-Host "[INFO] Repo existe deja - OK" -ForegroundColor Yellow
}

# === 3. Push dist/ vers branche gh-pages ===
Write-Host ""
Write-Host "=== 3. Deploiement sur gh-pages ===" -ForegroundColor Cyan

$remoteUrl = "https://$TOKEN@github.com/$GH_USER/$GH_REPO.git"
$tmpDir = "$env:TEMP\ghpages-$(Get-Random)"

New-Item -ItemType Directory -Path $tmpDir | Out-Null
Copy-Item "$PROJECT\dist\*" $tmpDir -Recurse -Force

Push-Location $tmpDir
git init -b gh-pages | Out-Null
git config user.email "deploy@local"
git config user.name "Deploy Script"
git add .
$dateStr = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "Deploy $dateStr" | Out-Null
git remote add origin $remoteUrl
git push --force origin gh-pages
$pushOk = $LASTEXITCODE
Pop-Location
Remove-Item $tmpDir -Recurse -Force

if ($pushOk -ne 0) {
    Write-Host "[ERREUR] Push echoue. Verifie ton token (scope repo requis)." -ForegroundColor Red
    exit 1
}
Write-Host "[OK] dist/ pousse sur gh-pages" -ForegroundColor Green

# === 4. Activation de GitHub Pages ===
Write-Host ""
Write-Host "=== 4. Activation de GitHub Pages ===" -ForegroundColor Cyan
$pagesBody = '{"source":{"branch":"gh-pages","path":"/"}}'
try {
    Invoke-RestMethod -Uri "https://api.github.com/repos/$GH_USER/$GH_REPO/pages" -Method POST -Headers $HDR -Body $pagesBody | Out-Null
    Write-Host "[OK] GitHub Pages active" -ForegroundColor Green
} catch {
    Write-Host "[INFO] GitHub Pages deja actif - OK" -ForegroundColor Yellow
}

# === Resultat ===
Write-Host ""
Write-Host "================================================" -ForegroundColor White
Write-Host " DEPLOY TERMINE" -ForegroundColor Green
Write-Host " URL disponible dans ~60 secondes :" -ForegroundColor White
Write-Host " https://$GH_USER.github.io/$GH_REPO/" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor White
Write-Host ""
