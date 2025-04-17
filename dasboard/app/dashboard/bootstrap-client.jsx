"use client"

import { useEffect } from "react"

export function BootstrapClient() {
  useEffect(() => {
    // Import Bootstrap JS only on the client side
    import("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, [])

  return null
}
