import { source } from '@/lib/source';
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page';
import { notFound, permanentRedirect } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/components/mdx';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { BIT10TOPAllocation } from '@/components/bit10-top-allocations';
import { BIT10TopReserves } from '@/components/bit10-top-reserve';
import { BIT10SOLAllocation } from '@/components/bit10-sol-allocations';

export default async function Page(props: { params: Promise<{ slug?: string[] }>; }) {
    const params = await props.params;
    const page = source.getPage(params.slug);
    if (!page) {
        permanentRedirect('/');
    }

    const MDXContent = page.data.body;

    return (
        <DocsPage
            toc={page.data.toc}
            full={page.data.full}
            tableOfContent={{
                style: 'clerk',
                enabled: true,
                single: false
            }}
        >
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription>{page.data.description}</DocsDescription>
            <DocsBody>
                <MDXContent
                    components={getMDXComponents({
                        a: createRelativeLink(source, page),
                        Step,
                        Steps,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        img: (props) => <ImageZoom {...(props as any)} />,
                        BIT10TOPAllocation,
                        BIT10TopReserves,
                        BIT10SOLAllocation
                    })}
                />
            </DocsBody>
        </DocsPage>
    );
}

export async function generateStaticParams() {
    return source.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }>; }) {
    const params = await props.params;
    const page = source.getPage(params.slug);
    if (!page) notFound();

    return {
        title: page.data.title,
        description: page.data.description,
    };
}
