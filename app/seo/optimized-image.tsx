/* eslint-disable @next/next/no-img-element -- responsive WebP picture sources are controlled by the SEO image registry */
import { getImageSeoRecord } from "./images";

type OptimizedImageProps = {
  source: string;
  alt?: string;
  className?: string;
  sizes?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  width?: number;
  height?: number;
};

export function OptimizedImage({ source, alt, className, sizes = "100vw", loading = "lazy", fetchPriority, width, height }: OptimizedImageProps) {
  const record = getImageSeoRecord(source);
  const resolvedAlt = alt || record?.alt || "";
  const resolvedWidth = record?.width ?? width;
  const resolvedHeight = record?.height ?? height;

  if (!record) {
    return <img className={className} src={source} alt={resolvedAlt} width={resolvedWidth} height={resolvedHeight} loading={loading} fetchPriority={fetchPriority} />;
  }

  return <>
    <picture data-image-authenticity={record.authenticity}>
      <source type="image/webp" srcSet={record.variants.map((variant) => `${variant.src} ${variant.width}w`).join(", ")} sizes={sizes} />
      <img className={className} src={record.source} alt={resolvedAlt} title={record.title} width={resolvedWidth} height={resolvedHeight} loading={loading} fetchPriority={fetchPriority} data-caption={record.caption} data-description={record.description} />
    </picture>
  </>;
}
