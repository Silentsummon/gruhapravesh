import { handleUpload } from '@vercel/blob/client';

// Guests upload straight from their phone to Blob storage (no 4.5 MB function limit).
export default async function handler(req, res) {
  try {
    const json = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!process.env.UPLOAD_KEY || clientPayload !== process.env.UPLOAD_KEY) {
          throw new Error('This upload link is not valid.');
        }
        if (!pathname.startsWith('guests/')) throw new Error('Bad path.');
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'video/mp4', 'video/quicktime'],
          maximumSizeInBytes: 100 * 1024 * 1024,
          addRandomSuffix: true
        };
      },
      onUploadCompleted: async () => {}
    });
    res.status(200).json(json);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
