import { source } from '@/app/source'
import type { Metadata } from 'next'
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { ImageZoom } from 'fumadocs-ui/components/image-zoom'
import defaultMdxComponents from 'fumadocs-ui/mdx'

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{
          ...defaultMdxComponents,
          img: (props) => <ImageZoom {...(props as any)} />,
        }} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
}
