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
  'app/panel/layout.jsx',
  'app/context/SiteContext.jsx'
];

filesToUpdate.forEach(filePath => {
  const absolutePath = path.resolve(filePath);
  if (fs.existsSync(absolutePath)) {
    let content = fs.readFileSync(absolutePath, 'utf-8');
    
    // Replace SVG logo with WebP logo
    content = content.split('/marocgpu-logo.svg').join('/marocgpu-logo-transparent.webp');
    
    // Remove the injected brand-name span
    content = content.split('<span className="brand-name">MarocGPU</span>').join('');
    
    // Restore layout.jsx styling for wide logo
    content = content.replace('style={{ height: 36, width: 36 }}', 'style={{ height: 36, width: "auto" }}');
    
    fs.writeFileSync(absolutePath, content, 'utf-8');
    console.log(`Updated logo image in: ${filePath}`);
  } else {
    console.warn(`File not found: ${filePath}`);
  }
});
