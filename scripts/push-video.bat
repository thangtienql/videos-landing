@echo off
REM Upload script for AI-auto-generate-video pipeline
REM Usage: push-video.bat <project-name>
REM Example: push-video.bat 1743290000-messi-mls

set PROJECT=%1
if "%PROJECT%"=="" (
  echo Usage: %0 ^<project-name^>
  echo Example: %0 1743290000-messi-mls
  exit /b 1
)

set REPO_DIR=C:\Users\admin\videos-landing
set PIPELINE_DIR=C:\Users\admin\AI-auto-generate-video\output\%PROJECT%
set VIDEO_DIR=%REPO_DIR%\videos\%PROJECT%

if not exist "%PIPELINE_DIR%\video.mp4" (
  echo Error: %PIPELINE_DIR%\video.mp4 not found
  exit /b 1
)

if not exist "%REPO_DIR%" (
  cd /d C:\Users\admin
  git clone git@github.com:thangtienql/videos-landing.git
)

mkdir "%VIDEO_DIR%" 2>nul

copy "%PIPELINE_DIR%\video.mp4" "%VIDEO_DIR%\video.mp4"

if exist "%PIPELINE_DIR%\voice.mp3" copy "%PIPELINE_DIR%\voice.mp3" "%VIDEO_DIR%\voice.mp3"

REM Generate meta.json
powershell -Command "$meta = @{ title='%PROJECT%'; duration=''; date=(Get-Date -Format 'yyyy-MM-dd HH:mm') }; $meta | ConvertTo-Json | Set-Content '%VIDEO_DIR%\meta.json'"

cd /d "%REPO_DIR%"
git add videos/%PROJECT%/
git commit -m "add video: %PROJECT%"
git push

echo Done: pushed %PROJECT% to GitHub
