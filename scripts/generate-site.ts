#!/usr/bin/env npx tsx

/**
 * Generate Portfolio Website from YAML
 * 
 * Usage: npx tsx scripts/generate-site.ts
 * 
 * Generates:
 * - public/index.html (portfolio site)
 * - public/products.json (API endpoint)
 * - public/status.json (health status)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';

const ROOT = path.join(__dirname, '..');
const OUTPUT = path.join(ROOT, 'public');

interface Domain {
  domain: string;
  role: string;
  primary_repo: string;
  status: string;
  category: string;
  links?: { name: string; url: string }[];
}

interface Product {
  name: string;
  domain: string;
  tagline: string;
  status: string;
  pricing: { model: string; free_tier: string; paid_tier: string };
  stack: { frontend: string; backend: string; database: string; hosting: string };
  moat: string;
  links: { marketing?: string; app?: string; docs?: string };
}

// Load YAML files
function loadYaml<T>(filename: string): T {
  const filepath = path.join(ROOT, 'portfolio', filename);
  const content = fs.readFileSync(filepath, 'utf-8');
  return yaml.parse(content) as T;
}

// Status badge colors
const statusColors: Record<string, { bg: string; text: string }> = {
  '🔴 Idea': { bg: '#FEE2E2', text: '#991B1B' },
  '🟡 Build': { bg: '#FEF3C7', text: '#92400E' },
  '🟢 Beta': { bg: '#D1FAE5', text: '#065F46' },
  '🔵 Prod': { bg: '#DBEAFE', text: '#1E40AF' },
};

// Generate HTML
function generateHTML(domains: { domains: Domain[] }, products: { products: Product[] }): string {
  const domainRows = domains.domains.map(d => `
    <tr class="border-b border-gray-700 hover:bg-gray-800/50">
      <td class="py-4 px-6">
        <a href="https://${d.domain}" target="_blank" class="text-blue-400 hover:text-blue-300 font-medium">
          ${d.domain}
        </a>
      </td>
      <td class="py-4 px-6 text-gray-300">${d.role}</td>
      <td class="py-4 px-6">
        <span class="px-2 py-1 rounded-full text-xs font-medium" 
              style="background-color: ${statusColors[d.status]?.bg || '#374151'}; color: ${statusColors[d.status]?.text || '#9CA3AF'}">
          ${d.status}
        </span>
      </td>
      <td class="py-4 px-6 text-gray-400">${d.category}</td>
      <td class="py-4 px-6">
        <a href="https://github.com/${d.primary_repo}" target="_blank" class="text-gray-400 hover:text-white">
          📦 ${d.primary_repo.split('/')[1] || d.primary_repo}
        </a>
      </td>
    </tr>
  `).join('');

  const productCards = products.products.map(p => `
    <div class="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-xl font-bold text-white">${p.name}</h3>
          <p class="text-blue-400 text-sm">${p.domain}</p>
        </div>
        <span class="px-2 py-1 rounded-full text-xs font-medium"
              style="background-color: ${statusColors[p.status]?.bg || '#374151'}; color: ${statusColors[p.status]?.text || '#9CA3AF'}">
          ${p.status}
        </span>
      </div>
      <p class="text-gray-300 mb-4">${p.tagline}</p>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-500">Stack:</span>
          <span class="text-gray-300">${p.stack.frontend} / ${p.stack.backend}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Pricing:</span>
          <span class="text-gray-300">${p.pricing.model}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Moat:</span>
          <span class="text-gray-300">${p.moat}</span>
        </div>
      </div>
      <div class="mt-4 pt-4 border-t border-gray-700 flex gap-2">
        ${p.links.app ? `<a href="${p.links.app}" target="_blank" class="text-blue-400 hover:text-blue-300 text-sm">🚀 App</a>` : ''}
        ${p.links.docs ? `<a href="${p.links.docs}" target="_blank" class="text-blue-400 hover:text-blue-300 text-sm">📚 Docs</a>` : ''}
        ${p.links.marketing ? `<a href="${p.links.marketing}" target="_blank" class="text-blue-400 hover:text-blue-300 text-sm">🌐 Site</a>` : ''}
      </div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yarlis Portfolio | AI Automation Infrastructure</title>
  <meta name="description" content="Yarlis - Building AI-first platforms that compound value, create leverage, and buy back time.">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', system-ui, sans-serif; }
  </style>
</head>
<body class="bg-gray-900 text-white min-h-screen">
  <!-- Header -->
  <header class="border-b border-gray-800">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center text-xl font-bold">Y</div>
        <div>
          <h1 class="text-xl font-bold">Yarlis</h1>
          <p class="text-xs text-gray-400">AI Automation Infrastructure</p>
        </div>
      </div>
      <nav class="flex gap-6 text-sm">
        <a href="https://yarlis.com" class="text-gray-300 hover:text-white">Home</a>
        <a href="https://yarlis.ai" class="text-gray-300 hover:text-white">Platform</a>
        <a href="https://github.com/YarlisAISolutions" class="text-gray-300 hover:text-white">GitHub</a>
      </nav>
    </div>
  </header>

  <!-- Hero -->
  <section class="py-20 px-6 text-center">
    <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
      Portfolio
    </h1>
    <p class="text-xl text-gray-400 max-w-2xl mx-auto">
      Building enduring, AI-first platforms that compound value, create leverage, and buy back time.
    </p>
  </section>

  <!-- Domains Table -->
  <section class="max-w-7xl mx-auto px-6 mb-16">
    <h2 class="text-2xl font-bold mb-6">🌐 Domains</h2>
    <div class="overflow-x-auto rounded-xl border border-gray-700">
      <table class="w-full">
        <thead class="bg-gray-800">
          <tr>
            <th class="py-3 px-6 text-left text-sm font-medium text-gray-400">Domain</th>
            <th class="py-3 px-6 text-left text-sm font-medium text-gray-400">Role</th>
            <th class="py-3 px-6 text-left text-sm font-medium text-gray-400">Status</th>
            <th class="py-3 px-6 text-left text-sm font-medium text-gray-400">Category</th>
            <th class="py-3 px-6 text-left text-sm font-medium text-gray-400">Repo</th>
          </tr>
        </thead>
        <tbody>
          ${domainRows}
        </tbody>
      </table>
    </div>
  </section>

  <!-- Products Grid -->
  <section class="max-w-7xl mx-auto px-6 mb-16">
    <h2 class="text-2xl font-bold mb-6">📦 Products</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${productCards}
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
    <p>© ${new Date().getFullYear()} Yarlis. Built with ❤️ by SamJr 🦊</p>
    <p class="mt-2">
      <a href="/products.json" class="text-blue-400 hover:text-blue-300">API</a>
      •
      <a href="https://github.com/YarlisAISolutions/yarlis-portfolio" class="text-blue-400 hover:text-blue-300">Source</a>
    </p>
  </footer>

  <!-- Generated timestamp -->
  <script>
    console.log('Portfolio generated: ${new Date().toISOString()}');
  </script>
</body>
</html>`;
}

// Main
async function main() {
  console.log('🏗️  Generating portfolio site...');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT)) {
    fs.mkdirSync(OUTPUT, { recursive: true });
  }

  // Load data
  const domains = loadYaml<{ domains: Domain[] }>('domains.yaml');
  const products = loadYaml<{ products: Product[] }>('products.yaml');

  // Generate HTML
  const html = generateHTML(domains, products);
  fs.writeFileSync(path.join(OUTPUT, 'index.html'), html);
  console.log('✅ Generated public/index.html');

  // Generate JSON API
  fs.writeFileSync(
    path.join(OUTPUT, 'products.json'),
    JSON.stringify({ domains: domains.domains, products: products.products }, null, 2)
  );
  console.log('✅ Generated public/products.json');

  // Generate status
  fs.writeFileSync(
    path.join(OUTPUT, 'status.json'),
    JSON.stringify({
      generated: new Date().toISOString(),
      domains: domains.domains.length,
      products: products.products.length,
    }, null, 2)
  );
  console.log('✅ Generated public/status.json');

  console.log('\n🎉 Portfolio site ready!');
  console.log('   Open: public/index.html');
}

main().catch(console.error);
