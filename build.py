import os
import sys
import time

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

CONFIGS = [
    {
        "srcDir": os.path.join(ROOT_DIR, "sections"),
        "outputFile": os.path.join(ROOT_DIR, "index.html"),
        "ext": ".html"
    },
    {
        "srcDir": os.path.join(ROOT_DIR, "assets", "css"),
        "outputFile": os.path.join(ROOT_DIR, "assets", "css", "style-v2.css"),
        "ext": ".css"
    },
    {
        "srcDir": os.path.join(ROOT_DIR, "assets", "js"),
        "outputFile": os.path.join(ROOT_DIR, "assets", "js", "main-v2.js"),
        "ext": ".js"
    }
]

def build_config(config):
    src_dir = config["srcDir"]
    output_file = config["outputFile"]
    ext = config["ext"]

    if not os.path.exists(src_dir):
        os.makedirs(src_dir, exist_ok=True)
        print(f"Created directory: {src_dir}")
        return

    try:
        files = [f for f in os.listdir(src_dir) if f.endswith(ext) and os.path.isfile(os.path.join(src_dir, f)) and os.path.join(src_dir, f) != output_file]
        files.sort()

        if not files:
            print(f"No files found in {src_dir} matching {ext}")
            return

        combined_content = ""
        for file in files:
            file_path = os.path.join(src_dir, file)
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            if ext == ".html":
                combined_content += f"<!-- --- START OF FILE: {file} --- -->\n"
                combined_content += content + f"\n<!-- --- END OF FILE: {file} --- -->\n\n"
            else:
                combined_content += f"/* --- START OF FILE: {file} --- */\n"
                combined_content += content + f"\n/* --- END OF FILE: {file} --- */\n\n"

        with open(output_file, "w", encoding="utf-8") as f:
            f.write(combined_content)
        print(f"Successfully built: {output_file} ({len(files)} files compiled)")

        if ext == ".html":
            # Also compile contact/index.html using direct contact template
            contact_dir = os.path.join(os.path.dirname(output_file), "contact")
            os.makedirs(contact_dir, exist_ok=True)
            contact_output = os.path.join(contact_dir, "index.html")
            template_path = os.path.join(src_dir, "06-21-contact-direct.template")
            if os.path.exists(template_path):
                with open(template_path, "r", encoding="utf-8") as tf:
                    direct_contact_content = tf.read()
                
                combined_contact = ""
                for file in files:
                    if file == "06-21-contact.html":
                        content = direct_contact_content
                    else:
                        file_path = os.path.join(src_dir, file)
                        with open(file_path, "r", encoding="utf-8") as f:
                            content = f.read()
                    combined_contact += f"<!-- --- START OF FILE: {file} --- -->\n"
                    combined_contact += content + f"\n<!-- --- END OF FILE: {file} --- -->\n\n"
                
                with open(contact_output, "w", encoding="utf-8") as f:
                    f.write(combined_contact)
                print(f"Successfully built contact page: {contact_output}")
    except Exception as e:
        print(f"Build failed for {output_file}: {e}")

def run_build():
    print("--- STARTING CINEMATIC PORTFOLIO BUILD ---")
    for config in CONFIGS:
        build_config(config)
    print("--- BUILD COMPLETED SUCCESSFULLY ---\n")

if __name__ == "__main__":
    is_watch = "--watch" in sys.argv or "-w" in sys.argv
    run_build()

    if is_watch:
        print("Watching directories for changes (polling every 1 second)...")
        last_modified = {}
        
        while True:
            try:
                for config in CONFIGS:
                    src_dir = config["srcDir"]
                    ext = config["ext"]
                    
                    if not os.path.exists(src_dir):
                        continue
                        
                    files = [f for f in os.listdir(src_dir) if f.endswith(ext)]
                    rebuild_needed = False
                    
                    for file in files:
                        file_path = os.path.join(src_dir, file)
                        mtime = os.path.getmtime(file_path)
                        
                        if file_path not in last_modified:
                            last_modified[file_path] = mtime
                        elif last_modified[file_path] != mtime:
                            last_modified[file_path] = mtime
                            print(f"Change detected in {file}. Rebuilding...")
                            rebuild_needed = True
                            
                    if rebuild_needed:
                        build_config(config)
                
                time.sleep(1)
            except KeyboardInterrupt:
                print("\nStopping watcher...")
                break
