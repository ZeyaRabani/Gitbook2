async function getBIT10Data() {
    const res = await fetch(
        'https://bit10.app/bit10-latest-rebalance-sol',
        { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error('Failed to fetch BIT10.SOL data');
    return res.json();
}

interface Token {
    id: string;
    image: string;
    name: string;
    symbol: string;
    price: number;
    marketCap: number;
    noOfTokens: number;
}

interface TokenWithPercentage extends Token {
    percentage: string;
}

export async function BIT10SOLAllocation() {
    const data = await getBIT10Data();
    const tokens: Token[] = data.newTokens;

    const totalMarketCap = tokens.reduce(
        (sum, t) => sum + t.marketCap,
        0
    );

    const tokensWithPercentages: TokenWithPercentage[] = tokens.map(
        (token) => ({
            ...token,
            percentage: ((token.marketCap / totalMarketCap) * 100).toFixed(2),
        })
    );

    return (
        <table className='w-full'>
            <thead>
                <tr className='border-b border-border/50 text-sm text-muted-foreground'>
                    <th className='text-left py-2 px-6 font-medium'>Asset</th>
                    <th className='text-right py-2 px-6 font-medium'>Allocation</th>
                </tr>
            </thead>
            <tbody>
                {tokensWithPercentages.map((token) => (
                    <tr
                        key={token.id}
                        className='border-b border-border/30 hover:bg-muted/30 transition-colors'
                    >
                        <td className='py-2 px-6'>
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center'>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={token.image}
                                        alt={token.name}
                                        width={40}
                                        height={40}
                                        className='object-contain'
                                    />
                                </div>
                                <div>
                                    <div className='font-medium uppercase'>
                                        {token.symbol}
                                    </div>
                                    <div className='text-sm text-muted-foreground'>
                                        {token.name}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className='py-2 px-6 text-right'>
                            <div className='flex items-center justify-end gap-3'>
                                <div className='w-24 h-2 rounded-full bg-muted overflow-hidden'>
                                    <div
                                        className='h-full rounded-full bg-linear-to-r from-primary to-primary/60'
                                        style={{
                                            width: `${parseFloat(token.percentage) * 3}%`,
                                        }}
                                    />
                                </div>
                                <span className='text-sm text-muted-foreground w-12 text-right'>
                                    {token.percentage}%
                                </span>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}