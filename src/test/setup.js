import "@testing-library/jest-dom/vitest"
import { afterEach, vi } from "vitest"
import { cleanup } from "@testing-library/react"

// Tests never talk to Firebase: auth reports "signed out" and the SDK
// helpers are no-ops that individual tests can inspect.
vi.mock("../lib/firebase", () => ({
    app: {},
    auth: {},
    signInWithGoogle: vi.fn(() => Promise.resolve()),
    signOutUser: vi.fn(() => Promise.resolve()),
    isPopupClosed: () => false,
}))

vi.mock("firebase/auth", () => ({
    onAuthStateChanged: (auth, callback) => {
        callback(null)
        return () => {}
    },
}))

afterEach(() => {
    cleanup()
    localStorage.clear()
})
