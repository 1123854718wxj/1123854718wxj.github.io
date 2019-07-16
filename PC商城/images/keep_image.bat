@echo off   

for /f "delims=" %%a in ('dir /a-d /s /b ') do (   
 
if /i not "%%~xa"==".jpg" (   

if /i not "%%~xa"==".png" (   

if /i not "%%~xa"==".pdf" (   
 
if /i not "%%~xa"==".txt" (   

if /i not "%%~xa"==".bat" del "%%a"  

)   
 
)   

)   
  
)   
  
)
