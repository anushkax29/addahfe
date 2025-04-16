# color_recommender.py
import cv2
import numpy as np
import os
import matplotlib.pyplot as plt
from tensorflow.keras.models import load_model
from collections import defaultdict, Counter

# Load CNN model
try:
    model = load_model("color_recommender_cnn.h5")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    exit(1)

# Color configuration
COLOR_MAPPING = {
    "red": (255, 0, 0),
    "green": (0, 128, 0),
    "blue": (0, 0, 255),
    "black": (0, 0, 0),
    "white": (255, 255, 255),
    "pink": (255, 105, 180),
    "grey": (128, 128, 128),
    "beige": (245, 245, 220),
    "purple": (128, 0, 128),
    "brown": (139, 69, 19),
    "silver": (192, 192, 192)
}

COLOR_NAMES = list(COLOR_MAPPING.keys())

# Dataset
OUTFIT_DATASET = [
    ["white", "blue", "grey"],
    ["black", "red", "white"],
    # ... (rest of your dataset entries)
]

def predict_color(image_path):
    """Predict dominant color using CNN model"""
    try:
        img = cv2.imread(image_path)
        if img is None:
            raise ValueError("Invalid image file")
            
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = cv2.resize(img, (224, 224))
        img = img / 255.0
        img = np.expand_dims(img, axis=0)
        
        prediction = model.predict(img)
        return COLOR_NAMES[np.argmax(prediction)]
    
    except Exception as e:
        raise RuntimeError(f"Prediction failed: {str(e)}")

def build_color_relations():
    """Build color relationship map from dataset"""
    relation_map = defaultdict(Counter)
    for outfit in OUTFIT_DATASET:
        for c1 in outfit:
            for c2 in outfit:
                if c1 != c2:
                    relation_map[c1][c2] += 1
    return relation_map

def get_recommendations(predicted_color, top_k=3):
    """Get color recommendations based on predicted color"""
    relation_map = build_color_relations()
    color = predicted_color.lower()
    
    if color not in relation_map:
        return ["white", "black", "grey"]
    
    return [c for c, _ in relation_map[color].most_common(top_k)]

def display_results(base_color, recommendations):
    """Visualize color recommendations"""
    all_colors = [COLOR_MAPPING[base_color]] + [COLOR_MAPPING[c] for c in recommendations]
    labels = ["Detected"] + ["Suggested"] * len(recommendations)

    fig, ax = plt.subplots(1, len(all_colors), figsize=(10, 2))
    for i, col in enumerate(all_colors):
        ax[i].imshow([[col]])
        ax[i].set_title(labels[i])
        ax[i].axis("off")
    plt.tight_layout()
    plt.show()

def main():
    # Find image file
    image_extensions = ('.jpg', '.jpeg', '.png')
    image_path = next((f for f in os.listdir('.') if f.lower().endswith(image_extensions)), None)

    if not image_path:
        print("No image file found. Please add a JPG/PNG image to the directory.")
        return

    try:
        # Get prediction and recommendations
        predicted_color = predict_color(image_path)
        recommendations = get_recommendations(predicted_color)
        
        print(f"Detected Color: {predicted_color}")
        print("Recommended Colors:", ", ".join(recommendations))
        
        # Display visualization
        display_results(predicted_color, recommendations)
        
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main()