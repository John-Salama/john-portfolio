export default function StaticBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 via-blue-50/10 to-emerald-50/20 dark:from-purple-900/10 dark:via-blue-900/5 dark:to-emerald-900/10"></div>
    </div>
  );
}
