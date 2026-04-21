/**
 * Feature 1: WhatsApp floating button
 * Fixed bottom-right, links to company WhatsApp
 */
export function WhatsAppButton() {
  const phone = '251911234038';
  const message = encodeURIComponent('Hello BASE SECURITY, I would like to inquire about your services.');
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-200 group"
      style={{ animation: 'pulse-ring 2.5s ease-in-out infinite' }}
    >
      {/* Tooltip label */}
      <span className="hidden group-hover:flex items-center pl-4 pr-2 py-3 text-sm font-semibold whitespace-nowrap">
        Chat with us
      </span>
      {/* WhatsApp icon */}
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] flex-shrink-0">
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.677 4.797 1.854 6.785L2 30l7.43-1.822A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.83-1.594l-.418-.248-4.41 1.082 1.115-4.3-.272-.44A11.46 11.46 0 014.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.61c-.345-.172-2.04-1.006-2.356-1.12-.316-.115-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.745.086-.345-.172-1.456-.537-2.773-1.71-1.025-.913-1.717-2.04-1.918-2.385-.2-.345-.021-.531.15-.703.155-.155.345-.4.517-.6.172-.2.23-.345.345-.575.115-.23.057-.43-.029-.603-.086-.172-.776-1.87-1.063-2.56-.28-.672-.564-.58-.776-.59l-.66-.011c-.23 0-.603.086-.918.43-.316.345-1.205 1.178-1.205 2.872s1.234 3.33 1.406 3.56c.172.23 2.428 3.71 5.882 5.203.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.66-.099 2.04-.834 2.327-1.638.287-.804.287-1.493.2-1.638-.086-.144-.316-.23-.66-.4z" />
        </svg>
      </div>
    </a>
  );
}
