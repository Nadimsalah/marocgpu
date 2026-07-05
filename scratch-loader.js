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
  'app/panel/layout.jsx'
];

filesToUpdate.forEach(filePath => {
  const absolutePath = path.resolve(filePath);
  if (fs.existsSync(absolutePath)) {
    let content = fs.readFileSync(absolutePath, 'utf-8');
    
    // Inject brand-name span next to the marocgpu-logo.svg img tags
    // Let's replace only where the image is inside an anchor or Link that acts as the brand container
    content = content.replace(
      /<img src="\/marocgpu-logo\.svg" alt="MarocGPU" \/>/g,
      '<img src="/marocgpu-logo.svg" alt="MarocGPU" /><span className="brand-name">MarocGPU</span>'
    );
    
    // Handle specific layout styling in panel layout sidebar logo
    content = content.replace(
      /<img src="\/marocgpu-logo\.svg" alt="MarocGPU" style=\{\{\s*height:\s*36,\s*width:\s*36\s*\}\}\s*\/>/g,
      '<img src="/marocgpu-logo.svg" alt="MarocGPU" style={{ height: 36, width: 36 }} /><span className="brand-name">MarocGPU</span>'
    );
    
    fs.writeFileSync(absolutePath, content, 'utf-8');
    console.log(`Injected brand text in: ${filePath}`);
  } else {
    console.warn(`File not found: ${filePath}`);
  }
});
