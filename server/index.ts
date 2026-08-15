import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Ensure a default OG image always exists so social crawlers never hit a 404
(function ensureDefaultOgImage() {
  const ogPath = path.join(process.cwd(), "uploads", "og-image.jpg");
  if (!fs.existsSync(ogPath)) {
    try {
      fs.mkdirSync(path.join(process.cwd(), "uploads"), { recursive: true });
      execSync(
        `magick -size 1200x630 gradient:"#1a1f2e-#0d1119" ` +
        `-fill "#a67c52" -draw "rectangle 0,0 7,630" ` +
        `-fill "#a67c52" -draw "rectangle 0,608 1200,614" ` +
        `\\( -background none -fill "#a67c52" -font DejaVu-Sans -pointsize 16 -kerning 8 label:"MUJEEB LAWAL" \\) ` +
        `-gravity NorthWest -geometry +68+220 -composite ` +
        `\\( -background none -fill "#f5f0e8" -font DejaVu-Sans-Bold -pointsize 54 label:"Senior Programme Director" \\) ` +
        `-gravity NorthWest -geometry +68+248 -composite ` +
        `\\( -background none -fill "#c8bfb0" -font DejaVu-Sans -pointsize 24 label:"17+ years · 4 continents · Multi-million-pound programmes" \\) ` +
        `-gravity NorthWest -geometry +68+318 -composite ` +
        `\\( -background none -fill "#a67c52" -font DejaVu-Sans-Bold -pointsize 13 -kerning 5 label:"STRATEGY · TRANSFORMATION · DELIVERY" \\) ` +
        `-gravity NorthWest -geometry +68+370 -composite ` +
        `\\( -background none -fill "#f5f0e8" -font DejaVu-Sans-Bold -pointsize 11 -kerning 3 label:"mujeeb-lawal.replit.app" \\) ` +
        `-gravity SouthWest -geometry +68+26 -composite ` +
        `-quality 92 "${ogPath}"`,
        { stdio: "pipe" }
      );
      log("Generated default og-image.jpg");
    } catch (e) {
      log("Warning: could not generate default og-image.jpg");
    }
  }
})();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS for cross-origin API calls from the immersive 3D site (Vercel / Cloudflare Pages / GitHub Pages)
app.use('/api/', (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin || '';
  if (/\.vercel\.app$|\.pages\.dev$|\.github\.io$|^https?:\/\/localhost/.test(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Vary', 'Origin');
  }
  if (req.method === 'OPTIONS') { res.sendStatus(204); return; }
  next();
});

// /uploads/og-image.jpg is served dynamically from cloud storage (see routes.ts).
// Never let express.static intercept it — always pass through to the dynamic route.
app.use("/uploads", (req, res, next) => {
  if (req.path === "/og-image.jpg") return next();
  return express.static(path.join(process.cwd(), "uploads"), {
    fallthrough: true,
    maxAge: "7d",
    index: false,
  })(req, res, next);
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Add cache headers middleware for static assets in production
  if (app.get("env") !== "development") {
    app.use((req, res, next) => {
      const path = req.path;
      
      // Cache static assets aggressively (JS, CSS, fonts, images with hashes)
      if (path.match(/\.(js|css|woff2?|ttf|eot)$/) && path.includes('-')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
      // Cache images for 1 week
      else if (path.match(/\.(png|jpg|jpeg|gif|webp|avif|svg|ico)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=604800');
      }
      // Don't cache HTML
      else if (path.endsWith('.html') || path === '/') {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
      
      next();
    });
  }

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
