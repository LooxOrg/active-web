import { ActiveServer } from "..";
import colors from "../color";

function serverLog(server: ActiveServer, ...args: any[]) {
  console.log(colors.yellow + `[${server.name}-server]` + colors.reset, ...args);
}

function fileAccessLog(server: ActiveServer, method: string, status: number, file: string) {
  let methodColor = getMethodColor(method);
  let statusColor = getStatusColor(status);
  console.log(colors.yellow + `[${server.name}-web]`, methodColor+method, statusColor+status, colors.reset+file);
}

function apiRequestLog(server: ActiveServer, method: string, status: number, api: string) {
  let methodColor = getMethodColor(method);
  let statusColor = getStatusColor(status);
  console.log(colors.yellow + `[${server.name}-api]`, methodColor+method, statusColor+status, colors.reset+api);
}

function getMethodColor(method: string): string {
  const methodColors: { [key: string]: string } = {
    "GET": colors.green,
    "POST": colors.cyan,
    "PUT": colors.yellow,
    "DELETE": colors.red
  };
  if (method !== undefined && methodColors[method]) {
    return methodColors[method];
  }
  return colors.green; // Default color
}

function getStatusColor(status: number): string {
  const statusColors: { [key: number]: string } = {
    200: colors.green,
    304: colors.magenta,
    404: colors.red
  };
  if (statusColors[status]) {
    return statusColors[status];
  }
  return colors.green;
}

export {
  serverLog,
  fileAccessLog,
  apiRequestLog
}