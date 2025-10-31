import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';
import { fetchInstaData } from '@/lib/fetchInstaData';

export async function GET(req) {
  const user = authenticateRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }


  const { searchParams } = new URL(req.url);
  const categoryName = searchParams.get('category');

  try {
    const where = { userId: user.id };
    if (categoryName) {
      where.category = {
        name: categoryName,
      };
    }

    const posts = await prisma.postSaved.findMany({
      where,
      include: {
        category: true,
        media: true,
      },
    });

    // console.log('Fetched Posts:', posts);
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
export async function POST(req) {
    const user = authenticateRequest(req);
    // console.log("Authenticated User:", user);

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { inputUrl } = await req.json();
    if (!inputUrl) {
        return NextResponse.json({ error: 'Post URL is required' }, { status: 400 });
    }

    try {
        const { postUrl, postType, caption, hashtags, imageUrls, videoUrls, category } = await fetchInstaData(inputUrl);

        const categoryRecord = await prisma.category.upsert({
            where: {
                name_userId: {
                    name: category || 'Uncategorized',
                    userId: user.id,
                },
            },
            update: {},
            create: {
                name: category || 'Uncategorized',
                userId: user.id,
            },
        });

        const post = await prisma.postSaved.create({
            data: {
                postUrl,
                postType,
                caption,
                hashtags,
                userId: user.id,
                categoryId: categoryRecord.id,
            },
        });


        const mediaData = [
            ...(imageUrls?.map((url) => ({ type: 'image', url, postID: post.id })) || []),
            ...(videoUrls?.map((url) => ({ type: 'video', url, postID: post.id })) || []),
        ];

        if (mediaData.length > 0) {
            await prisma.media.createMany({ data: mediaData });
        }

        const fullPost = await prisma.postSaved.findUnique({
            where: { id: post.id },
            include: { category: true, media: true },
        });

        return NextResponse.json({ message: 'Post saved successfully', post: fullPost }, { status: 201 });
    } catch (error) {
        console.error('Error saving post:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
