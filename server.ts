import express from "express";
import { createServer as createViteServer } from "vite";
import { WebSocketServer, WebSocket } from "ws";
import http from "http";

// Define message types
interface ChatMessage {
  type: 'message';
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: number;
}

interface SystemMessage {
  type: 'system';
  id: string;
  text: string;
  timestamp: number;
}

type Message = ChatMessage | SystemMessage;

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  // Create HTTP server explicitly to attach WebSocket server
  const server = http.createServer(app);

  // WebSocket Server
  const wss = new WebSocketServer({ server });

  // Store connected clients
  const clients = new Set<WebSocket>();

  wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('Client connected. Total clients:', clients.size);

    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString());
        
        // Broadcast to all clients
        const broadcastData = JSON.stringify(message);
        clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(broadcastData);
          }
        });
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });

    ws.on('close', () => {
      clients.delete(ws);
      console.log('Client disconnected. Total clients:', clients.size);
    });
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const path = await import("path");
    const distPath = path.resolve("dist");
    app.use(express.static(distPath));
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
