@echo off
echo 📦 Preparing Allure report with trend...

REM Kiểm tra thư mục history từ báo cáo cũ
if exist allure-report\history (
    echo 🔁 Copying history to preserve trend...
    xcopy /E /Y /I allure-report\history allure-results\history > nul
)

REM Generate báo cáo Allure mới
echo 🚀 Generating new Allure report...
npx allure generate allure-results --clean -o allure-report

REM Mở báo cáo Allure
echo 🌐 Opening Allure report in browser...
npx allure open allure-report

