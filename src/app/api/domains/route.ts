import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const domains = await client.domain.findMany({
      where: {
        User: {
          clerkId: user.id,
        },
      },
      select: {
        id: true,
        name: true,
        icon: true,
      },
    });

    return NextResponse.json({ domains }, { status: 200 });
  } catch (error) {
    console.error('Error fetching domains:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching domains' },
      { status: 500 }
    );
  }
} 