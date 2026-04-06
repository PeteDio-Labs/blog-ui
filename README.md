# Blog UI

Frontend for [blog.petedillo.com](https://blog.petedillo.com). Built with React + Vite + TypeScript. Served via Nginx in Kubernetes.

## Quick Start

```bash
bun install
bun dev      # http://localhost:5173
```

## Scripts

```bash
bun dev          # dev server with HMR
bun build        # production build → dist/
bun preview      # preview production build
bun run lint
bun run typecheck
```

## Stack

- **Runtime:** Bun
- **Framework:** React 18, TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS
- **HTTP:** Native fetch

## Deployment

Pushed to `docker.toastedbytes.com/blog-ui` via GitHub Actions on push to `main`. Production build served by Nginx container. ArgoCD Image Updater handles digest pinning. K8s manifests live in `infrastructure/kubernetes/blog`. Deployed in `blog-dev` (dev) and `blog-prod` (prod) namespaces.
