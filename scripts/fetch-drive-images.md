# Image pipeline: Google Drive -> WebP -> /public

Every DOTDAY page uses **real images from the brand Google Drive**, optimized to
WebP and committed into the repo. This doc is the repeatable process. The folder
+ file IDs live in `lib/content/drive-images.ts`.

## The convention

```
public/blog/<slug>/hero.webp      # post hero (5:4)
public/blog/<slug>/og.webp        # 1200x630 share image
public/blog/<slug>/pin.webp       # 1000x1500 Pinterest (2:3)
public/blog/<slug>/<ref>.webp     # any in-body image ref from the JSON
public/brand/products/<name>.webp # product card images (shield/xbar/terra)
```

The post JSON references images by **ref** (e.g. `"hero"`, `"og"`), and
`lib/blog/images.ts` resolves `ref -> /blog/<slug>/<ref>.webp` if the file
exists (else a branded placeholder shows, so the build never breaks).

## How Claude sources images (in-session)

When Claude builds a page it has the Google Drive connector. The loop is:

1. **Pick the folder** for the product (`PRODUCT_FOLDER` in
   `lib/content/drive-images.ts`): SHIELD -> shield folders, XBAR -> xbar
   folders, TERRA -> terra folder, multi/none -> parent brand folder.
2. **List candidates**: `Google Drive: search_files`
   `query: parentId = '<FOLDER_ID>' and mimeType contains 'image/'`.
3. **Choose** the image that fits the section (raw lifestyle photos for
   in-body/how-to shots; branded graphics for hero/product cards).
4. **Download** bytes: `Google Drive: download_file_content` with the file ID
   (returns base64).
5. **Optimize to WebP** and place under `/public/...` (sizing below).
6. **Reference** the WebP in the JSON by its ref.

## Optimize step (Pillow)

```python
import json, base64, io
from PIL import Image

# `downloaded` = the JSON returned by download_file_content
inner = json.loads(downloaded[0]["text"])      # {id,title,mimeType,content}
raw = base64.b64decode(inner["content"])
img = Image.open(io.BytesIO(raw)).convert("RGB")

# Target sizes:
#   hero / product card : max 1200px long edge
#   og                  : 1200x630 (cover-crop)
#   pinterest pin       : 1000x1500 (cover-crop)
#   in-body             : max 1200px long edge
img.thumbnail((1200, 1200), Image.LANCZOS)      # for hero/card/in-body
img.save("public/blog/<slug>/hero.webp", "WEBP", quality=82, method=6)
```

For exact OG/Pinterest ratios, cover-crop to the target box before saving:

```python
def cover(img, w, h):
    src_r, dst_r = img.width/img.height, w/h
    if src_r > dst_r:                 # too wide -> crop sides
        nw = int(img.height*dst_r); x=(img.width-nw)//2
        img = img.crop((x,0,x+nw,img.height))
    else:                             # too tall -> crop top/bottom
        nh = int(img.width/dst_r); y=(img.height-nh)//2
        img = img.crop((0,y,img.width,y+nh))
    return img.resize((w,h), Image.LANCZOS)

cover(img, 1200, 630).save("public/blog/<slug>/og.webp", "WEBP", quality=82, method=6)
```

Quality 82 + method 6 is the sweet spot (visually lossless, small files). Keep
each image under ~300 KB where possible.

## Alt text + captions

Every image needs descriptive alt text in the JSON (the focus keyword in at
least one). The SEO validator enforces this. Use the real subject of the photo,
not "image1".

## Currently shipped real images

- `public/brand/products/shield.webp` <- Drive `Shield_06.png`
- `public/brand/products/xbar.webp`   <- Drive `XBar_06.png`
- `public/brand/products/terra.webp`  <- Drive `Terra_05.jpg`
- `public/brand/logo-neon.png`, `public/brand/dd-circle.png` (brand marks)
- `public/brand/fonts/*.woff2` (Wix Madefor Text, self-hosted)

## Doing it yourself (outside a Claude session)

If you want to pull images without Claude, use `rclone` or the `gdrive` CLI
authenticated to the DOTDAY Google account, download from the folder IDs in
`lib/content/drive-images.ts`, then run the Pillow snippet above. There is no
API key in the repo - auth stays in your local tool.
