Write-Host "Installing dependencies..." -ForegroundColor Green
python -m pip install -r requirements.txt
Write-Host ""
Write-Host "Starting server..." -ForegroundColor Green
python app.py

