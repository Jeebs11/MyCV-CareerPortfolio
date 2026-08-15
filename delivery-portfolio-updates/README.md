# Delivery-Portfolio Updates

These files are the changes needed for `github.com/Jeebs11/Delivery-Portfolio` as part of
the dual-view connection between the immersive site and the classic CV site.

## How to apply

Copy each file to its matching path in your Delivery-Portfolio repo:

| File here | Destination in Delivery-Portfolio |
|---|---|
| `vercel.json` | `vercel.json` (root) |
| `src/components/ui/ImmersiveChatBot.jsx` | `src/components/ui/ImmersiveChatBot.jsx` |
| `src/components/ui/CVDownloadModal.jsx` | `src/components/ui/CVDownloadModal.jsx` |
| `src/components/ui/NavigationUI.jsx.updated` | `src/components/ui/NavigationUI.jsx` (replace existing) |
| `src/App.jsx.updated` | `src/App.jsx` (replace existing) |
| `index.html.updated` | `index.html` (replace existing) |

Then commit and push:

```bash
git add -A
git commit -m "Connect to classic site: chatbot, CV download, GA tracking, view switcher"
git push origin main
```

## What changed

### New files
- **`vercel.json`** — SPA rewrite rule so Vercel serves `index.html` for all paths
- **`src/components/ui/ImmersiveChatBot.jsx`** — floating chatbot that streams responses from
  `https://mujeeb-lawal.replit.app/api/chat` via SSE; 15-message cap; paper/ink styling
- **`src/components/ui/CVDownloadModal.jsx`** — modal form (name + email) that POSTs to
  `https://mujeeb-lawal.replit.app/api/cv/download` and triggers a browser file download

### Modified files
- **`src/components/ui/NavigationUI.jsx`** — removed "Ask Me Anything" external link
  (replaced by ImmersiveChatBot's own button); added "Download CV" button at bottom-left
  stacked above the existing "Classic CV View" link
- **`src/App.jsx`** — imports and mounts `<ImmersiveChatBot />` inside the `{isLoaded && ...}` block
- **`index.html`** — GA4 tag (`G-LC78VQQ1H4`) with linker config for cross-domain
  session stitching with `mujeeb-lawal.replit.app`

## After deploying to Vercel

1. Copy the Vercel URL (e.g. `https://your-name.vercel.app`)
2. In the Replit admin panel → Settings, add:
   - Key: `immersive.url`
   - Value: your Vercel URL
3. The classic site's nav will then show a live **"✦ Immersive View"** link
4. Update the `<link rel="canonical">` in `index.html` to the Vercel URL
