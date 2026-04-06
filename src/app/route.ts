import { NextResponse } from 'next/server';

const GET = async (request: Request) => {
    return NextResponse.redirect(new URL('/verified', request.url), 302);
};

export { GET };
