from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoImageProcessor, AutoModelForSemanticSegmentation
from PIL import Image
import requests
import torch

# Pydantic model for request body validation
class Coordinates(BaseModel):
    lat: float
    lon: float

app = FastAPI()

# Configure CORS to allow your React app to make requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Load the AI model and processor from Hugging Face
processor = AutoImageProcessor.from_pretrained("nvidia/segformer-b0-finetuned-ade-512-512")
model = AutoModelForSemanticSegmentation.from_pretrained("nvidia/segformer-b0-finetuned-ade-512-512")

@app.post("/analyze-area")
async def analyze_area(coords: Coordinates):
    # 1. Fetch a satellite image for the given coordinates
    image_url = f"https://staticmap.openstreetmap.de/staticmap.php?center={coords.lat},{coords.lon}&zoom=15&size=400x400&maptype=mapnik"
    try:
        image = Image.open(requests.get(image_url, stream=True).raw).convert("RGB")
    except Exception as e:
        return {"error": f"Failed to fetch satellite image: {e}"}

    # 2. Process the image and run it through the AI model
    inputs = processor(images=image, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
    
    logits = outputs.logits.cpu()
    predicted_semantic_map = logits.argmax(dim=1)[0]
    
    # 3. Analyze the results to generate insights
    total_pixels = predicted_semantic_map.numel()
    # Class IDs for ADE20K dataset: 4=water, 9=tree, 12=grass, 17=building
    vegetation_pixels = (predicted_semantic_map == 9).sum().item() + (predicted_semantic_map == 12).sum().item()
    water_pixels = (predicted_semantic_map == 4).sum().item()
    building_pixels = (predicted_semantic_map == 17).sum().item()

    vegetation_percentage = round((vegetation_pixels / total_pixels) * 100, 2)
    water_percentage = round((water_pixels / total_pixels) * 100, 2)
    building_percentage = round((building_pixels / total_pixels) * 100, 2)

    # 4. Create a simple report
    report = {
        "vegetation_coverage": f"{vegetation_percentage}%",
        "water_presence": f"{water_percentage}%",
        "building_density": f"{building_percentage}%",
        "analysis_summary": f"Area primarily consists of vegetation ({vegetation_percentage}%). Water presence is {'low' if water_percentage < 5 else 'notable'}."
    }

    return report