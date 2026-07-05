import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      process.env[key] = val;
    }
  });
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vdytxvhxpdejdbgqozyk.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_QgoWn84wkrdpXSgSkrbFsg_z--jJ0OV"
);

const pnyProducts = [
  {
    name: "PNY GeForce RTX 4090 24GB XLR8 Gaming Verto RGB",
    category: "Consumer",
    price: 22490,
    stock: 12,
    sold: 4,
    badge: "Flagship GPU",
    inquiry_only: false,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=70",
    description: "The PNY GeForce RTX 4090 Verto is the ultimate GeForce GPU. It brings an enormous leap in performance, efficiency, and AI-powered graphics. Experience ultra-high performance gaming, incredibly detailed virtual worlds, unprecedented productivity, and new ways to create. Powered by the NVIDIA Ada Lovelace architecture and comes with 24 GB of G6X memory."
  },
  {
    name: "PNY GeForce RTX 4080 Super 16GB XLR8 Gaming Verto",
    category: "Consumer",
    price: 13990,
    stock: 15,
    sold: 6,
    badge: "High Performance",
    inquiry_only: false,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=70",
    description: "Supercharged gaming and creating with the NVIDIA GeForce RTX 4080 Super. Built with the ultra-efficient Ada Lovelace architecture, it brings fast ray tracing, AI-accelerated performance with DLSS 3, and new ways to create."
  },
  {
    name: "PNY GeForce RTX 4070 Ti Super 16GB Verto Overclocked",
    category: "Consumer",
    price: 10490,
    stock: 20,
    sold: 9,
    badge: "Best Value Gaming",
    inquiry_only: false,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=70",
    description: "Equip yourself for stellar gaming and creating with the NVIDIA GeForce RTX 4070 Ti Super. It is built with the ultra-efficient Ada Lovelace architecture and 16GB of super-fast GDDR6X memory."
  },
  {
    name: "NVIDIA RTX 6000 Ada Generation 48GB",
    category: "Professional",
    price: 94990,
    stock: 5,
    sold: 2,
    badge: "AI & Rendering",
    inquiry_only: true,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=70",
    description: "The NVIDIA RTX 6000 Ada Generation is the ultimate professional GPU for desktop workstations. It delivers the features, hardware capabilities, and capacity needed to meet the challenges of modern AI, graphics, and compute workloads."
  },
  {
    name: "NVIDIA RTX 4000 Ada Generation 20GB",
    category: "Professional",
    price: 18990,
    stock: 8,
    sold: 3,
    badge: "Workstation GPU",
    inquiry_only: false,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=70",
    description: "The NVIDIA RTX 4000 Ada Generation is the most powerful single-slot GPU for professionals, providing real-time ray tracing, AI-accelerated compute, and high-performance graphics on desktop workstations."
  },
  {
    name: "PNY NVIDIA RTX A6000 48GB GDDR6",
    category: "Professional",
    price: 62490,
    stock: 4,
    sold: 1,
    badge: "Quadro Legacy",
    inquiry_only: true,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=70",
    description: "Unlock the next generation of revolutionary designs, scientific breakthroughs, and immersive entertainment with the NVIDIA RTX A6000, the world's most powerful visual computing GPU for desktop workstations."
  },
  {
    name: "NVIDIA H100 Tensor Core GPU 80GB HBM3",
    category: "Data Center Solutions",
    price: 420000,
    stock: 2,
    sold: 0,
    badge: "LLM & GenAI",
    inquiry_only: true,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=70",
    description: "The NVIDIA H100 Tensor Core GPU delivers unprecedented performance, scalability, and security for every data center. It accelerates LLMs, deep learning, and HPC workloads by up to 30x compared to the previous generation."
  },
  {
    name: "NVIDIA A100 Tensor Core GPU 80GB CoWoS",
    category: "Data Center Solutions",
    price: 195000,
    stock: 3,
    sold: 1,
    badge: "Data Center GPU",
    inquiry_only: true,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=70",
    description: "The NVIDIA A100 Tensor Core GPU accelerates AI, data analytics, and HPC. A100 can efficiently scale to thousands of GPUs or be partitioned into seven isolated GPU instances using Multi-Instance GPU (MIG)."
  },
  {
    name: "NVIDIA L40S Tensor Core GPU 48GB",
    category: "Data Center Solutions",
    price: 165000,
    stock: 4,
    sold: 1,
    badge: "AI & Graphics",
    inquiry_only: true,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=70",
    description: "The NVIDIA L40S Tensor Core GPU is the most powerful universal GPU for the enterprise data center, delivering end-to-end acceleration for next-generation generative AI, graphics, and video workloads."
  },
  {
    name: "PNY XLR8 Gaming DDR5 6000MHz 64GB Kit (2x32GB)",
    category: "Accessories",
    price: 3190,
    stock: 40,
    sold: 15,
    badge: "DDR5 Memory",
    inquiry_only: false,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=70",
    description: "PNY's premium XLR8 Gaming DDR5 memory features high-speed performance, low latency, and XLR8 RGB design. Engineered to handle extreme overclocking and high-performance gaming rig requirements."
  },
  {
    name: "PNY CS3140 2TB PCIe Gen4 x4 M.2 NVMe SSD",
    category: "Accessories",
    price: 2490,
    stock: 50,
    sold: 25,
    badge: "High-Speed SSD",
    inquiry_only: false,
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=600&q=70",
    description: "The CS3140 M.2 NVMe Gen4 x4 Solid State Drive is designed to be the highest performance SSD on the market. It delivers extreme performance of up to 7,500 MB/s sequential read speed."
  }
];

async function run() {
  console.log("Starting database rebuild with optimized images...");
  try {
    console.log("Clearing public.products table...");
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .filter('id', 'not.is', null);
      
    if (deleteError) {
      throw deleteError;
    }
    console.log("Table cleared.");

    console.log(`Inserting ${pnyProducts.length} optimized PNY NVIDIA products...`);
    const { data, error: insertError } = await supabase
      .from('products')
      .insert(pnyProducts)
      .select();
      
    if (insertError) {
      throw insertError;
    }
    console.log("Rebuild complete! Cache must be cleared on the client side.");
  } catch (err) {
    console.error("Critical error building products database:", err);
  }
}

run();
