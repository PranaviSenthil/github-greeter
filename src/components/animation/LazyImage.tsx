import { useState, type ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  /** optional override for outer wrapper class */
  wrapperClassName?: string;
};

/**
 * Progressive image: native lazy + blur-up reveal once decoded.
 * Falls back gracefully without JS (img is still rendered).
 */
export function LazyImage({
  className,
  wrapperClassName,
  alt,
  loading = "lazy",
  decoding = "async",
  onLoad,
  ...rest
}: Props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden ${wrapperClassName ?? ""}`}>
      <div
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-br from-warm-white/5 to-warm-white/0 transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        {...rest}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={`${className ?? ""} transition-[opacity,filter,transform] duration-[1200ms] ease-out ${
          loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-[1.04]"
        }`}
      />
    </div>
  );
}
