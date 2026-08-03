import fs from 'fs'
import path from 'path'
import { products, Product } from './products'
import { blogPosts, BlogPost } from './blog-posts'

const DATA_DIR = path.join(process.cwd(), 'data')
const COPY_FILE = path.join(DATA_DIR, 'copy-overrides.json')

type ProductCopyFields = Partial<Pick<Product, 'name' | 'tagline' | 'description' | 'longDescription' | 'specs'>>
type BlogPostCopyFields = Partial<Pick<BlogPost, 'title' | 'metaTitle' | 'metaDescription' | 'excerpt' | 'cta' | 'sections'>>

interface CopyOverrides {
  products: Record<string, ProductCopyFields>
  blogPosts: Record<string, BlogPostCopyFields>
}

function readOverrides(): CopyOverrides {
  try {
    if (!fs.existsSync(COPY_FILE)) return { products: {}, blogPosts: {} }
    return JSON.parse(fs.readFileSync(COPY_FILE, 'utf-8'))
  } catch {
    return { products: {}, blogPosts: {} }
  }
}

function writeOverrides(overrides: CopyOverrides): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(COPY_FILE, JSON.stringify(overrides, null, 2))
}

export function getProductsWithOverrides(): Product[] {
  const overrides = readOverrides()
  return products.map((p) => ({ ...p, ...(overrides.products[p.id] ?? {}) }))
}

export function getProductBySlugWithOverrides(slug: string): Product | undefined {
  return getProductsWithOverrides().find((p) => p.slug === slug)
}

export function getBlogPostsWithOverrides(): BlogPost[] {
  const overrides = readOverrides()
  return blogPosts.map((post) => ({ ...post, ...(overrides.blogPosts[post.slug] ?? {}) }))
}

export function getBlogPostWithOverrides(slug: string): BlogPost | undefined {
  return getBlogPostsWithOverrides().find((p) => p.slug === slug)
}

export function saveProductOverride(id: string, fields: ProductCopyFields): void {
  const overrides = readOverrides()
  overrides.products[id] = { ...(overrides.products[id] ?? {}), ...fields }
  writeOverrides(overrides)
}

export function saveBlogPostOverride(slug: string, fields: BlogPostCopyFields): void {
  const overrides = readOverrides()
  overrides.blogPosts[slug] = { ...(overrides.blogPosts[slug] ?? {}), ...fields }
  writeOverrides(overrides)
}

export function resetProductOverride(id: string): void {
  const overrides = readOverrides()
  delete overrides.products[id]
  writeOverrides(overrides)
}

export function resetBlogPostOverride(slug: string): void {
  const overrides = readOverrides()
  delete overrides.blogPosts[slug]
  writeOverrides(overrides)
}

export function getCopyOverrides(): CopyOverrides {
  return readOverrides()
}
