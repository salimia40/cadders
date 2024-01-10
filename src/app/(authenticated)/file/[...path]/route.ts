import { getFileLink } from '@/lib/storage';

export const dynamic = 'force-dynamic'; // defaults to force-static

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  const object = await getFileLink(params.path.join('/'), 20);
  return Response.redirect(object!);
}
