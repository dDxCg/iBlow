import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urljoin
import time

def scrape_ava_party_images():
    # URL of the website
    url = 'https://www.avapartydesigns.com/latex-color-guide'
    
    # Create directory for images
    if not os.path.exists('ava_party_images'):
        os.makedirs('ava_party_images')
    
    # Headers to mimic a browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
    }
    
    try:
        # Get the webpage
        print(f"Accessing {url}")
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        # Parse HTML
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all image elements
        images = []
        
        # Look for images in different ways
        images.extend(soup.find_all('img'))  # Regular img tags
        images.extend(soup.find_all('source'))  # Source tags within picture elements
        
        print(f"Found {len(images)} potential images")
        
        # Download images
        downloaded_count = 0
        for i, img in enumerate(images, 1):
            # Try different attributes where image URL might be stored
            img_url = None
            for attr in ['src', 'data-src', 'srcset']:
                img_url = img.get(attr)
                if img_url:
                    break
            
            if img_url:
                # Handle srcset by taking the first URL
                if ',' in img_url:
                    img_url = img_url.split(',')[0].split()[0]
                
                # Make URL absolute
                if not img_url.startswith(('http://', 'https://')):
                    img_url = urljoin(url, img_url)
                
                try:
                    # Skip small icons and logos
                    if 'icon' in img_url.lower() or 'logo' in img_url.lower():
                        continue
                        
                    print(f"Downloading image from: {img_url}")
                    
                    # Download image
                    img_response = requests.get(img_url, headers=headers)
                    img_response.raise_for_status()
                    
                    # Generate filename
                    file_extension = img_url.split('.')[-1].split('?')[0]
                    if file_extension.lower() not in ['jpg', 'jpeg', 'png', 'gif', 'webp']:
                        file_extension = 'jpg'
                    
                    filename = f'balloon_color_{i}.{file_extension}'
                    filepath = os.path.join('ava_party_images', filename)
                    
                    # Save image
                    with open(filepath, 'wb') as f:
                        f.write(img_response.content)
                    
                    print(f"Saved as: {filename}")
                    downloaded_count += 1
                    
                    # Polite delay between downloads
                    time.sleep(1)
                    
                except Exception as e:
                    print(f"Error downloading {img_url}: {str(e)}")
        
        print(f"\nScraping completed!")
        print(f"Successfully downloaded {downloaded_count} images to 'ava_party_images' directory")
        
    except Exception as e:
        print(f"Error scraping website: {str(e)}")

if __name__ == "__main__":
    scrape_ava_party_images()