const fs = require('fs');
const path = require('path');

/**
 * Release Packager CLI for Template #1
 * Exports apps/template-nextjs-stripe into a standalone, self-contained project.
 * Automatically resolves and inlines shared packages (@repo/auth, @repo/billing, @repo/email, @repo/ui).
 */

const ROOT_DIR = path.resolve(__dirname, '..');
const TEMPLATE_DIR = path.join(ROOT_DIR, 'apps', 'template-nextjs-stripe');
const OUTPUT_DIR = path.join(ROOT_DIR, 'dist', 'standalone-nextjs-stripe-template');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((child) => {
      if (child === 'node_modules' || child === '.next' || child === '.turbo') return;
      copyRecursive(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('🚀 Starting standalone template export...');

// 1. Clean output directory
if (fs.existsSync(OUTPUT_DIR)) {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
}
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// 2. Copy template app files
copyRecursive(TEMPLATE_DIR, OUTPUT_DIR);

// 3. Inline @repo/auth into lib/auth-core
const authSrc = path.join(ROOT_DIR, 'packages', 'auth', 'src');
const authDest = path.join(OUTPUT_DIR, 'src', 'lib', 'auth-core');
copyRecursive(authSrc, authDest);

// 4. Inline @repo/billing into lib/billing-core
const billingSrc = path.join(ROOT_DIR, 'packages', 'billing', 'src');
const billingDest = path.join(OUTPUT_DIR, 'src', 'lib', 'billing-core');
copyRecursive(billingSrc, billingDest);

// 5. Inline @repo/email into lib/email-core
const emailSrc = path.join(ROOT_DIR, 'packages', 'email', 'src');
const emailDest = path.join(OUTPUT_DIR, 'src', 'lib', 'email-core');
copyRecursive(emailSrc, emailDest);

// 6. Inline @repo/ui into components/ui
const uiSrc = path.join(ROOT_DIR, 'packages', 'ui', 'src');
const uiDest = path.join(OUTPUT_DIR, 'src', 'components', 'ui');
copyRecursive(uiSrc, uiDest);

// 7. Copy Supabase SQL migrations directly to project root
const migrationsSrc = path.join(ROOT_DIR, 'packages', 'auth', 'migrations');
const migrationsDest = path.join(OUTPUT_DIR, 'supabase', 'migrations');
copyRecursive(migrationsSrc, migrationsDest);

// 8. Re-map import paths in all source files
function rewriteImportsInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      rewriteImportsInDir(fullPath);
    } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/@repo\/auth/g, '@/lib/auth-core');
      content = content.replace(/@repo\/billing/g, '@/lib/billing-core');
      content = content.replace(/@repo\/email/g, '@/lib/email-core');
      content = content.replace(/@repo\/ui/g, '@/components/ui');
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}
rewriteImportsInDir(path.join(OUTPUT_DIR, 'src'));

// 9. Update package.json to be 100% standalone with zero workspace:* dependencies
const pkgPath = path.join(OUTPUT_DIR, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

delete pkg.dependencies['@repo/auth'];
delete pkg.dependencies['@repo/billing'];
delete pkg.dependencies['@repo/email'];
delete pkg.dependencies['@repo/ui'];

// Add external runtime dependencies directly
pkg.dependencies['@supabase/ssr'] = '^0.5.2';
pkg.dependencies['@supabase/supabase-js'] = '^2.49.1';
pkg.dependencies['stripe'] = '^17.5.0';
pkg.dependencies['resend'] = '^4.1.2';

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');

// 10. Write clean README setup guide for the buyer
const buyerReadme = `# SaaS Launchpad — Production Starter Template

Welcome! This is your complete, self-contained Next.js 16 + Supabase + Stripe starter kit.

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies
\`\`\`bash
pnpm install
# or npm install / yarn
\`\`\`

### 2. Configure Environment Variables
Copy \`.env.example\` to \`.env.local\`:
\`\`\`bash
cp .env.example .env.local
\`\`\`
Fill in your Supabase, Stripe, and Resend credentials as instructed in the file.

### 3. Initialize Database
In your Supabase project dashboard, open the **SQL Editor**, paste the contents of:
\`\`\`
supabase/migrations/0001_init_schema.sql
\`\`\`
and run it. This creates your \`profiles\` table, sets up RLS security policies, and automatically connects new user signups.

### 4. Run Development Server
\`\`\`bash
pnpm dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) to view your landing page and dashboard.
`;
fs.writeFileSync(path.join(OUTPUT_DIR, 'README.md'), buyerReadme, 'utf8');

console.log('✅ Standalone project successfully packaged at:');
console.log(OUTPUT_DIR);
