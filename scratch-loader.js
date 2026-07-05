import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'app/page.jsx',
  'app/products/page.jsx',
  'app/products/[id]/ProductDetailClient.jsx',
  'app/cart/page.jsx',
  'app/checkout/page.jsx',
  'app/components/CartDrawer.jsx',
  'app/components/SearchModal.jsx',
  'app/data-center-solutions/DataCenterContent.jsx',
  'app/support/SupportContent.jsx',
  'app/panel/store/page.jsx'
];

filesToUpdate.forEach(filePath => {
  const absolutePath = path.resolve(filePath);
  if (fs.existsSync(absolutePath)) {
    let content = fs.readFileSync(absolutePath, 'utf-8');
    
    // Replace URL paths with trailing slashes before queries and quotes
    content = content.split('href="/products"').join('href="/products/"');
    content = content.split('href="/products?').join('href="/products/?');
    content = content.split('href={`/products?').join('href={`/products/?');
    content = content.split('`/products?category=').join('`/products/?category=');
    content = content.split('"/products"').join('"/products/"');
    
    // In page.jsx, convert the mega menu and mobile menu <a> tags to <Link> components
    if (filePath === 'app/page.jsx') {
      // 1. Mobile menu sub-cards
      content = content.replace(
        /href=\{\`\/products\/\?category=\$\{encodeURIComponent\(item\)\}\`\}\s+onClick=\{onClose\}\s+className="mobile-sub-card"/g,
        'Link href={`/products/?category=${encodeURIComponent(item)}`} onClick={onClose} className="mobile-sub-card"'
      );
      content = content.replace(/<\/a>/g, (match, offset) => {
        // Let's replace the closing tag of mobile-sub-card with </Link>
        // We'll do a simple string replace for the specific sections or do it generally
        return match;
      });
    }

    fs.writeFileSync(absolutePath, content, 'utf-8');
    console.log(`Updated products links in: ${filePath}`);
  } else {
    console.warn(`File not found: ${filePath}`);
  }
});
