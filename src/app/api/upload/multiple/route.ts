import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    if (files.length > 5) {
      return NextResponse.json(
        { error: 'Maximum 5 files allowed' },
        { status: 400 }
      );
    }

    // Validate each file
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { error: 'Only image files are allowed' },
          { status: 400 }
        );
      }

      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Each file must be less than 5MB' },
          { status: 400 }
        );
      }
    }

    // Upload all files to Vercel Blob
    const uploadPromises = files.map((file) =>
      put(`clothshare/${Date.now()}-${file.name}`, file, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN!,
      })
    );

    const blobs = await Promise.all(uploadPromises);
    const urls = blobs.map((blob) => blob.url);

    return NextResponse.json({
      success: true,
      urls,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
