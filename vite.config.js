import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    build: {
        // The largest chunk is the Firestore SDK, which is lazy-loaded only
        // when a signed-in user reads favourites (see src/lib/firestore.js).
        chunkSizeWarningLimit: 600,
    },
    css: {
        preprocessorOptions: {
            scss: {
                // The style architecture still combines partials with @import
                // inside _abstracts.scss (components themselves use @use).
                // Silence those deprecations until the partials are migrated
                // to modules.
                silenceDeprecations: ["import", "global-builtin"],
            },
        },
    },
    test: {
        environment: "jsdom",
        setupFiles: ["./src/test/setup.js"],
        css: false,
        restoreMocks: true,
    },
})
