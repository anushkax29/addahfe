from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from colorthief import ColorThief
import webcolors
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_dominant_color(image_path):
    try:
        color_thief = ColorThief(image_path)
        return color_thief.get_color(quality=1)
    except Exception as e:
        raise RuntimeError(f"Color detection failed: {str(e)}")

def get_color_name(rgb_tuple):
    try:
        return webcolors.rgb_to_name(rgb_tuple)
    except ValueError:
        closest = webcolors.rgb_to_name(webcolors.hex_to_rgb(
            webcolors.rgb_to_hex(rgb_tuple)), spec='css3')
        return f"closest: {closest}"
    except Exception:
        return "unknown"

def recommend_outfit(color):
    color = color.lower()
    suggestions = {
        "blue": "Pair with white or beige bottoms",
        "black": "Classic with red accessories or gray layers",
        "red": "Complement with black or denim",
        "white": "Perfect with dark contrast colors",
        "green": "Try neutral tones like brown or cream",
        "navy": "Combine with khaki or coral accents",
        "gray": "Works well with bright pops of color",
        "unknown": "Neutral tones (black, white, beige) recommended"
    }
    return suggestions.get(color.split(':')[-1].strip(), suggestions['unknown'])

@app.route('/')
def home():
    return jsonify({
        "status": "Server running",
        "endpoints": {
            "/color-recommendation": "POST image for color analysis"
        }
    })

@app.route('/color-recommendation', methods=['POST'])
def color_recommendation():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image provided"}), 400

        file = request.files['image']
        
        if file.filename == '' or not allowed_file(file.filename):
            return jsonify({"error": "Invalid or missing image file"}), 400

        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)

        dominant_color = get_dominant_color(filepath)
        color_name = get_color_name(dominant_color)
        recommendation = recommend_outfit(color_name)

        # Clean up uploaded file
        if os.path.exists(filepath):
            os.remove(filepath)

        return jsonify({
            "dominant_rgb": dominant_color,
            "color_name": color_name,
            "recommendation": recommendation
        })

    except Exception as e:
        # Cleanup if error occurred after file save
        if 'filepath' in locals() and os.path.exists(filepath):
            os.remove(filepath)
        return jsonify({
            "error": str(e),
            "message": "Failed to process image"
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)