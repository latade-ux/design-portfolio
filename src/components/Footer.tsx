"use client";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Latade. Designed with intent.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="mailto:hello@latade.design"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/latade"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            CV
          </a>
        </div>
      </div>
    </footer>
  );
}
