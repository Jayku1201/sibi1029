import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseServer } from '@/lib/supabase'
import formidable from 'formidable'
import { createReadStream } from 'fs'

export const config = { api: { bodyParser: false } }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const form = formidable({ multiples: false })
  const { files } = await new Promise<any>((resolve, reject) =>
    form.parse(req, (err, fields, files) => (err ? reject(err) : resolve({ fields, files })))
  )

  const file = (files as any).file
  const fileStream = createReadStream(file.filepath)
  const filename = `${Date.now()}-${file.originalFilename}`

  const supabase = supabaseServer()
  const { data, error } = await supabase.storage.from('media').upload(filename, fileStream, {
    contentType: file.mimetype,
    upsert: false,
  })
  if (error) {
    return res.status(500).json({ error: error.message })
  }

  const { data: publicData } = supabase.storage.from('media').getPublicUrl(data.path)
  return res.status(200).json({ url: publicData.publicUrl, path: data.path })
}
