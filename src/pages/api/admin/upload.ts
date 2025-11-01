import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { supabaseServer } from '@/lib/supabase';
import { prisma } from '@/lib/prisma';
import { createReadStream } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.setHeader('Allow', 'POST').status(405).end('Method Not Allowed');
  }

  const form = formidable({ multiples: false });
  const { fields, files }: any = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  const file = files.file;
  const fileStream = createReadStream(file.filepath);
  const filename = `${Date.now()}-${file.originalFilename}`;

  const supabase = supabaseServer();
  const { data, error } = await supabase.storage.from('media').upload(filename, fileStream, {
    contentType: file.mimetype,
  });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Insert image record into DB
  const { id } = await prisma.image.create({
    data: {
      bucket: 'media',
      path: data.path,
      alt: file.originalFilename || '',
      width: file?.size || undefined,
      height: undefined,
    },
  });

  const { data: pub } = supabase.storage.from('media').getPublicUrl(data.path);

  return res.status(200).json({ url: pub?.publicUrl, id });
}