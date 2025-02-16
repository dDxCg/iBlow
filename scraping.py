import requests
import pandas as pd
from bs4 import BeautifulSoup
import os

if (os.path.exists('./download') == False):
  os.mkdir('./download')

# pageTarget = 'https://kenh14.vn/'
# url = 'https://balloons.online/latex-balloons/latex-color-finder/'
url = 'https://www.avapartydesigns.com/latex-color-guide'
page = requests.get(url)
soup = BeautifulSoup(page.content, 'html.parser')
wrapper = soup.find('body')

images = wrapper.find_all("img")
for image in images:
  imgData = image['src']
  print(imgData)
  if("data:image" not in imgData):
    if(imgData):
      downloadPath = './download/'
      filename = imgData.split('/')[-1]

      response = requests.get(imgData)

      file = open(downloadPath + filename, "wb")
      file.write(response.content)
      file.close()