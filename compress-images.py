import os
import subprocess
import concurrent.futures

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
IMAGES_DIR = os.path.join(ROOT_DIR, "assets", "images")

def compress_image(filepath):
    try:
        orig_size = os.path.getsize(filepath)
        
        # sips: native macOS image processing tool
        cmd = ["sips", "--resampleHeightWidthMax", "1600", "-s", "formatOptions", "80", filepath]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        new_size = os.path.getsize(filepath)
        saved = orig_size - new_size
        return filepath, orig_size, new_size, saved
    except Exception as e:
        return filepath, 0, 0, 0

def main():
    if not os.path.exists(IMAGES_DIR):
        print(f"Directory not found: {IMAGES_DIR}")
        return

    # Gather all JPEG images
    image_paths = []
    for root, dirs, files in os.walk(IMAGES_DIR):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in [".jpg", ".jpeg"]:
                image_paths.append(os.path.join(root, file))

    total_images = len(image_paths)
    print(f"Found {total_images} JPEG images to compress.")
    if total_images == 0:
        return

    print("Compressing images in parallel using native macOS sips utility (quality: 80%, max dimension: 1600px)...")
    
    total_orig = 0
    total_new = 0
    total_saved = 0
    processed_count = 0

    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
        results = list(executor.map(compress_image, image_paths))

    for filepath, orig, new, saved in results:
        if orig > 0:
            total_orig += orig
            total_new += new
            total_saved += saved
            processed_count += 1

    to_mb = lambda bytes_size: bytes_size / (1024 * 1024)
    
    print("\n--- COMPRESSION SUMMARY ---")
    print(f"Images Processed: {processed_count} / {total_images}")
    print(f"Original Size: {to_mb(total_orig):.2f} MB")
    print(f"Compressed Size: {to_mb(total_new):.2f} MB")
    print(f"Total Space Saved: {to_mb(total_saved):.2f} MB ({(total_saved / total_orig * 100) if total_orig > 0 else 0:.1f}% reduction)")

if __name__ == "__main__":
    main()
