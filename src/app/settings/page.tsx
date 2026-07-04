export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      {/* Sidebar - Left Section */}
      <aside className="w-64 border-r border-neutral-800 bg-neutral-950 p-6 flex flex-col gap-6">
        <div className="flex items-center gap-2 font-semibold tracking-wider text-lg uppercase text-gold-400">
          AURACLINIC
        </div>
        <nav className="flex flex-col gap-2">
          {/* Aapke sidebar links yahan aayenge */}
          <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all">
            Appointments
          </button>
          <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white bg-neutral-900 font-medium">
            System Settings
          </button>
        </nav>
      </aside>

      {/* Main Content Area - Right Section */}
      <main className="flex-1 p-8 max-w-4xl mx-auto">
        <div className="border border-neutral-800 rounded-xl bg-neutral-900/50 backdrop-blur-md p-6 shadow-2xl">
          <h2 className="text-xl font-light tracking-wide mb-2 text-white">
            AI Cog System Prompt
          </h2>
          <p className="text-xs text-neutral-500 mb-6">
            Control LLM context guidelines, tone rules, and behavioral structures directly.
          </p>
          
          {/* Prompt Editor Box */}
          <div className="flex flex-col gap-2 border border-neutral-800 rounded-lg overflow-hidden bg-neutral-950">
            <div className="flex justify-between items-center bg-neutral-900 px-4 py-3 border-b border-neutral-800">
              <span className="text-xs uppercase tracking-widest text-neutral-400">
                LLM System Instructions Payload
              </span>
              <span className="text-xs font-mono text-gold-500">
                CONTEXT CORE V2.4
              </span>
            </div>
            <textarea 
              rows={8}
              className="w-full bg-transparent p-4 text-sm text-neutral-300 focus:outline-none resize-none leading-relaxed"
              defaultValue="You are the premium AI Medical Receptionist for our high-end aesthetic center..."
            />
          </div>
        </div>
      </main>
    </div>
  );
}