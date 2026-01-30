@echo off
echo Installing dependencies...
python -m pip install -r requirements.txt
echo.
echo Starting server...
python app.py
pause

