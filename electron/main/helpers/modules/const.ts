import path from "node:path"
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const APP_ROOT = path.join(__dirname, '../../')
export const DIST_PATH = path.join(APP_ROOT, "./dist-electron")

export const RENDERER_DIST = path.join(APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

export const VITE_PUBLIC = VITE_DEV_SERVER_URL
    ? path.join(APP_ROOT, 'public')
    : RENDERER_DIST

export const APP_DATA = path.join(APP_ROOT, "data");
