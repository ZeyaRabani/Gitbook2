import { source } from '@/lib/source'
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page'
import { notFound, permanentRedirect } from 'next/navigation'
import { Step, Steps } from 'fumadocs-ui/components/steps'
import { ImageZoom } from 'fumadocs-ui/components/image-zoom'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/app/_components/table'
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion'
import defaultMdxComponents from 'fumadocs-ui/mdx'

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    permanentRedirect('/');
  }

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      tableOfContent={{
        style: 'clerk',
        enabled: true,
        single: false
      }}
      full={page.data.full}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{
          ...defaultMdxComponents,
          Step,
          Steps,
          Table,
          TableBody,
          TableCaption,
          TableCell,
          TableHead,
          TableHeader,
          TableRow,
          Accordion,
          Accordions,
          img: (props) => <ImageZoom {...(props as any)} />,
        }} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
