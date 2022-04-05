
git clone https://github.com/phucleit/omcloud
cd omcloud
npm install
npm start

# Sửa lỗi package (không cần thiết)
"start": "set PORT=4000 && react-scripts start",
"start": "react-scripts --openssl-legacy-provider start",