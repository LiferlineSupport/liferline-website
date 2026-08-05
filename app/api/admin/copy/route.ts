import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/admin-auth'
import {
  getProductsWithOverrides,
  getBlogPostsWithOverrides,
  getCopyOverrides,
  saveProductOverride,
  saveBlogPostOverride,
  resetProductOverride,
  resetBlogPostOverride,
} from '@/lib/copy-overrides'

export async function GET(req: NextRequest) {
  const authError = requireAdmin(req)
  if (authError) return authError

  const overrides = getCopyOverrides()
  const allProducts = getProductsWithOverrides()
  const allBlogPosts = getBlogPostsWithOverrides()

  return NextResponse.json({
    products: allProducts.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      longDescription: p.longDescription,
      specs: p.specs,
      hasOverrides: !!overrides.products[p.id],
    })),
    blogPosts: allBlogPosts.map((post) => ({
      slug: post.slug,
      title: post.title,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      excerpt: post.excerpt,
      cta: post.cta,
      sections: post.sections,
      hasOverrides: !!overrides.blogPosts[post.slug],
    })),
  })
}

export async function PATCH(req: NextRequest) {
  const authError = requireAdmin(req)
  if (authError) return authError

  try {
    const body = await req.json()
    const { type, id, fields, reset } = body

    if (type === 'product') {
      if (!id || typeof id !== 'string') {
        return NextResponse.json({ error: 'id is required' }, { status: 400 })
      }
      if (reset) {
        resetProductOverride(id)
      } else {
        const allowed = ['name', 'tagline', 'description', 'longDescription', 'specs']
        const filtered = Object.fromEntries(
          Object.entries(fields ?? {}).filter(([k]) => allowed.includes(k))
        )
        saveProductOverride(id, filtered)
      }
      revalidatePath('/products', 'page')
      revalidatePath('/products/[slug]', 'page')
      revalidatePath('/', 'page')
      return NextResponse.json({ ok: true })
    }

    if (type === 'blogPost') {
      if (!id || typeof id !== 'string') {
        return NextResponse.json({ error: 'id is required' }, { status: 400 })
      }
      if (reset) {
        resetBlogPostOverride(id)
      } else {
        const allowed = ['title', 'metaTitle', 'metaDescription', 'excerpt', 'cta', 'sections']
        const filtered = Object.fromEntries(
          Object.entries(fields ?? {}).filter(([k]) => allowed.includes(k))
        )
        saveBlogPostOverride(id, filtered)
      }
      revalidatePath('/blog', 'page')
      revalidatePath('/blog/[slug]', 'page')
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ error: 'type must be "product" or "blogPost"' }, { status: 400 })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
