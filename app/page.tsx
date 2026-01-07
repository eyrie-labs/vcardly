import { VCardGenerator } from "@/components/vcard-generator"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">vCardly</h2>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <VCardGenerator />
      </main>

      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-muted-foreground">
              Bug? Feature idea? DM me{" "}
              <a
                href="https://x.com/timgriffin_dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline underline-offset-4"
              >
                @timgriffin_dev
              </a>
            </p>
            <a
              href="https://buymeacoffee.com/timgriffin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              Buy me a coffee
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
