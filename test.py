#### Test API add category 
import requests

# URL của API
url = "http://localhost:8080/category"

# Form data
data = {
    "name": "Mouse Rapoo",
    "description": "Best choice of the year 2024"
}

# File ảnh
file_path = "D:\P3idiots\img\rocky1.jpg.jpg"  # Thay đường dẫn file ảnh trên laptop của bạn
files = {
    "avatar": open(file_path, "rb")  # Mở file ảnh ở chế độ đọc nhị phân
}

Gửi yêu cầu POST
response = requests.post(url, data=data, files=files)

In ra phản hồi từ API
print("Status Code:", response.status_code)
print("Response Body:", response.text)