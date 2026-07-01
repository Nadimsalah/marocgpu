import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  return ids.map((id) => ({ id: String(id) }));
}

export default function ProductDetailPage({ params }) {
  return <ProductDetailClient params={params} />;
}
