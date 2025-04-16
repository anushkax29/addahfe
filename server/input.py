from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # CORS configuration

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create upload directory if not exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def home():
    return jsonify({
        "status": "Server running",
        "message": "Connect to /upload endpoint for file uploads"
    })

@app.route('/upload', methods=['POST'])
def upload():
    try:
        # Validate image file exists
        if 'image' not in request.files:
            return jsonify({
                "success": False,
                "error": "No image file provided"
            }), 400

        image_file = request.files['image']
        
        # Validate filename
        if image_file.filename == '':
            return jsonify({
                "success": False,
                "error": "Empty filename"
            }), 400
            
        if not allowed_file(image_file.filename):
            return jsonify({
                "success": False,
                "error": f"Invalid file type. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
            }), 400

        # Save file
        filename = os.path.join(app.config['UPLOAD_FOLDER'], image_file.filename)
        image_file.save(filename)

        # Get form data
        occasion = request.form.get('occasion', '').lower()
        weather = request.form.get('weather', '').lower()

        # Validate inputs
        allowed_occasions = ["casual", "formal", "festive", "party", "work"]
        allowed_weather = ["summer", "winter", "rainy", "fall", "spring"]
        
        if occasion not in allowed_occasions:
            raise ValueError(f"Invalid occasion. Allowed: {', '.join(allowed_occasions)}")
            
        if weather not in allowed_weather:
            raise ValueError(f"Invalid weather. Allowed: {', '.join(allowed_weather)}")

        # Verify image integrity
        with Image.open(filename) as img:
            img.verify()

        return jsonify({
            "success": True,
            "message": "File uploaded successfully",
            "data": {
                "filename": image_file.filename,
                "occasion": occasion,
                "weather": weather,
                "path": f"/{filename}"
            }
        })

    except Exception as e:
        # Cleanup file if error occurs
        if 'filename' in locals() and os.path.exists(filename):
            os.remove(filename)
            
        return jsonify({
            "success": False,
            "error": str(e)
        }), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
    