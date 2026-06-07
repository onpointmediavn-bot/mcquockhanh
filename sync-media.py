import os
import re
import json

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
images_data_file = os.path.join(ROOT_DIR, "assets", "js", "images_data.js")
images_dir = os.path.join(ROOT_DIR, "assets", "images")

folder_metadata = {}
existing_showreel_url = "https://www.youtube.com/embed/coYw-Nirh_U?autoplay=1&mute=0"

# 1. Parse existing data to preserve customizations
if os.path.exists(images_data_file):
    try:
        with open(images_data_file, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Parse showreel URL
        showreel_match = re.search(r'SHOWREEL_URL\s*=\s*"([^"]+)"', content)
        if showreel_match:
            existing_showreel_url = showreel_match.group(1)
        
        # Parse folderName, displayName, category
        pattern = r'"folderName"\s*:\s*"([^"]+)"\s*,\s*"displayName"\s*:\s*"([^"]+)"\s*,\s*"category"\s*:\s*"([^"]+)"'
        for match in re.finditer(pattern, content):
            f_name, d_name, cat = match.groups()
            folder_metadata[f_name] = {
                "displayName": d_name,
                "category": cat
            }
        print(f"Parsed {len(folder_metadata)} existing folder configs from images_data.js")
    except Exception as e:
        print(f"Could not parse existing images_data.js (using defaults): {e}")

# Helper to check if file is media
allowed_exts = {'.jpg', '.jpeg', '.png', '.webp', '.svg', '.mp4', '.webm', '.mov'}
def is_media_file(filename):
    _, ext = os.path.splitext(filename)
    return ext.lower() in allowed_exts

def format_folder_title(folder_name):
    # e.g. "Hoi_nghi_apec" -> "Hoi Nghi Apec"
    formatted = re.sub(r'[_-]+', ' ', folder_name).strip()
    return formatted.title()

# 2. Scan folders
new_images_data = []
new_portrait_images = []
new_partner_logos = []

if os.path.exists(images_dir):
    for item_name in os.listdir(images_dir):
        item_path = os.path.join(images_dir, item_name)
        
        if os.path.isdir(item_path):
            if item_name == "chan_dung":
                files = [f for f in os.listdir(item_path) if is_media_file(f)]
                files.sort()
                for f in files:
                    new_portrait_images.append(f"assets/images/chan_dung/{f}")
            elif item_name == "don_vi_tung_cong_tac":
                files = [f for f in os.listdir(item_path) if is_media_file(f)]
                files.sort()
                for f in files:
                    new_partner_logos.append(f"assets/images/don_vi_tung_cong_tac/{f}")
            else:
                files = [f for f in os.listdir(item_path) if is_media_file(f)]
                files.sort()
                if files:
                    relative_paths = [f"assets/images/{item_name}/{f}" for f in files]
                    
                    display_name = format_folder_title(item_name)
                    category = "others"
                    
                    if item_name in folder_metadata:
                        display_name = folder_metadata[item_name]["displayName"]
                        category = folder_metadata[item_name]["category"]
                    else:
                        lower_name = item_name.lower()
                        if any(k in lower_name for k in ['gala', 'corporate', 'kickoff', 'summit']):
                            category = "corporate"
                        elif any(k in lower_name for k in ['festival', 'van_hoa', 'music', 'nhac']):
                            category = "cultural"
                        elif any(k in lower_name for k in ['sports', 'basketball', 'bong_ro', 'golf']):
                            category = "sports"
                        elif any(k in lower_name for k in ['wedding', 'cuoi']):
                            category = "weddings"
                            
                    new_images_data.append({
                        "folderName": item_name,
                        "displayName": display_name,
                        "category": category,
                        "images": relative_paths
                    })

# 3. Write images_data.js
output_content = f"""// Auto-generated file containing image resources from local directory
const SHOWREEL_URL = "{existing_showreel_url}";

const IMAGES_DATA = {json.dumps(new_images_data, indent=2, ensure_ascii=False)};

const PORTRAIT_IMAGES = {json.dumps(new_portrait_images, indent=2, ensure_ascii=False)};

const PARTNER_LOGOS = {json.dumps(new_partner_logos, indent=2, ensure_ascii=False)};
"""

# Ensure parent directory exists before writing
os.makedirs(os.path.dirname(images_data_file), exist_ok=True)

with open(images_data_file, "w", encoding="utf-8") as f:
    f.write(output_content)

print(f"Successfully synchronized media! Wrote {len(new_images_data)} albums, {len(new_portrait_images)} portraits, and {len(new_partner_logos)} logos to assets/js/images_data.js")
