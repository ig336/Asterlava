import "server-only";
import net from "net";

export async function canReachDatabase() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return false;

  try {
    const url = new URL(databaseUrl);
    const port = Number(url.port || 5432);

    return await new Promise<boolean>((resolve) => {
      const socket = net.createConnection({ host: url.hostname, port, timeout: 400 });

      socket.once("connect", () => {
        socket.destroy();
        resolve(true);
      });
      socket.once("timeout", () => {
        socket.destroy();
        resolve(false);
      });
      socket.once("error", () => resolve(false));
    });
  } catch {
    return false;
  }
}
