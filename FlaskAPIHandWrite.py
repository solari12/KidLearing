import base64
import io
from flask import Flask, request, jsonify
from PIL import Image, ImageOps
import torch
from torch import nn
from torchvision import transforms

# Khởi tạo Flask app
app = Flask(__name__)

# Định nghĩa mô hình CNN
class CNNModel(nn.Module):
    def __init__(self):
        super(CNNModel, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = self.pool(torch.relu(self.conv1(x)))
        x = self.pool(torch.relu(self.conv2(x)))
        x = x.view(-1, 64 * 7 * 7)
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# Load mô hình đã huấn luyện
model = CNNModel()
model.load_state_dict(torch.load('handwriting_model.pth', map_location='cpu'))
model.eval()

# Transform tiền xử lý ảnh
transform = transforms.Compose([
    transforms.Resize((28, 28)),
    transforms.Grayscale(num_output_channels=1),
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,)),
    transforms.Lambda(lambda x: 1 - x)  # Đảo màu: trắng → đen, đen → trắng
])

@app.route('/recognize', methods=['POST'])
def recognize():
    try:
        data = request.get_json()

        if 'image' not in data:
            return jsonify({'error': 'Thiếu ảnh base64'}), 400

        base64_image = data['image']
        if ',' in base64_image:
            base64_image = base64_image.split(',')[1]

        # Giải mã base64 thành ảnh
        image_bytes = io.BytesIO(base64.b64decode(base64_image))
        image = Image.open(image_bytes).convert('RGB')  # Chuyển RGB (sau đó grayscale trong transform)

        # Tiền xử lý ảnh
        image_tensor = transform(image).unsqueeze(0)  # Shape: [1, 1, 28, 28]
        image.save('handwriting_image.jpg')
        # Dự đoán
        with torch.no_grad():
            output = model(image_tensor)
            _, predicted = torch.max(output, 1)
        print(predicted[0])
        return jsonify({'character': str(predicted.item())})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Chạy server Flask
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
