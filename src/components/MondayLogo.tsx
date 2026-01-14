export function MondayLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="140" r="24" fill="#FF3D57"/>
      <circle cx="100" cy="140" r="24" fill="#FFCB00"/>
      <circle cx="160" cy="140" r="24" fill="#00CA72"/>
      <rect x="28" y="60" width="24" height="80" rx="12" fill="#FF3D57"/>
      <rect x="88" y="80" width="24" height="60" rx="12" fill="#FFCB00"/>
      <rect x="148" y="40" width="24" height="100" rx="12" fill="#00CA72"/>
    </svg>
  )
}
