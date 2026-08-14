export default function Popup() {
  return (
    <main aria-labelledby="water-counter-title" className="min-w-72 p-4">
      <h1 id="water-counter-title" className="text-lg font-semibold">
        Water Counter
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The extension will show estimated water use for supported AI chats.
      </p>
    </main>
  );
}
