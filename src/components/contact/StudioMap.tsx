export function StudioMap() {
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <iframe
        title="Studio location — Antwerp"
        src="https://www.openstreetmap.org/export/embed.html?bbox=4.395%2C51.214%2C4.420%2C51.226&layer=mapnik&marker=51.220%2C4.4075"
        className="h-72 w-full grayscale-[0.6] contrast-110 [filter:invert(0.92)_hue-rotate(180deg)_grayscale(0.4)]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
