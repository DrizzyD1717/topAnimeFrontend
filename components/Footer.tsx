export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-neutral-500">
          © {new Date().getFullYear()} Anime Showcase. Built with Next.js &
          Express.
        </p>

        <div className="flex space-x-6">
          <a
            href="https://github.com/DrizzyD1717"
            className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://oluwadarimisire.vercel.app/"
            className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            Portfolio
          </a>
        </div>
      </div>
    </footer>
  );
}
