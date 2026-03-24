import { getCertificateMeta } from '@/lib/certificates';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const certificate = getCertificateMeta(id);

  if (!certificate) {
    return NextResponse.json({ 
      message: 'Certificate not found'
    }, { status: 404 });
  }

  try {
    const fileBuffer = await fs.readFile(certificate.absolutePath);
    
    const url = new URL(request.url);
    const mode = url.searchParams.get('mode');
    const disposition = mode === 'download' ? 'attachment' : 'inline';

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': certificate.mimeType,
        'Content-Disposition': `${disposition}; filename="${certificate.fileName}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return NextResponse.json({ 
      message: 'Unable to load certificate'
    }, { status: 500 });
  }
}
