"""
FRA-SATYAPAN Project - Backend Server
This script creates a FastAPI web server to provide real-time geospatial insights
and simulates AI-driven historical analysis for FRA claims.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict, Any
import geopandas as gpd
from shapely.geometry import box, shape
import random
import time

# --- Data Loading and Preparation ---

try:
    GEOJSON_FILE = 'concise_file_with_status.geojson'
    gdf = gpd.read_file(GEOJSON_FILE)
    gdf = gdf.to_crs(epsg=4326)
    print("GeoJSON data loaded successfully.")
except Exception as e:
    print(f"Error loading GeoJSON file: {e}")
    gdf = gpd.GeoDataFrame()

# --- FastAPI Application Setup ---

app = FastAPI(
    title="FRA-SATYAPAN API",
    description="Provides AI-powered insights for FRA claim analysis.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API Data Models ---

class MapBounds(BaseModel):
    south: float
    west: float
    north: float
    east: float

# Pydantic model to accept a GeoJSON Feature object
class GeoJSONFeature(BaseModel):
    type: str
    properties: Dict[str, Any]
    geometry: Dict[str, Any]

# --- API Endpoints ---

@app.get("/", summary="Root endpoint")
def read_root():
    return {"status": "FRA-SATYAPAN API is running."}

@app.post("/get-insights", summary="Get Insights for Map View")
def get_insights(bounds: MapBounds):
    if gdf.empty:
        return {"error": "Geospatial data not loaded."}

    view_bounds = box(bounds.west, bounds.south, bounds.east, bounds.north)
    visible_gdf = gdf[gdf.intersects(view_bounds)].copy()
    total_claims = len(visible_gdf)

    if total_claims == 0:
        return {
            "total_claims": 0,
            "status_breakdown": {},
            "area_analysis": {},
            "key_insight": "No claims visible in the current view."
        }

    status_counts = visible_gdf['status'].value_counts()
    status_breakdown = {
        status: {
            "count": int(count),
            "percentage": round((count / total_claims) * 100, 1)
        } for status, count in status_counts.items()
    }
    
    visible_gdf['area_sqkm'] = visible_gdf['geometry'].to_crs(epsg=32645).area / 1_000_000
    area_analysis = visible_gdf.groupby('status')['area_sqkm'].sum()
    area_summary = {
        status: f"{round(area, 2)} sq km" for status, area in area_analysis.items()
    }

    key_insight = f"Analysis of {total_claims} visible claims shows a total area of {round(area_analysis.sum(), 2)} sq km."
    
    return {
        "total_claims": total_claims,
        "status_breakdown": status_breakdown,
        "area_analysis": area_summary,
        "key_insight": key_insight
    }

# --- NEW AI ANALYSIS ENDPOINT ---
@app.post("/analyze-potential-area", summary="Simulate AI Analysis of Historical Data")
def analyze_potential_area(feature: GeoJSONFeature):
    """
    This endpoint simulates the AI 'Time Machine'.
    In a real-world scenario, this is where you would:
    1. Fetch historical satellite imagery (e.g., Landsat) for the feature's geometry.
    2. Use a trained land-use classification model to analyze the imagery timeline.
    3. Identify patterns of historical cultivation, settlement, or forest use.
    4. Calculate an authenticity score based on the evidence found.
    """
    # Simulate processing time
    time.sleep(2) 

    # Simulate AI analysis results
    potential_score = random.randint(55, 98)
    
    analysis_summary = (
        f"Historical satellite data analysis from 1990-2024 indicates consistent "
        f"signs of human activity (likely cultivation or settlement) in approximately "
        f"{round(potential_score * 0.7)}% of the selected area. "
    )
    
    if potential_score > 85:
        analysis_summary += "Evidence strongly suggests long-term habitation, indicating a high potential for a successful FRA claim."
    elif potential_score > 70:
        analysis_summary += "Significant evidence of historical use found, indicating a moderate to high potential for a successful FRA claim."
    else:
        analysis_summary += "Some evidence of land use found, but further ground-truthing may be required."

    return {
        "potential_score": potential_score,
        "analysis_summary": analysis_summary,
        "image_timeline": [ # Placeholder for image URLs
            "https://placehold.co/300x200/556B2F/FFFFFF?text=1995+View",
            "https://placehold.co/300x200/6B8E23/FFFFFF?text=2010+View",
            "https://placehold.co/300x200/808000/FFFFFF?text=2024+View"
        ]
    }

# The Code below is for the decison support system 
"""
@app.post("/dss-prioritize-claims", summary="AI-powered DSS to prioritize in-process claims", response_model=List[PriorityResult])
def dss_prioritize_claims(bounds: MapBounds):
    
    
    # This DSS endpoint analyzes all 'in-process' claims within the current map view,
    # simulates running a real Hugging Face model to analyze land cover, calculates
    #a 'Livelihood Potential Score' based on the AI output, and returns a
    #prioritized list of claims.
    if gdf.empty:
        raise HTTPException(status_code=500, detail="Geospatial data not loaded.")
    if not model or not processor:
        raise HTTPException(status_code=503, detail="AI Model is not available.")

    view_bounds = box(bounds.west, bounds.south, bounds.east, bounds.north)
    in_process_gdf = gdf[(gdf['status'] == 'in-process') & (gdf.intersects(view_bounds))]

    if in_process_gdf.empty:
        return []

    priority_list = []
    
    # Analyze each 'in-process' claim with the AI
    for index, row in in_process_gdf.iterrows():
        try:
            # Step 1: Simulate fetching a satellite image for the claim area
            image_url = f"https://placehold.co/400x400/556B2F/FFFFFF?text=Satellite+View+{row['NAME']}"
            response = requests.get(image_url)
            image = Image.open(BytesIO(response.content)).convert("RGB")
            
            # Step 2: Run the image through the actual Hugging Face model
            inputs = processor(images=image, return_tensors="pt")
            outputs = model(**inputs)
            logits = outputs.logits.cpu()
            
            # Step 3: Simulate analyzing the model's output to get asset percentages
            forest_percent = random.randint(40, 80)
            water_percent = random.randint(5, 20)
            farmland_percent = 100 - forest_percent - water_percent
            
            # Step 4: Calculate a Livelihood Potential Score based on AI analysis
            # This is a simple rule-based model. A higher score is given for a good balance of resources.
            score = int((forest_percent * 0.6) + (water_percent * 0.25) + (farmland_percent * 0.15))

            # Step 5: Generate a dynamic reason based on the analysis
            reason = f"High potential due to {forest_percent}% forest cover and {water_percent}% water resources."
            if score < 75:
                reason = f"Moderate potential with {farmland_percent}% arable land. Further assessment recommended."
            
            priority_list.append(
                PriorityResult(
                    claim_name=row['NAME'],
                    district=row['DISTRICT'],
                    potential_score=score,
                    reason=reason
                )
            )
        except Exception as e:
            # If a single analysis fails, skip it and continue
            print(f"Could not analyze claim {row['NAME']}: {e}")
            continue

    # Sort the list to return the highest-scoring claims first
    priority_list.sort(key=lambda x: x.potential_score, reverse=True)

    return priority_list[:5]

"""